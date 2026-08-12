import 'package:flutter/material.dart';
import '../../models/user_role.dart';
import '../admin_dashboard.dart';
import '../alerts_screen.dart';
import '../workers_list_screen.dart';
import '../reports_screen.dart';

class AdminMainShell extends StatefulWidget {
  final UserRole userRole;

  const AdminMainShell({super.key, required this.userRole});

  @override
  State<AdminMainShell> createState() => _AdminMainShellState();
}

class _AdminMainShellState extends State<AdminMainShell> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    final List<Widget> pages = [
      const AdminDashboardTab(),
      const AdminEmergenciesTab(),
      const AdminLiveMapTab(),
      const AdminIncidentsTab(),
      const WorkersListScreen(),
      const AdminBroadcastsTab(),
      const AdminMoreTab(),
    ];

    return Scaffold(
      backgroundColor: Colors.white,
      body: IndexedStack(
        index: _currentIndex,
        children: pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        type: BottomNavigationBarType.fixed,
        selectedItemColor: primaryBlue,
        unselectedItemColor: Colors.grey,
        selectedFontSize: 11,
        unselectedFontSize: 11,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.warning), label: 'Emergencies'),
          BottomNavigationBarItem(icon: Icon(Icons.map), label: 'Live Map'),
          BottomNavigationBarItem(icon: Icon(Icons.assignment), label: 'Incidents'),
          BottomNavigationBarItem(icon: Icon(Icons.people), label: 'Staff'),
          BottomNavigationBarItem(icon: Icon(Icons.campaign), label: 'Broadcasts'),
          BottomNavigationBarItem(icon: Icon(Icons.more_horiz), label: 'More'),
        ],
      ),
    );
  }
}

class AdminDashboardTab extends StatelessWidget {
  const AdminDashboardTab({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Command Center', style: TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Hospital Overview', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: primaryBlue)),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: Card(
                    color: Colors.red.shade50,
                    child: const Padding(
                      padding: EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Active SOS', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
                          SizedBox(height: 4),
                          Text('03', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.red)),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Card(
                    color: Colors.blue.shade50,
                    child: const Padding(
                      padding: EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Avg Response', style: TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
                          SizedBox(height: 4),
                          Text('02:14', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: primaryBlue)),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class AdminEmergenciesTab extends StatelessWidget {
  const AdminEmergenciesTab({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hospital Emergencies Control', style: TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            color: Colors.red.shade50,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12), side: const BorderSide(color: Colors.red)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text('🚨 SOS-2026-000182', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.red)),
                      Chip(label: Text('CRITICAL', style: TextStyle(color: Colors.white)), backgroundColor: Colors.red),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text('Location: Emergency Ward, Floor 2, Room 204'),
                  const Text('Emergency Type: Violence / Assault'),
                  const Text('Security Status: Responding (Officer Rahul)'),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(backgroundColor: primaryBlue),
                        onPressed: () {},
                        icon: const Icon(Icons.security, size: 16),
                        label: const Text('Assign Security'),
                      ),
                      const SizedBox(width: 8),
                      OutlinedButton.icon(
                        onPressed: () {},
                        icon: const Icon(Icons.arrow_upward, size: 16),
                        label: const Text('Escalate'),
                      ),
                    ],
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}

class AdminLiveMapTab extends StatelessWidget {
  const AdminLiveMapTab({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hospital Command Center Map', style: TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(Icons.map, size: 80, color: primaryBlue),
            SizedBox(height: 16),
            Text('Hospital Live Zone & Security Tracking Map', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            Text('Showing active emergency zones & assigned security vectors', style: TextStyle(color: Colors.grey)),
          ],
        ),
      ),
    );
  }
}

class AdminIncidentsTab extends StatelessWidget {
  const AdminIncidentsTab({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Hospital Incidents Ledger', style: TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          ListTile(
            title: Text('Incident #182 - Emergency Ward'),
            subtitle: Text('Type: Violence | Status: Resolved | Avg Time: 02:14'),
            leading: Icon(Icons.assignment_turned_in, color: Colors.green),
          ),
          Divider(),
          ListTile(
            title: Text('Incident #181 - ICU Block'),
            subtitle: Text('Type: Medical Emergency | Status: Resolved | Avg Time: 01:45'),
            leading: Icon(Icons.assignment_turned_in, color: Colors.green),
          ),
        ],
      ),
    );
  }
}

class AdminBroadcastsTab extends StatelessWidget {
  const AdminBroadcastsTab({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Emergency Broadcast Center', style: TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Create New Broadcast', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: primaryBlue)),
            const SizedBox(height: 12),
            const TextField(
              decoration: InputDecoration(labelText: 'Broadcast Title', border: OutlineInputBorder()),
            ),
            const SizedBox(height: 12),
            const TextField(
              maxLines: 3,
              decoration: InputDecoration(labelText: 'Message Body', border: OutlineInputBorder()),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                onPressed: () {},
                icon: const Icon(Icons.send, color: Colors.white),
                label: const Text('DISPATCH BROADCAST', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
              ),
            )
          ],
        ),
      ),
    );
  }
}

class AdminMoreTab extends StatelessWidget {
  const AdminMoreTab({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Management & Settings', style: TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: ListView(
        children: [
          ListTile(leading: const Icon(Icons.local_hospital, color: primaryBlue), title: const Text('Hospital Configuration')),
          ListTile(leading: const Icon(Icons.business, color: primaryBlue), title: const Text('Department Setup')),
          ListTile(leading: const Icon(Icons.warning, color: primaryBlue), title: const Text('Emergency Types & Matrix')),
          ListTile(leading: const Icon(Icons.trending_up, color: primaryBlue), title: const Text('Escalation Rules')),
          ListTile(leading: const Icon(Icons.analytics, color: primaryBlue), title: const Text('Reports & Analytics'), onTap: () {
            Navigator.push(context, MaterialPageRoute(builder: (c) => const ReportsScreen()));
          }),
          ListTile(leading: const Icon(Icons.history, color: primaryBlue), title: const Text('System Audit Logs')),
          ListTile(leading: const Icon(Icons.logout, color: Colors.red), title: const Text('Logout', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)), onTap: () {
            Navigator.of(context).pushNamedAndRemoveUntil('/', (route) => false);
          }),
        ],
      ),
    );
  }
}
