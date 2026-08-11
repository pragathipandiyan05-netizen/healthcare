import 'package:flutter/material.dart';
import 'tabs/security_home_tab.dart';
import 'tabs/security_emergencies_tab.dart';
import 'tabs/security_live_map_tab.dart';
import 'tabs/security_response_tab.dart';
import 'tabs/security_profile_tab.dart';

class SecurityDashboardScreen extends StatefulWidget {
  const SecurityDashboardScreen({super.key});

  @override
  State<SecurityDashboardScreen> createState() => _SecurityDashboardScreenState();
}

class _SecurityDashboardScreenState extends State<SecurityDashboardScreen> {
  int _currentIndex = 0;

  void _navigateToTab(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        title: Row(
          children: [
            Image.asset('assets/logo.png', height: 28, errorBuilder: (c, e, s) => const Icon(Icons.security, size: 28, color: primaryBlue)),
            const SizedBox(width: 8),
            const Text(
              'CARE ALERT SECURITY',
              style: TextStyle(
                color: primaryBlue,
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: [
          SecurityHomeTab(onNavigate: _navigateToTab),
          const SecurityEmergenciesTab(),
          const SecurityLiveMapTab(),
          const SecurityResponseTab(),
          const SecurityProfileTab(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        type: BottomNavigationBarType.fixed,
        selectedItemColor: primaryBlue,
        unselectedItemColor: Colors.grey,
        showUnselectedLabels: true,
        selectedFontSize: 12,
        unselectedFontSize: 12,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.warning_rounded), label: 'Emergencies'),
          BottomNavigationBarItem(icon: Icon(Icons.map), label: 'Live Map'),
          BottomNavigationBarItem(icon: Icon(Icons.directions_run), label: 'Response'),
          BottomNavigationBarItem(icon: Icon(Icons.shield), label: 'Profile'),
        ],
      ),
    );
  }
}
