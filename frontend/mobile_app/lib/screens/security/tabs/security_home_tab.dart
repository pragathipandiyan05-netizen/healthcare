import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../../constants.dart';

class SecurityHomeTab extends StatefulWidget {
  final Function(int) onNavigate;
  
  const SecurityHomeTab({super.key, required this.onNavigate});

  @override
  State<SecurityHomeTab> createState() => _SecurityHomeTabState();
}

class _SecurityHomeTabState extends State<SecurityHomeTab> {
  bool _isOnDuty = true;
  String _staffId = 'Loading...';
  String _role = 'Loading...';
  String _name = 'Security Officer';

  // Stats from backend
  int _activeAlerts = 0;
  int _totalAlerts = 0;
  bool _statsLoading = true;

  // Recent alerts from backend
  List<dynamic> _recentAlerts = [];

  @override
  void initState() {
    super.initState();
    _loadUser();
    _fetchStats();
  }

  Future<void> _loadUser() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _staffId = prefs.getString('staff_id') ?? 'Unknown ID';
      _role = prefs.getString('role') ?? 'Security Officer';
      _name = prefs.getString('name') ?? 'Security Officer';
    });
  }

  Future<void> _fetchStats() async {
    setState(() => _statsLoading = true);
    try {
      final statsRes = await http.get(Uri.parse('${ApiConstants.baseUrl}/alerts/stats'));
      final alertsRes = await http.get(Uri.parse('${ApiConstants.baseUrl}/alerts'));

      if (!mounted) return;

      if (statsRes.statusCode == 200) {
        final stats = json.decode(statsRes.body);
        setState(() {
          _activeAlerts = stats['active'] ?? 0;
          _totalAlerts = stats['total'] ?? 0;
          _statsLoading = false;
        });
      }

      if (alertsRes.statusCode == 200) {
        final alerts = json.decode(alertsRes.body) as List;
        setState(() {
          _recentAlerts = alerts.take(3).toList();
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() => _statsLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return SafeArea(
      child: RefreshIndicator(
        onRefresh: _fetchStats,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Header Section
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 20.0),
                decoration: const BoxDecoration(
                  color: primaryBlue,
                  borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(24),
                    bottomRight: Radius.circular(24),
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
                            children: [
                              Text(
                                _role == 'SECURITY_SUPERVISOR' ? 'Supervisor Command' : 'Security Command',
                                style: const TextStyle(color: Colors.white70, fontSize: 14),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                _name,
                                style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold),
                              ),
                              const SizedBox(height: 4),
                              Text('ID: $_staffId', style: const TextStyle(color: Colors.white70, fontSize: 14)),
                            ],
                          ),
                        ),
                        // Duty Toggle
                        GestureDetector(
                          onTap: () => setState(() => _isOnDuty = !_isOnDuty),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            decoration: BoxDecoration(
                              color: _isOnDuty ? Colors.green.withValues(alpha: 0.2) : Colors.grey.withValues(alpha: 0.3),
                              borderRadius: BorderRadius.circular(30),
                              border: Border.all(color: _isOnDuty ? Colors.green.shade300 : Colors.grey.shade400),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(Icons.circle, color: _isOnDuty ? Colors.greenAccent : Colors.grey, size: 12),
                                const SizedBox(width: 8),
                                Text(
                                  _isOnDuty ? 'ON DUTY' : 'OFF DUTY',
                                  style: TextStyle(
                                    color: _isOnDuty ? Colors.white : Colors.grey.shade300,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Government General Hospital, Chennai',
                      style: TextStyle(color: Colors.white, fontSize: 14, fontWeight: FontWeight.w500),
                    ),
                  ],
                ),
              ),
              
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Current Status', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black87)),
                    const SizedBox(height: 12),
                    // KPI Grid
                    if (_statsLoading)
                      const Center(child: Padding(
                        padding: EdgeInsets.all(20),
                        child: CircularProgressIndicator(),
                      ))
                    else ...[
                      Row(
                        children: [
                          Expanded(child: _buildKPICard('Active\nAlerts', '$_activeAlerts', Colors.red)),
                          const SizedBox(width: 12),
                          Expanded(child: _buildKPICard('Total\nAlerts', '$_totalAlerts', Colors.orange)),
                        ],
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Expanded(child: _buildKPICard('Resolved', '${_totalAlerts - _activeAlerts}', Colors.green)),
                          const SizedBox(width: 12),
                          Expanded(child: _buildKPICard('On Duty\nStatus', _isOnDuty ? 'ACTIVE' : 'OFF', _isOnDuty ? Colors.blue : Colors.grey)),
                        ],
                      ),
                    ],
                    
                    const SizedBox(height: 24),
                    
                    // Quick Actions
                    const Text('Quick Actions', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black87)),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: _buildActionButton(
                            icon: Icons.warning_rounded,
                            label: 'View Emergencies',
                            color: Colors.orange,
                            onTap: () => widget.onNavigate(1),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _buildActionButton(
                            icon: Icons.map,
                            label: 'Open Live Map',
                            color: primaryBlue,
                            onTap: () => widget.onNavigate(2),
                          ),
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 24),
                    
                    // Recent Incidents
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Recent Alerts', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black87)),
                        TextButton(
                          onPressed: () => widget.onNavigate(1),
                          child: const Text('See All', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    if (_recentAlerts.isEmpty)
                      Container(
                        padding: const EdgeInsets.all(20),
                        decoration: BoxDecoration(
                          color: Colors.grey.shade50,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: Colors.grey.shade200),
                        ),
                        child: const Center(
                          child: Text('No recent alerts', style: TextStyle(color: Colors.grey)),
                        ),
                      )
                    else
                      ..._recentAlerts.map((alert) {
                        final isActive = alert['status'] == 'ACTIVE';
                        return _buildRecentIncidentCard(
                          alert['emergency_type'] ?? 'SOS Emergency',
                          'Staff: ${alert['staff_id'] ?? 'Unknown'}',
                          '#${alert['id']}',
                          alert['status'] ?? 'UNKNOWN',
                          isActive ? Colors.red : Colors.green,
                        );
                      }),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildKPICard(String title, String count, Color color) {
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
          Text(count, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color)),
          const SizedBox(height: 4),
          Text(title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.black87, height: 1.2)),
        ],
      ),
    );
  }

  Widget _buildActionButton({required IconData icon, required String label, required Color color, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: color.withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withValues(alpha: 0.2)),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(height: 8),
            Text(label, style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 13)),
          ],
        ),
      ),
    );
  }

  Widget _buildRecentIncidentCard(String title, String location, String time, String status, Color priorityColor) {
    return Card(
      elevation: 0,
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(color: Colors.grey.shade300),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: priorityColor.withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: Icon(Icons.warning, color: priorityColor, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  const SizedBox(height: 4),
                  Text('$location • $time', style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
                ],
              ),
            ),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: status == 'ACTIVE' ? Colors.red.withValues(alpha: 0.1) : Colors.green.withValues(alpha: 0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                status,
                style: TextStyle(
                  color: status == 'ACTIVE' ? Colors.red : Colors.green,
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
