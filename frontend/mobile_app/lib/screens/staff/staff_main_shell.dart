import 'package:flutter/material.dart';
import '../../models/user_role.dart';
import 'staff_home_tab.dart';
import '../dashboard_screen.dart';
import '../alerts_screen.dart';

class StaffMainShell extends StatefulWidget {
  final UserRole userRole;

  const StaffMainShell({super.key, required this.userRole});

  @override
  State<StaffMainShell> createState() => _StaffMainShellState();
}

class _StaffMainShellState extends State<StaffMainShell> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    final List<Widget> pages = [
      StaffHomeTab(userRole: widget.userRole),
      const StaffMyIncidentsTab(),
      const AlertsScreen(),
      const StaffProfileTab(),
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
        selectedFontSize: 12,
        unselectedFontSize: 12,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.assignment), label: 'My Incidents'),
          BottomNavigationBarItem(icon: Icon(Icons.notifications), label: 'Alerts'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}

class StaffMyIncidentsTab extends StatelessWidget {
  const StaffMyIncidentsTab({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Incidents', style: TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: ListTile(
              leading: const CircleAvatar(backgroundColor: Colors.red, child: Icon(Icons.warning, color: Colors.white)),
              title: const Text('Violence / Assault', style: TextStyle(fontWeight: FontWeight.bold)),
              subtitle: const Text('Emergency Ward - Floor 2\nToday 10:32 AM'),
              trailing: const Chip(label: Text('ACTIVE', style: TextStyle(color: Colors.white)), backgroundColor: Colors.red),
            ),
          ),
          const SizedBox(height: 12),
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            child: ListTile(
              leading: const CircleAvatar(backgroundColor: Colors.green, child: Icon(Icons.check_circle, color: Colors.white)),
              title: const Text('Medical Emergency', style: TextStyle(fontWeight: FontWeight.bold)),
              subtitle: const Text('OPD Ward Room 102\nAug 8, 2026'),
              trailing: const Chip(label: Text('RESOLVED', style: TextStyle(color: Colors.white)), backgroundColor: Colors.green),
            ),
          ),
        ],
      ),
    );
  }
}

class StaffProfileTab extends StatelessWidget {
  const StaffProfileTab({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Staff Profile', style: TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const CircleAvatar(
              radius: 40,
              backgroundColor: primaryBlue,
              child: Icon(Icons.person, size: 50, color: Colors.white),
            ),
            const SizedBox(height: 12),
            const Text('Dr. Madhan Kumar', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const Text('Role: Doctor | Staff ID: MED-2026-08', style: TextStyle(color: Colors.grey)),
            const Divider(height: 32),
            ListTile(
              leading: const Icon(Icons.business, color: primaryBlue),
              title: const Text('Department'),
              subtitle: const Text('Emergency Medicine'),
            ),
            ListTile(
              leading: const Icon(Icons.local_hospital, color: primaryBlue),
              title: const Text('Hospital'),
              subtitle: const Text('Government Medical College & Hospital'),
            ),
            ListTile(
              leading: const Icon(Icons.phone, color: primaryBlue),
              title: const Text('Phone Number'),
              subtitle: const Text('+91 98765 43210'),
            ),
            const Divider(),
            ListTile(
              leading: const Icon(Icons.lock, color: primaryBlue),
              title: const Text('Change Password'),
              onTap: () {},
            ),
            ListTile(
              leading: const Icon(Icons.language, color: primaryBlue),
              title: const Text('Language Settings'),
              onTap: () {},
            ),
            ListTile(
              leading: const Icon(Icons.logout, color: Colors.red),
              title: const Text('Logout', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
              onTap: () {
                Navigator.of(context).pushNamedAndRemoveUntil('/', (route) => false);
              },
            ),
          ],
        ),
      ),
    );
  }
}
