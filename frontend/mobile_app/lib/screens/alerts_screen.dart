import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../constants.dart';

class AlertsScreen extends StatefulWidget {
  const AlertsScreen({super.key});

  @override
  State<AlertsScreen> createState() => _AlertsScreenState();
}

class _AlertsScreenState extends State<AlertsScreen> {
  List<dynamic> _alerts = [];
  bool _isLoading = true;
  String _errorMessage = '';
  String _selectedFilter = 'All';

  final List<String> _filters = ['All', 'ACTIVE', 'RESOLVED'];

  @override
  void initState() {
    super.initState();
    _fetchAlerts();
  }

  Future<void> _fetchAlerts() async {
    setState(() {
      _isLoading = true;
      _errorMessage = '';
    });
    try {
      final response = await http.get(Uri.parse('${ApiConstants.baseUrl}/alerts'));
      if (response.statusCode == 200) {
        setState(() {
          _alerts = json.decode(response.body);
          _isLoading = false;
        });
      } else {
        setState(() {
          _errorMessage = 'Failed to load alerts (${response.statusCode})';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Cannot connect to server. Check your network.';
        _isLoading = false;
      });
    }
  }

  Future<void> _resolveAlert(int id) async {
    try {
      final response = await http.put(Uri.parse('${ApiConstants.baseUrl}/alerts/$id/resolve'));
      if (response.statusCode == 200) {
        _fetchAlerts(); // Refresh list
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Alert Resolved'), backgroundColor: Colors.green),
          );
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to resolve alert'), backgroundColor: Colors.red),
        );
      }
    }
  }

  List<dynamic> get _filteredAlerts {
    if (_selectedFilter == 'All') return _alerts;
    return _alerts.where((a) => a['status'] == _selectedFilter).toList();
  }

  Color _statusColor(String status) {
    switch (status) {
      case 'ACTIVE':
        return Colors.red;
      case 'RESOLVED':
        return Colors.green;
      default:
        return Colors.orange;
    }
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        title: const Text('Alerts Dashboard', style: TextStyle(color: Colors.white)),
        backgroundColor: primaryBlue,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchAlerts,
            tooltip: 'Refresh',
          ),
        ],
      ),
      body: Column(
        children: [
          // Filter Row
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            child: Row(
              children: _filters.map((f) => Padding(
                padding: const EdgeInsets.only(right: 8),
                child: ChoiceChip(
                  label: Text(f),
                  selected: _selectedFilter == f,
                  selectedColor: primaryBlue.withValues(alpha: 0.2),
                  onSelected: (_) => setState(() => _selectedFilter = f),
                ),
              )).toList(),
            ),
          ),

          // Content
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _errorMessage.isNotEmpty
                    ? Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.cloud_off, size: 64, color: Colors.grey.shade400),
                            const SizedBox(height: 16),
                            Text(_errorMessage,
                                textAlign: TextAlign.center,
                                style: TextStyle(color: Colors.grey.shade600, fontSize: 16)),
                            const SizedBox(height: 16),
                            ElevatedButton(onPressed: _fetchAlerts, child: const Text('Retry')),
                          ],
                        ),
                      )
                    : _filteredAlerts.isEmpty
                        ? Center(
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(Icons.check_circle_outline, size: 64, color: Colors.green.shade300),
                                const SizedBox(height: 16),
                                Text(
                                  _selectedFilter == 'All'
                                      ? 'No alerts found'
                                      : 'No $_selectedFilter alerts',
                                  style: const TextStyle(fontSize: 18, color: Colors.black54),
                                ),
                              ],
                            ),
                          )
                        : RefreshIndicator(
                            onRefresh: _fetchAlerts,
                            child: ListView.builder(
                              padding: const EdgeInsets.all(12),
                              itemCount: _filteredAlerts.length,
                              itemBuilder: (context, index) {
                                final alert = _filteredAlerts[index];
                                final status = alert['status'] ?? 'UNKNOWN';
                                final isActive = status == 'ACTIVE';
                                final createdAt = alert['created_at'] != null
                                    ? DateTime.tryParse(alert['created_at'])
                                    : null;

                                return Card(
                                  elevation: 2,
                                  margin: const EdgeInsets.only(bottom: 12),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12),
                                    side: isActive
                                        ? const BorderSide(color: Colors.red, width: 1.5)
                                        : BorderSide.none,
                                  ),
                                  child: Padding(
                                    padding: const EdgeInsets.all(16),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Row(
                                          children: [
                                            if (isActive)
                                              Container(
                                                width: 10,
                                                height: 10,
                                                margin: const EdgeInsets.only(right: 8),
                                                decoration: const BoxDecoration(
                                                  shape: BoxShape.circle,
                                                  color: Colors.red,
                                                ),
                                              ),
                                            Text(
                                              'Alert #${alert['id']}',
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold, fontSize: 16),
                                            ),
                                            const Spacer(),
                                            Container(
                                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                              decoration: BoxDecoration(
                                                color: _statusColor(status).withValues(alpha: 0.1),
                                                borderRadius: BorderRadius.circular(20),
                                                border: Border.all(color: _statusColor(status).withValues(alpha: 0.5)),
                                              ),
                                              child: Text(
                                                status,
                                                style: TextStyle(
                                                  color: _statusColor(status),
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 12,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        const SizedBox(height: 10),
                                        Row(children: [
                                          const Icon(Icons.warning_amber, size: 16, color: Colors.orange),
                                          const SizedBox(width: 6),
                                          Text(
                                            alert['emergency_type'] ?? 'SOS Emergency',
                                            style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
                                          ),
                                        ]),
                                        const SizedBox(height: 6),
                                        Row(children: [
                                          const Icon(Icons.person, size: 16, color: Colors.blueGrey),
                                          const SizedBox(width: 6),
                                          Text('Staff: ${alert['staff_id'] ?? 'Unknown'}',
                                              style: const TextStyle(color: Colors.black54)),
                                        ]),
                                        if (alert['latitude'] != null) ...[
                                          const SizedBox(height: 4),
                                          Row(children: [
                                            const Icon(Icons.location_on, size: 16, color: Colors.blueGrey),
                                            const SizedBox(width: 6),
                                            Text(
                                              'Lat: ${alert['latitude']}  Long: ${alert['longitude']}',
                                              style: const TextStyle(color: Colors.black54, fontSize: 13),
                                            ),
                                          ]),
                                        ],
                                        if (createdAt != null) ...[
                                          const SizedBox(height: 4),
                                          Row(children: [
                                            const Icon(Icons.access_time, size: 16, color: Colors.blueGrey),
                                            const SizedBox(width: 6),
                                            Text(
                                              '${createdAt.day}/${createdAt.month}/${createdAt.year}  ${createdAt.hour}:${createdAt.minute.toString().padLeft(2, '0')}',
                                              style: const TextStyle(color: Colors.black45, fontSize: 13),
                                            ),
                                          ]),
                                        ],
                                        if (isActive) ...[
                                          const SizedBox(height: 12),
                                          Row(
                                            mainAxisAlignment: MainAxisAlignment.end,
                                            children: [
                                              ElevatedButton(
                                                onPressed: () => _resolveAlert(alert['id']),
                                                style: ElevatedButton.styleFrom(
                                                  backgroundColor: Colors.green,
                                                  foregroundColor: Colors.white,
                                                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                                                ),
                                                child: const Text('Mark Resolved'),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ],
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
          ),
        ],
      ),
    );
  }
}
