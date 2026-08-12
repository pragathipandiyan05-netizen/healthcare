import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../models/user_role.dart';
import 'staff_sos_trigger_flow.dart';

class StaffHomeTab extends StatefulWidget {
  final UserRole userRole;

  const StaffHomeTab({super.key, required this.userRole});

  @override
  State<StaffHomeTab> createState() => _StaffHomeTabState();
}

class _StaffHomeTabState extends State<StaffHomeTab> {
  String _userName = 'Madhan';

  @override
  void initState() {
    super.initState();
    _loadUserInfo();
  }

  Future<void> _loadUserInfo() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _userName = prefs.getString('name') ?? 'Madhan';
    });
  }

  void _triggerSos() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const StaffSosTriggerFlow(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text(
          'CARE ALERT',
          style: TextStyle(color: primaryBlue, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.white,
        elevation: 1,
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none, color: primaryBlue),
            onPressed: () {},
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Good Morning, $_userName',
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: primaryBlue,
              ),
            ),
            const SizedBox(height: 6),
            Row(
              children: const [
                Icon(Icons.circle, color: Colors.green, size: 12),
                SizedBox(width: 6),
                Text(
                  'Emergency Support Connected',
                  style: TextStyle(color: Colors.green, fontWeight: FontWeight.w600),
                ),
              ],
            ),
            const SizedBox(height: 28),

            // Emergency SOS Button Section
            Center(
              child: GestureDetector(
                onTap: _triggerSos,
                child: Container(
                  width: 140,
                  height: 140,
                  decoration: BoxDecoration(
                    color: Colors.red,
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.red.withValues(alpha: 0.4),
                        blurRadius: 16,
                        spreadRadius: 6,
                      ),
                    ],
                  ),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.touch_app, size: 36, color: Colors.white),
                        SizedBox(height: 6),
                        Text(
                          'SOS',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 2,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            const Center(
              child: Text(
                'TAP OR HOLD FOR EMERGENCY',
                style: TextStyle(
                  color: Colors.red,
                  fontWeight: FontWeight.bold,
                  letterSpacing: 1.1,
                ),
              ),
            ),
            const SizedBox(height: 32),

            // Location Box
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.grey.shade300),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Current Location',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(height: 6),
                  Text(
                    'Emergency Block — 2nd Floor, Room 204',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: primaryBlue,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Summary Stats
            const Text(
              "Today's Overview",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: primaryBlue,
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.blue.shade50,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('My Active Incidents', style: TextStyle(color: primaryBlue)),
                        SizedBox(height: 8),
                        Text('0', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: primaryBlue)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.orange.shade50,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Hospital Alerts', style: TextStyle(color: Colors.orange)),
                        SizedBox(height: 8),
                        Text('2', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.orange)),
                      ],
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
