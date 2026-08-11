import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../login_screen.dart';

class SecurityProfileTab extends StatefulWidget {
  const SecurityProfileTab({super.key});

  @override
  State<SecurityProfileTab> createState() => _SecurityProfileTabState();
}

class _SecurityProfileTabState extends State<SecurityProfileTab> {
  String _staffId = 'Loading...';
  String _role = 'Loading...';

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  Future<void> _loadUser() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _staffId = prefs.getString('staff_id') ?? 'Unknown ID';
      _role = prefs.getString('role') ?? 'SECURITY_STAFF';
    });
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    final bool isSupervisor = _role == 'SECURITY_SUPERVISOR';

    return SafeArea(
      child: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          // Profile Header
          Center(
            child: Column(
              children: [
                const CircleAvatar(
                  radius: 40,
                  backgroundColor: primaryBlue,
                  child: Icon(Icons.security, size: 40, color: Colors.white),
                ),
                const SizedBox(height: 16),
                const Text('Officer S. Rajan', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                Text(_staffId, style: TextStyle(fontSize: 14, color: Colors.grey.shade700, fontWeight: FontWeight.bold)),
                const SizedBox(height: 4),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(color: primaryBlue.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(12)),
                  child: Text(isSupervisor ? 'Security Supervisor' : 'Security Staff', style: const TextStyle(fontSize: 12, color: primaryBlue, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          
          // Work Information Card
          const Text('Assignment Details', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black87)),
          const SizedBox(height: 12),
          Card(
            elevation: 0,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: Colors.grey.shade200)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  _buildProfileDetailRow('Hospital', 'Government General Hospital'),
                  const Divider(height: 16),
                  _buildProfileDetailRow('Unit/Sector', 'Sector 1 (Main Building)'),
                  const Divider(height: 16),
                  _buildProfileDetailRow('Shift', '08:00 AM - 04:00 PM'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),
          
          // Supervisor Features (Role-based)
          if (isSupervisor) ...[
            const Text('Supervisor Controls', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black87)),
            const SizedBox(height: 8),
            _buildSettingsTile(Icons.group, 'View Security Team Status'),
            _buildSettingsTile(Icons.assignment_ind, 'Unassigned Incidents'),
            _buildSettingsTile(Icons.bar_chart, 'Response Performance'),
            const SizedBox(height: 24),
          ],
          
          // Account Settings
          const Text('Account Settings', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black87)),
          const SizedBox(height: 8),
          _buildSettingsTile(Icons.edit, 'Edit Contact Info'),
          _buildSettingsTile(Icons.lock, 'Change Password'),
          _buildSettingsTile(Icons.notifications, 'Notification Preferences'),
          const SizedBox(height: 32),

          // Security Activity
          const Text('Activity & Devices', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black87)),
          const SizedBox(height: 8),
          _buildSettingsTile(Icons.history, 'My Response History'),
          _buildSettingsTile(Icons.devices, 'Registered Devices'),

          const SizedBox(height: 32),
          ListTile(
            leading: const Icon(Icons.logout, color: Colors.red),
            title: const Text('Secure Logout', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 14)),
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
              side: BorderSide(color: Colors.red.shade200, width: 1)
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
            child: Text(label, style: TextStyle(color: Colors.grey.shade600, fontSize: 13))
          ),
          Expanded(
            flex: 3,
            child: Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13))
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
        child: Icon(icon, color: const Color(0xFF042e6f), size: 20),
      ),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
      trailing: const Icon(Icons.chevron_right, color: Colors.grey, size: 20),
      contentPadding: const EdgeInsets.symmetric(horizontal: 0, vertical: 4),
      onTap: () {},
    );
  }
}
