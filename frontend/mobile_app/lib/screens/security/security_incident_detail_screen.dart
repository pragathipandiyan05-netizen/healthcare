import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import '../../../constants.dart';

class SecurityIncidentDetailScreen extends StatefulWidget {
  final String incidentId;
  final Map<String, dynamic>? alertData;
  
  const SecurityIncidentDetailScreen({
    super.key,
    required this.incidentId,
    this.alertData,
  });

  @override
  State<SecurityIncidentDetailScreen> createState() => _SecurityIncidentDetailScreenState();
}

class _SecurityIncidentDetailScreenState extends State<SecurityIncidentDetailScreen> {
  String _role = 'SECURITY_STAFF';
  String _status = 'ACTIVE';
  bool _isAssigned = false;
  bool _isResolving = false;

  @override
  void initState() {
    super.initState();
    _loadUser();
    // Initialise from passed alert data
    if (widget.alertData != null) {
      _status = widget.alertData!['status'] ?? 'ACTIVE';
    }
  }

  Future<void> _loadUser() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _role = prefs.getString('role') ?? 'SECURITY_STAFF';
    });
  }

  Future<void> _resolveIncident() async {
    setState(() => _isResolving = true);
    try {
      final response = await http.put(
        Uri.parse('${ApiConstants.baseUrl}/alerts/${widget.incidentId}/resolve'),
      );
      if (!mounted) return;
      setState(() => _isResolving = false);

      if (response.statusCode == 200) {
        setState(() => _status = 'RESOLVED');
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('✅ Incident Resolved'), backgroundColor: Colors.green),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to resolve (${response.statusCode})'), backgroundColor: Colors.red),
        );
      }
    } catch (e) {
      if (!mounted) return;
      setState(() => _isResolving = false);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Cannot connect to server.'), backgroundColor: Colors.red),
      );
    }
  }

  void _updateLocalStatus(String newStatus) {
    setState(() => _status = newStatus);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Status updated to $newStatus'), backgroundColor: Colors.green),
    );
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    final bool isSupervisor = _role == 'SECURITY_SUPERVISOR';
    final alert = widget.alertData;
    
    Color statusColor = Colors.grey;
    if (_status == 'ACTIVE') statusColor = Colors.red;
    if (_status == 'RESOLVED') statusColor = Colors.green;
    if (_status == 'ACKNOWLEDGED') statusColor = Colors.orange;
    if (_status == 'RESPONDING') statusColor = Colors.purple;
    if (_status == 'ON_SCENE') statusColor = Colors.deepOrange;

    final createdAt = alert?['created_at'] != null ? DateTime.tryParse(alert!['created_at']) : null;
    final timeStr = createdAt != null
        ? '${createdAt.day}/${createdAt.month}/${createdAt.year} at ${createdAt.hour}:${createdAt.minute.toString().padLeft(2, '0')}'
        : 'Unknown';

    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 1,
        iconTheme: const IconThemeData(color: primaryBlue),
        title: Text(
          'Alert #${widget.incidentId}',
          style: const TextStyle(color: primaryBlue, fontSize: 16, fontWeight: FontWeight.bold),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Status Header
              Container(
                padding: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: statusColor.withValues(alpha: 0.3)),
                ),
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
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                  side: BorderSide(color: Colors.grey.shade200),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.warning, color: _status == 'RESOLVED' ? Colors.green : Colors.red),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              alert?['emergency_type'] ?? 'SOS Emergency',
                              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: statusColor.withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              _status,
                              style: TextStyle(color: statusColor, fontWeight: FontWeight.bold, fontSize: 10),
                            ),
                          ),
                        ],
                      ),
                      const Divider(height: 24),
                      _buildDetailRow('Alert ID', '#${widget.incidentId}'),
                      const SizedBox(height: 12),
                      _buildDetailRow('Triggered', timeStr),
                      const SizedBox(height: 12),
                      _buildDetailRow('Staff', alert?['staff_id'] ?? 'Unknown'),
                      if (alert?['latitude'] != null) ...[
                        const SizedBox(height: 12),
                        _buildDetailRow('Latitude', '${alert?['latitude']}'),
                        const SizedBox(height: 12),
                        _buildDetailRow('Longitude', '${alert?['longitude']}'),
                      ],
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),

              // Assignment
              const Text('Assignment', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.black87)),
              const SizedBox(height: 8),
              Card(
                elevation: 0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                  side: BorderSide(color: Colors.grey.shade200),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Icon(
                        _isAssigned ? Icons.person : Icons.person_outline,
                        color: _isAssigned ? primaryBlue : Colors.grey,
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          _isAssigned ? 'Assigned to You' : 'Unassigned',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: _isAssigned ? Colors.black87 : Colors.grey,
                          ),
                        ),
                      ),
                      if (_status != 'RESOLVED')
                        TextButton(
                          onPressed: () => setState(() => _isAssigned = !_isAssigned),
                          child: Text(
                            _isAssigned ? 'UNASSIGN' : 'ASSIGN TO ME',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Action Workflow
              if (_status != 'RESOLVED') ...[
                const Text('Response Actions', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.black87)),
                const SizedBox(height: 12),
                if (_status == 'ACTIVE')
                  _buildActionBtn('ACKNOWLEDGE', Colors.orange, () => _updateLocalStatus('ACKNOWLEDGED')),
                if (_status == 'ACKNOWLEDGED')
                  _buildActionBtn('START RESPONSE', Colors.purple, () => _updateLocalStatus('RESPONDING')),
                if (_status == 'RESPONDING')
                  _buildActionBtn('MARK ON SCENE', Colors.deepOrange, () => _updateLocalStatus('ON_SCENE')),
                if (_status == 'ON_SCENE' || _status == 'ACKNOWLEDGED' || _status == 'RESPONDING' || isSupervisor) ...[
                  const SizedBox(height: 12),
                  _isResolving
                      ? const Center(child: CircularProgressIndicator())
                      : ElevatedButton(
                          onPressed: _resolveIncident,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.green,
                            padding: const EdgeInsets.symmetric(vertical: 20),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          child: const Text(
                            'RESOLVE INCIDENT',
                            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14, letterSpacing: 1),
                          ),
                        ),
                ],
              ] else ...[
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.green.shade50,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.green.shade200),
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.check_circle, color: Colors.green),
                      SizedBox(width: 8),
                      Text('This incident has been resolved', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
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
      child: Text(
        label,
        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 14, letterSpacing: 1),
      ),
    );
  }
}
