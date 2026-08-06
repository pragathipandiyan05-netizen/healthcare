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
          children: const [
            Icon(Icons.shield, color: Colors.red, size: 28),
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
                            child: const Icon(Icons.shield, color: Colors.red, size: 28),
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
          _buildProfileTab(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        selectedItemColor: primaryBlue,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.notifications), label: 'Alerts'),
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
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('Welcome', style: TextStyle(color: Colors.white70, fontSize: 18)),
                        SizedBox(height: 2),
                        Text('Dr. Kavitha R', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                        SizedBox(height: 2),
                        Text('Government Hospital, Chennai', style: TextStyle(color: Colors.white70, fontSize: 18)),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.notifications_none, color: Colors.white, size: 24),
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(),
                    onPressed: () { ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Feature coming soon!'))); },
                  ),
                ],
              ),
            ),
            
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Huge SOS Button
                  Center(
                    child: GestureDetector(
                      onTap: () => sendSOS(context),
                      child: Container(
                        width: 160,
                        height: 160,
                        decoration: BoxDecoration(
                          color: Colors.red,
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(color: Colors.red.withValues(alpha: 0.3), blurRadius: 20, spreadRadius: 5),
                          ],
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: const [
                            Icon(Icons.health_and_safety, color: Colors.white, size: 40),
                            SizedBox(height: 8),
                            Text('SOS', style: TextStyle(color: Colors.white, fontSize: 38, fontWeight: FontWeight.bold, letterSpacing: 2)),
                            Text('Emergency\nHelp', textAlign: TextAlign.center, style: TextStyle(color: Colors.white, fontSize: 18)),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),

                  const Text('Quick Actions', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black87)),
                  const SizedBox(height: 16),
                  
                  // Grid of Actions
                  GridView.count(
                    crossAxisCount: 2,
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    mainAxisSpacing: 16,
                    crossAxisSpacing: 16,
                    childAspectRatio: 1.1,
                    children: [
                      _buildGridItem(Icons.medication_liquid, 'Drug/Consumable\nShortage', Colors.blue, Colors.blue.shade50, () => showShortage(context)),
                      _buildGridItem(Icons.bloodtype, 'Blood\nRequest', Colors.red, Colors.red.shade50, () => showBloodRequest(context)),
                      _buildGridItem(Icons.build, 'Equipment\nFault', Colors.blue, Colors.blue.shade50, () => showEquipmentFault(context)),
                      _buildGridItem(Icons.warning_amber_rounded, 'Facility\nHazard', Colors.orange, Colors.orange.shade50, () => showFacilityHazard(context)),
                    ],
                  ),

                  const SizedBox(height: 32),
                  const Text('Dashboard Summary', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black87)),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(child: _buildSummaryCard('Active Alerts', '12', Colors.red)),
                      const SizedBox(width: 16),
                      Expanded(child: _buildSummaryCard('Pending Reports', '5', Colors.orange)),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(child: _buildSummaryCard('Resolved Today', '28', Colors.green)),
                      const SizedBox(width: 16),
                      Expanded(child: _buildSummaryCard('Critical Incidents', '2', Colors.purple)),
                    ],
                  ),

                  const SizedBox(height: 32),
                  const Text('Recent Activity', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black87)),
                  const SizedBox(height: 16),
                  _buildActivityItem('Blood Request (O+)', 'Resolved', '2 hrs ago', Icons.check_circle, Colors.green),
                  _buildActivityItem('Equipment Fault (MRI)', 'Pending', '5 hrs ago', Icons.pending, Colors.orange),
                  _buildActivityItem('Drug Shortage (Paracetamol)', 'Acknowledged', '1 day ago', Icons.info, Colors.blue),
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
                  ...['All', 'SOS', 'Drug Shortage', 'Blood', 'Equipment', 'Resolved'].map((label) => _buildFilterChip(label, _selectedAlertFilter == label)),
                ],
              ),
            ),
            // Alert Feed
            Expanded(
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  {'title': 'Critical SOS', 'hosp': 'Govt Hospital, Chennai', 'dept': 'Emergency Ward', 'time': 'Just now', 'priority': 'Critical', 'status': 'Active', 'icon': Icons.warning, 'color': Colors.red, 'cat': 'SOS'},
                  {'title': 'Blood Required (O+)', 'hosp': 'Govt Hospital, Chennai', 'dept': 'Blood Bank', 'time': '10 min ago', 'priority': 'High', 'status': 'Acknowledged', 'icon': Icons.bloodtype, 'color': Colors.orange, 'cat': 'Blood'},
                  {'title': 'Ventilator Fault', 'hosp': 'Govt Hospital, Madurai', 'dept': 'ICU', 'time': '1 hr ago', 'priority': 'High', 'status': 'Active', 'icon': Icons.build, 'color': Colors.orange, 'cat': 'Equipment'},
                  {'title': 'Paracetamol Shortage', 'hosp': 'Primary Health Centre', 'dept': 'Pharmacy', 'time': '3 hrs ago', 'priority': 'Medium', 'status': 'Resolved', 'icon': Icons.medication, 'color': Colors.green, 'cat': 'Drug Shortage'},
                ].where((a) => _selectedAlertFilter == 'All' || _selectedAlertFilter == 'Resolved' && a['status'] == 'Resolved' || _selectedAlertFilter == a['cat'] && a['status'] != 'Resolved').map((a) => 
                  _buildAlertCard(a['title'] as String, a['hosp'] as String, a['dept'] as String, a['time'] as String, a['priority'] as String, a['status'] as String, a['icon'] as IconData, a['color'] as Color)
                ).toList(),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () { ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Feature coming soon!'))); },
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
                const Text('Dr. Kavitha R', style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold)),
                Text('EMP-001 • Chief Medical Officer', style: TextStyle(fontSize: 20, color: Colors.grey.shade600)),
              ],
            ),
          ),
          const SizedBox(height: 24),
          
          // Staff Details Card
          Card(
            elevation: 1,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  _buildProfileDetailRow('Department', 'Emergency Ward'),
                  const Divider(),
                  _buildProfileDetailRow('Hospital', 'Government General Hospital'),
                  const Divider(),
                  _buildProfileDetailRow('District', 'Chennai'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),
          
          const Text('Settings', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.black87)),
          const SizedBox(height: 8),
          _buildSettingsTile(Icons.edit, 'Edit Profile'),
          _buildSettingsTile(Icons.language, 'Language (English / தமிழ்)'),
          _buildSettingsTile(Icons.notifications, 'Notification Settings'),
          _buildSettingsTile(Icons.contact_phone, 'Emergency Contacts'),
          _buildSettingsTile(Icons.assignment, 'My Reports'),
          _buildSettingsTile(Icons.security, 'Privacy & Security'),
          _buildSettingsTile(Icons.help_outline, 'Help & Support'),
          ListTile(
            leading: const Icon(Icons.logout, color: Colors.red),
            title: const Text('Logout', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
            onTap: () {},
          ),
        ],
      ),
    );
  }

  Widget _buildProfileDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 100, child: Text(label, style: TextStyle(color: Colors.grey.shade600, fontSize: 20))),
          Expanded(child: Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20))),
        ],
      ),
    );
  }

  Widget _buildSettingsTile(IconData icon, String title) {
    return ListTile(
      leading: Icon(icon, color: const Color(0xFF042e6f)),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w500)),
      trailing: const Icon(Icons.chevron_right, color: Colors.grey),
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
}
