import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'active_emergency_screen.dart';
import 'drug_shortage_screen.dart';
import 'blood_request_screen.dart';
import 'alerts_screen.dart';
import 'hospitals_screen.dart';
import 'inventory_screen.dart';
import 'blood_bank_screen.dart';
import 'analytics_screen.dart';
import 'reports_screen.dart';
import 'login_screen.dart';
import 'equipment_fault_screen.dart';
import 'facility_hazard_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  String _selectedAlertFilter = "All";
  int _currentIndex = 0;

  void sendSOS(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => ActiveEmergencyScreen(
              distressType: "Emergency SOS",
              isTimerActive: true,
              staffId: "EMP-001")),
    );
  }

  void showShortage(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => DrugShortageScreen()),
    );
  }

  void showBloodRequest(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => BloodRequestScreen()),
    );
  }

  void showEquipmentFault(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => EquipmentFaultScreen()),
    );
  }

  void showFacilityHazard(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => FacilityHazardScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        iconTheme: const IconThemeData(color: Color(0xFF042e6f)), // Blue hamburger icon
        title: Row(
          children: [
            Image.asset('assets/logo.png', height: 28, errorBuilder: (c, e, s) => const Icon(Icons.broken_image, size: 28)),
            SizedBox(width: 8),
            Text(
              'CARE ALERT',
              style: TextStyle(
                color: Color(0xFF042e6f),
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
      drawer: Drawer(
        child: Column(
          children: [
            Expanded(
              child: ListView(
                padding: EdgeInsets.zero,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 24.0),
                    decoration: const BoxDecoration(
                      color: Color(0xFF042e6f),
                    ),
                    child: SafeArea(
                      bottom: false,
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(4),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Image.asset('assets/logo.png', height: 28, errorBuilder: (c, e, s) => const Icon(Icons.broken_image, size: 28)),
                          ),
                          const SizedBox(width: 12),
                          const Text('CARE ALERT', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ),
                  ListTile(leading: const Icon(Icons.home, color: Color(0xFF042e6f)), title: const Text('Home', style: TextStyle(fontWeight: FontWeight.bold)), onTap: () => Navigator.pop(context)),
                  ListTile(leading: const Icon(Icons.notifications), title: const Text('Alerts'), onTap: () {
                    Navigator.pop(context);
                    Navigator.push(context, MaterialPageRoute(builder: (context) => AlertsScreen()));
                  }),
                  ListTile(leading: const Icon(Icons.local_hospital), title: const Text('Hospitals'), onTap: () {
                    Navigator.pop(context);
                    Navigator.push(context, MaterialPageRoute(builder: (context) => HospitalsScreen()));
                  }),
                  ListTile(leading: const Icon(Icons.medical_services), title: const Text('Inventory'), onTap: () {
                    Navigator.pop(context);
                    Navigator.push(context, MaterialPageRoute(builder: (context) => InventoryScreen()));
                  }),
                  ListTile(leading: const Icon(Icons.bloodtype), title: const Text('Blood'), onTap: () {
                    Navigator.pop(context);
                    Navigator.push(context, MaterialPageRoute(builder: (context) => BloodBankScreen()));
                  }),
                  ListTile(leading: const Icon(Icons.analytics), title: const Text('Analytics'), onTap: () {
                    Navigator.pop(context);
                    Navigator.push(context, MaterialPageRoute(builder: (context) => AnalyticsScreen()));
                  }),
                  ListTile(leading: const Icon(Icons.assignment), title: const Text('Reports'), onTap: () {
                    Navigator.pop(context);
                    Navigator.push(context, MaterialPageRoute(builder: (context) => ReportsScreen()));
                  }),
                ],
              ),
            ),
            const Divider(height: 1),
            SafeArea(
              top: false,
              child: ListTile(
                leading: const Icon(Icons.logout, color: Colors.red),
                title: const Text('Logout', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
                onTap: () async {
                  final prefs = await SharedPreferences.getInstance();
                  await prefs.clear();
                  if (!context.mounted) return;
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (context) => LoginScreen()),
                    (route) => false,
                  );
                },
              ),
            ),
          ],
        ),
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: [
          _buildHomeTab(),
          _buildAlertsTab(),
          _buildTasksTab(),
          _buildProfileTab(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        type: BottomNavigationBarType.fixed,
        selectedItemColor: primaryBlue,
        unselectedItemColor: Colors.grey,
        showUnselectedLabels: true,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.notifications), label: 'Alerts'),
          BottomNavigationBarItem(icon: Icon(Icons.assignment), label: 'Tasks'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }



  Widget _buildHomeTab() {
    const Color primaryBlue = Color(0xFF042e6f);
    return SafeArea(
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Header
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
              decoration: const BoxDecoration(
                color: primaryBlue,
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(20),
                  bottomRight: Radius.circular(20),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text('Welcome', style: TextStyle(color: Colors.white70, fontSize: 13)),
                            Text('Dr. Kavitha R', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.green.withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: Colors.green.shade300),
                        ),
                        child: const Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.circle, color: Colors.greenAccent, size: 10),
                            SizedBox(width: 4),
                            Text('On Duty', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      )
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text('Emergency Ward', style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w500)),
                  const Text('Government General Hospital, Chennai', style: TextStyle(color: Colors.white70, fontSize: 12)),
                ],
              ),
            ),
            
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Scaled SOS Button
                  Center(
                    child: GestureDetector(
                      onLongPress: () => sendSOS(context),
                      onTap: () { ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Press and hold to activate SOS'))); },
                      child: Container(
                        width: 160,
                        height: 160,
                        decoration: BoxDecoration(
                          color: Colors.red,
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(color: Colors.red.withValues(alpha: 0.3), blurRadius: 16, spreadRadius: 4),
                          ],
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [
                            Icon(Icons.health_and_safety, color: Colors.white, size: 36),
                            SizedBox(height: 6),
                            Text('EMERGENCY\nSOS', textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold, letterSpacing: 1.2, height: 1.1)),
                            SizedBox(height: 8),
                            Text('[ PRESS & HOLD ]', style: TextStyle(color: Colors.white70, fontSize: 12, fontWeight: FontWeight.w600)),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),
                  
                  // Current Shift
                  const Text('Current Shift', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black87)),
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.blue.shade100)),
                    child: Row(
                      children: [
                        const Icon(Icons.access_time, color: Colors.blue, size: 28),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: const [
                              Text('Morning Shift', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.black87)),
                              Text('08:00 AM - 04:00 PM', style: TextStyle(color: Colors.black54, fontSize: 16)),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 24),
                  
                  // Important Alerts
                  const Text('Important Hospital Alerts', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black87)),
                  const SizedBox(height: 12),
                  _buildActivityItem('Mass Casualty Incident drill at 2 PM', 'Admin', '1 hr ago', Icons.warning_amber_rounded, Colors.orange),
                  
                  const SizedBox(height: 24),
                  
                  // Assigned Tasks
                  const Text('Assigned Tasks', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black87)),
                  const SizedBox(height: 12),
                  _buildActivityItem('Check emergency equipment', 'High Priority • Due: 11:30 AM', 'Pending', Icons.assignment, Colors.red),
                  _buildActivityItem('Inventory verification', 'Medium Priority • Due: 2:00 PM', 'In Progress', Icons.assignment, Colors.orange),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryCard(String title, String count, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(count, style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: color)),
          const SizedBox(height: 4),
          Text(title, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Colors.black87)),
        ],
      ),
    );
  }

  Widget _buildActivityItem(String title, String status, String time, IconData icon, Color color) {
    return ListTile(
      contentPadding: EdgeInsets.zero,
      leading: CircleAvatar(
        backgroundColor: color.withValues(alpha: 0.1),
        child: Icon(icon, color: color),
      ),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
      subtitle: Text('$status • $time', style: TextStyle(color: Colors.grey.shade600, fontSize: 18)),
    );
  }

  Widget _buildAlertsTab() {
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      body: SafeArea(
        child: Column(
          children: [
            // Filter Chips
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Row(
                children: [
                  ...['All', 'Emergency', 'Hospital', 'Inventory', 'Blood', 'Equipment', 'General'].map((label) => _buildFilterChip(label, _selectedAlertFilter == label)),
                ],
              ),
            ),
            // Alert Feed
            Expanded(
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  {'title': '🔴 Emergency Alert', 'hosp': 'Emergency Ward', 'dept': 'Immediate assistance required', 'time': '10:42 AM', 'priority': 'Critical', 'status': 'Active', 'icon': Icons.warning, 'color': Colors.red, 'cat': 'Emergency'},
                  {'title': '🟠 Inventory Alert', 'hosp': 'Pharmacy', 'dept': 'Normal Saline stock is low', 'time': '10:35 AM', 'priority': 'High', 'status': 'Active', 'icon': Icons.medication, 'color': Colors.orange, 'cat': 'Inventory'},
                  {'title': '🟢 Equipment Update', 'hosp': 'ICU', 'dept': 'Ventilator maintenance completed', 'time': '10:20 AM', 'priority': 'Normal', 'status': 'Resolved', 'icon': Icons.build, 'color': Colors.green, 'cat': 'Equipment'},
                ].where((a) => _selectedAlertFilter == 'All' || _selectedAlertFilter == 'Resolved' && a['status'] == 'Resolved' || _selectedAlertFilter == a['cat'] && a['status'] != 'Resolved').map((a) => 
                  _buildAlertCard(a['title'] as String, a['hosp'] as String, a['dept'] as String, a['time'] as String, a['priority'] as String, a['status'] as String, a['icon'] as IconData, a['color'] as Color)
                ).toList(),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showModalBottomSheet(
            context: context,
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
            ),
            builder: (context) => Padding(
              padding: const EdgeInsets.symmetric(vertical: 20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text('Create New Alert', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 20),
                  ListTile(
                    leading: const CircleAvatar(backgroundColor: Colors.red, child: Icon(Icons.health_and_safety, color: Colors.white)),
                    title: const Text('Emergency SOS'),
                    onTap: () {
                      Navigator.pop(context);
                      sendSOS(context);
                    },
                  ),
                  ListTile(
                    leading: const CircleAvatar(backgroundColor: Colors.blue, child: Icon(Icons.medication_liquid, color: Colors.white)),
                    title: const Text('Drug/Consumable Shortage'),
                    onTap: () {
                      Navigator.pop(context);
                      showShortage(context);
                    },
                  ),
                  ListTile(
                    leading: const CircleAvatar(backgroundColor: Colors.red, child: Icon(Icons.bloodtype, color: Colors.white)),
                    title: const Text('Blood Request'),
                    onTap: () {
                      Navigator.pop(context);
                      showBloodRequest(context);
                    },
                  ),
                  ListTile(
                    leading: const CircleAvatar(backgroundColor: Colors.orange, child: Icon(Icons.build, color: Colors.white)),
                    title: const Text('Equipment Fault'),
                    onTap: () {
                      Navigator.pop(context);
                      showEquipmentFault(context);
                    },
                  ),
                  ListTile(
                    leading: const CircleAvatar(backgroundColor: Colors.orange, child: Icon(Icons.warning_amber_rounded, color: Colors.white)),
                    title: const Text('Facility Hazard'),
                    onTap: () {
                      Navigator.pop(context);
                      showFacilityHazard(context);
                    },
                  ),
                ],
              ),
            ),
          );
        },
        backgroundColor: const Color(0xFF042e6f),
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }

  Widget _buildFilterChip(String label, bool isSelected) {
    return Padding(
      padding: const EdgeInsets.only(right: 8.0),
      child: FilterChip(
        label: Text(label, style: TextStyle(color: isSelected ? Colors.white : Colors.black87)),
        selected: isSelected,
        onSelected: (bool selected) {
          setState(() {
            _selectedAlertFilter = label;
          });
        },
        backgroundColor: Colors.white,
        selectedColor: const Color(0xFF042e6f),
        checkmarkColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20), side: BorderSide(color: Colors.grey.shade300)),
      ),
    );
  }

  Widget _buildAlertCard(String title, String hospital, String dept, String time, String priority, String status, IconData icon, Color color) {
    return Card(
      elevation: 2,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(backgroundColor: color.withValues(alpha: 0.1), child: Icon(icon, color: color)),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 22)),
                      Text('$hospital • $dept', style: TextStyle(color: Colors.grey.shade600, fontSize: 18)),
                    ],
                  ),
                ),
                Text(time, style: TextStyle(color: Colors.grey.shade500, fontSize: 18)),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                _buildBadge(priority, priority == 'Critical' ? Colors.red : (priority == 'High' ? Colors.orange : Colors.blue)),
                const SizedBox(width: 8),
                _buildBadge(status, status == 'Resolved' ? Colors.green : Colors.grey.shade700),
              ],
            ),
            const Divider(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                TextButton.icon(onPressed: () { ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Feature coming soon!'))); }, icon: const Icon(Icons.visibility, size: 18), label: const Text('View')),
                TextButton.icon(onPressed: () { ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Feature coming soon!'))); }, icon: const Icon(Icons.check_circle_outline, size: 18), label: const Text('Acknowledge')),
              ],
            )
          ],
        ),
      ),
    );
  }

  Widget _buildBadge(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(color: color.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(8), border: Border.all(color: color.withValues(alpha: 0.5))),
      child: Text(text, style: TextStyle(color: color, fontSize: 16, fontWeight: FontWeight.bold)),
    );
  }

  Widget _buildProfileTab() {
    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          // Profile Header
          Center(
            child: Column(
              children: [
                const CircleAvatar(
                  radius: 50,
                  backgroundColor: Color(0xFF042e6f),
                  child: Icon(Icons.person, size: 50, color: Colors.white),
                ),
                const SizedBox(height: 16),
                const Text('Dr. Kavitha R', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                Text('EMP-001', style: TextStyle(fontSize: 18, color: Colors.grey.shade700, fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                Text('Chief Medical Officer', style: TextStyle(fontSize: 18, color: Colors.grey.shade600)),
              ],
            ),
          ),
          const SizedBox(height: 32),
          
          // Work Information Card
          const Text('Work Information', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.black87)),
          const SizedBox(height: 12),
          Card(
            elevation: 1,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  _buildProfileDetailRow('Department', 'Emergency Ward'),
                  const Divider(height: 16),
                  _buildProfileDetailRow('Hospital', 'Government General Hospital'),
                  const Divider(height: 16),
                  _buildProfileDetailRow('District', 'Chennai'),
                  const Divider(height: 16),
                  _buildProfileDetailRow('Employee ID', 'EMP-001'),
                  const Divider(height: 16),
                  _buildProfileDetailRow('Role', 'Chief Medical Officer'),
                  const Divider(height: 16),
                  _buildProfileDetailRow('Status', '🟢 On Duty'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),
          
          // Account Settings
          const Text('Account', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.black87)),
          const SizedBox(height: 8),
          _buildSettingsTile(Icons.edit, 'Edit Profile'),
          _buildSettingsTile(Icons.lock, 'Change Password'),
          _buildSettingsTile(Icons.notifications, 'Notification Settings'),
          _buildSettingsTile(Icons.settings_cell, 'Emergency/SOS Settings'),
          const SizedBox(height: 32),

          // Emergency Information Card
          const Text('Emergency Information', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.black87)),
          const SizedBox(height: 12),
          Card(
            elevation: 1,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Emergency Contact', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF042e6f))),
                  const SizedBox(height: 12),
                  _buildProfileDetailRow('Name', 'Hospital Supervisor'),
                  const Divider(height: 16),
                  _buildProfileDetailRow('Phone', 'XXXXX XXXXX'),
                  const SizedBox(height: 24),
                  const Text('SOS Escalation', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF042e6f))),
                  const SizedBox(height: 12),
                  _buildProfileDetailRow('Primary', 'Emergency Supervisor'),
                  const Divider(height: 16),
                  _buildProfileDetailRow('Secondary', 'Hospital Administrator'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),

          // Activity
          const Text('Activity', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.black87)),
          const SizedBox(height: 8),
          _buildSettingsTile(Icons.history, 'SOS History'),
          _buildSettingsTile(Icons.warning, 'My Alerts'),
          _buildSettingsTile(Icons.notifications_active, 'My Notifications'),

          const SizedBox(height: 32),
          ListTile(
            leading: const Icon(Icons.logout, color: Colors.red),
            title: const Text('Logout', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 18)),
            onTap: () async {
                  final prefs = await SharedPreferences.getInstance();
                  await prefs.clear();
                  if (!context.mounted) return;
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (context) => const LoginScreen()),
                    (route) => false,
                  );
            },
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
              side: const BorderSide(color: Colors.red, width: 1)
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildProfileDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 2,
            child: Text(label, style: TextStyle(color: Colors.grey.shade600, fontSize: 16))
          ),
          Expanded(
            flex: 3,
            child: Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16))
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsTile(IconData icon, String title) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: const Color(0xFF042e6f).withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: const Color(0xFF042e6f), size: 24),
      ),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
      trailing: const Icon(Icons.chevron_right, color: Colors.grey),
      contentPadding: const EdgeInsets.symmetric(horizontal: 0, vertical: 4),
      onTap: () {},
    );
  }

  Widget _buildGridItem(IconData icon, String label, Color iconColor, Color bgColor, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.grey.shade200),
          boxShadow: [
            BoxShadow(color: Colors.black.withValues(alpha: 0.02), blurRadius: 4, spreadRadius: 1),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: bgColor,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Icon(icon, color: iconColor, size: 28),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: Colors.black87),
            ),
          ],
        ),
      ),
    );
  }
  Widget _buildTasksTab() {
    return SafeArea(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.all(24.0),
            child: Text('Today\'s Tasks', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.black87)),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              children: [
                _buildTaskCard('Check emergency equipment', '🔴 HIGH', '11:30 AM', 'Emergency Ward', 'Pending', Colors.red),
                _buildTaskCard('Inventory verification', '🟠 MEDIUM', '2:00 PM', 'Pharmacy Storage', 'In Progress', Colors.orange),
                _buildTaskCard('Complete ward checklist', '🟢 NORMAL', '5:00 PM', 'Ward A', 'Pending', Colors.green),
              ],
            ),
          )
        ],
      )
    );
  }

  Widget _buildTaskCard(String title, String priority, String dueTime, String location, String status, Color color) {
    return Card(
      elevation: 2,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(priority, style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 16)),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(color: Colors.grey.shade200, borderRadius: BorderRadius.circular(20)),
                  child: Text('Due: $dueTime', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                )
              ],
            ),
            const SizedBox(height: 12),
            Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 22)),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.location_on, size: 18, color: Colors.grey),
                const SizedBox(width: 4),
                Text(location, style: TextStyle(color: Colors.grey.shade700, fontSize: 16)),
              ],
            ),
            const Divider(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Status: $status', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF042e6f),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                  ),
                  child: Text(status == 'Pending' ? 'Start Task' : 'Complete Task', style: const TextStyle(color: Colors.white)),
                )
              ],
            )
          ],
        ),
      ),
    );
  }

}
