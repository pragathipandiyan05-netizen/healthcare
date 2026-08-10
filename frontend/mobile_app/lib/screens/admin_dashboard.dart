import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'login_screen.dart';
import 'workers_list_screen.dart';

class AdminDashboard extends StatefulWidget {
  const AdminDashboard({super.key});

  @override
  State<AdminDashboard> createState() => _AdminDashboardState();
}

class _AdminDashboardState extends State<AdminDashboard> {
  void _logout() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    if (!mounted) return;
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => LoginScreen()));
  }

  void _resolveAlert(String docId) {
    if (kIsWeb) return;
    FirebaseFirestore.instance.collection('care_alerts').doc(docId).update({
      'status': 'RESOLVED_BY_ADMIN',
      'resolved_at': FieldValue.serverTimestamp(),
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin & Security Portal'),
        backgroundColor: Colors.blueGrey.shade800,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.group),
            tooltip: 'Total Workers',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const WorkersListScreen()),
              );
            },
          ),
          IconButton(icon: const Icon(Icons.logout), onPressed: _logout),
        ],
      ),
      body: kIsWeb 
          ? const Center(
              child: Text(
                'Web Preview Mode\\nFirebase is disabled to prevent crashes.', 
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 24, color: Colors.grey)
              )
            )
          : StreamBuilder<QuerySnapshot>(
              stream: FirebaseFirestore.instance
                  .collection('care_alerts')
                  .orderBy('timestamp', descending: true)
                  .snapshots(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                }
                if (snapshot.hasError) {
                  return Center(child: Text('Error: ${snapshot.error}'));
                }

                final alerts = snapshot.data?.docs ?? [];

                if (alerts.isEmpty) {
                  return const Center(child: Text('No Incidents Logged', style: TextStyle(fontSize: 24, color: Colors.grey)));
                }

                return ListView.builder(
                  padding: const EdgeInsets.all(8),
                  itemCount: alerts.length,
                  itemBuilder: (context, index) {
                    var doc = alerts[index];
                    var data = doc.data() as Map<String, dynamic>;
                    bool isActive = data['status'] == 'ACTIVE';

                    return Card(
                      elevation: isActive ? 4 : 1,
                      color: isActive ? Colors.red.shade50 : Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                        side: BorderSide(color: isActive ? Colors.red : Colors.grey.shade300, width: isActive ? 2 : 1),
                      ),
                      child: ListTile(
                        contentPadding: const EdgeInsets.all(16),
                        leading: CircleAvatar(
                          backgroundColor: isActive ? Colors.red : Colors.grey,
                          child: Icon(
                            isActive ? Icons.warning_amber_rounded : Icons.check,
                            color: Colors.white,
                          ),
                        ),
                        title: Text(
                          '${data['distress_type']} - ${data['staff_id']}',
                          style: TextStyle(fontWeight: FontWeight.bold, color: isActive ? Colors.red.shade900 : Colors.black87),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const SizedBox(height: 4),
                            Text('Status: ${data['status']}'),
                            if (data['latitude'] != null) 
                              Text('Location: ${data['latitude'].toStringAsFixed(4)}, ${data['longitude'].toStringAsFixed(4)}'),
                            if (data['timer_active'] == true)
                              const Text('Timer Alert: Yes', style: TextStyle(color: Colors.deepOrange)),
                          ],
                        ),
                        trailing: isActive
                            ? ElevatedButton(
                                onPressed: () => _resolveAlert(doc.id),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.green,
                                  foregroundColor: Colors.white,
                                ),
                                child: const Text('Resolve'),
                              )
                            : const Text('CLOSED', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                      ),
                    );
                  },
                );
              },
            ),
    );
  }
}
