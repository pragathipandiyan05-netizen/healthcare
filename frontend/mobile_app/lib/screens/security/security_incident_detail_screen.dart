import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SecurityIncidentDetailScreen extends StatefulWidget {
  final String incidentId;
  
  const SecurityIncidentDetailScreen({super.key, required this.incidentId});

  @override
  State<SecurityIncidentDetailScreen> createState() => _SecurityIncidentDetailScreenState();
}

class _SecurityIncidentDetailScreenState extends State<SecurityIncidentDetailScreen> {
  String _role = 'SECURITY_STAFF';
  String _status = 'NEW';
  bool _isAssigned = false;

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  Future<void> _loadUser() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _role = prefs.getString('role') ?? 'SECURITY_STAFF';
    });
  }

  void _updateStatus(String newStatus) {
    setState(() {
      _status = newStatus;
    });
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Status updated to $newStatus'), backgroundColor: Colors.green));
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    final bool isSupervisor = _role == 'SECURITY_SUPERVISOR';
    
    // Status UI derivation
    Color statusColor = Colors.grey;
    if (_status == 'NEW') statusColor = Colors.blue;
    if (_status == 'ACKNOWLEDGED') statusColor = Colors.orange;
    if (_status == 'RESPONDING') statusColor = Colors.purple;
    if (_status == 'ON_SCENE') statusColor = Colors.deepOrange;
    if (_status == 'RESOLVED') statusColor = Colors.green;

    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        iconTheme: const IconThemeData(color: primaryBlue),
        title: Text('Incident ${widget.incidentId}', style: const TextStyle(color: primaryBlue, fontSize: 16, fontWeight: FontWeight.bold)),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Timeline header
              Container(
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.grey.shade200)),
                child: Column(
                  children: [
                    const Text('CURRENT STATUS', style: TextStyle(fontSize: 10, color: Colors.grey, fontWeight: FontWeight.bold, letterSpacing: 1)),
                    const SizedBox(height: 4),
                    Text(_status, style: TextStyle(fontSize: 20, color: statusColor, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              
              // Incident Details Card
              Card(
                elevation: 0,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: Colors.grey.shade200)),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.warning, color: Colors.red),
                              const SizedBox(width: 8),
                              const Text('Emergency SOS', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                            ],
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(color: Colors.red.withValues(alpha: 0.1), borderRadius: BorderRadius.circular(8)),
                            child: const Text('CRITICAL', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold, fontSize: 10)),
                          )
                        ],
                      ),
                      const Divider(height: 24),
                      _buildDetailRow('Triggered', '10:42 AM (2 mins ago)'),
                      const SizedBox(height: 12),
                      _buildDetailRow('Worker', 'Dr. Kavitha R (Chief Medical Officer)'),
                      const SizedBox(height: 12),
                      _buildDetailRow('Hospital', 'Government General Hospital'),
                      const SizedBox(height: 12),
                      _buildDetailRow('Department', 'Emergency Ward'),
                      const SizedBox(height: 12),
                      _buildDetailRow('Location', 'Building A • Floor 2 • Room 204'),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: () {},
                          icon: const Icon(Icons.map, size: 16, color: Colors.white),
                          label: const Text('VIEW ON MAP', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12)),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: primaryBlue,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Assignment Details
              const Text('Assignment', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.black87)),
              const SizedBox(height: 8),
              Card(
                elevation: 0,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: BorderSide(color: Colors.grey.shade200)),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          Icon(_isAssigned ? Icons.person : Icons.person_outline, color: _isAssigned ? primaryBlue : Colors.grey),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(_isAssigned ? 'Officer S. Rajan' : 'Unassigned', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: _isAssigned ? Colors.black87 : Colors.grey)),
                          ),
                          if (isSupervisor)
                            TextButton(
                              onPressed: () => setState(() => _isAssigned = !_isAssigned),
                              child: Text(_isAssigned ? 'REASSIGN' : 'ASSIGN', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                            )
                        ],
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Action Workflow
              if (_status != 'RESOLVED' && _isAssigned) ...[
                const Text('Response Workflow', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.black87)),
                const SizedBox(height: 12),
                if (_status == 'NEW')
                  _buildActionBtn('ACKNOWLEDGE INCIDENT', Colors.orange, () => _updateStatus('ACKNOWLEDGED')),
                if (_status == 'ACKNOWLEDGED')
                  _buildActionBtn('START RESPONSE', Colors.purple, () => _updateStatus('RESPONDING')),
                if (_status == 'RESPONDING')
                  _buildActionBtn('MARK ON SCENE', Colors.deepOrange, () => _updateStatus('ON_SCENE')),
                if (_status == 'ON_SCENE')
                  _buildActionBtn('RESOLVE INCIDENT', Colors.green, () => _updateStatus('RESOLVED')),
              ] else if (_status != 'RESOLVED' && !isSupervisor) ...[
                const Center(child: Text('Incident is currently unassigned.', style: TextStyle(color: Colors.grey))),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(width: 80, child: Text(label, style: TextStyle(color: Colors.grey.shade600, fontSize: 12))),
        Expanded(child: Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13))),
      ],
    );
  }

  Widget _buildActionBtn(String label, Color color, VoidCallback onPressed) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: color,
        padding: const EdgeInsets.symmetric(vertical: 20),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
      child: Text(label, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14, letterSpacing: 1)),
    );
  }
}
