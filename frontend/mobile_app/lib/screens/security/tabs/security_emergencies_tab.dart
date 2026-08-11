import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../../constants.dart';
import '../security_incident_detail_screen.dart';

class SecurityEmergenciesTab extends StatefulWidget {
  const SecurityEmergenciesTab({super.key});

  @override
  State<SecurityEmergenciesTab> createState() => _SecurityEmergenciesTabState();
}

class _SecurityEmergenciesTabState extends State<SecurityEmergenciesTab> {
  String _selectedFilter = 'All';
  List<dynamic> _alerts = [];
  bool _isLoading = true;
  String _errorMessage = '';

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
      if (!mounted) return;
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
      if (!mounted) return;
      setState(() {
        _errorMessage = 'Cannot connect to server. Check your network.';
        _isLoading = false;
      });
    }
  }

  List<dynamic> get _filteredAlerts {
    if (_selectedFilter == 'All') return _alerts;
    return _alerts.where((a) => a['status'] == _selectedFilter).toList();
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return SafeArea(
      child: Column(
        children: [
          // Filter Chips
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(color: Colors.black.withValues(alpha: 0.05), blurRadius: 4, offset: const Offset(0, 2)),
              ],
            ),
            child: Row(
              children: [
                Expanded(
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: _filters.map((filter) {
                        final isSelected = _selectedFilter == filter;
                        return Padding(
                          padding: const EdgeInsets.only(right: 8.0),
                          child: FilterChip(
                            label: Text(
                              filter,
                              style: TextStyle(
                                color: isSelected ? Colors.white : Colors.black87,
                                fontSize: 13,
                                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                              ),
                            ),
                            selected: isSelected,
                            onSelected: (bool selected) {
                              setState(() => _selectedFilter = filter);
                            },
                            backgroundColor: Colors.grey.shade100,
                            selectedColor: primaryBlue,
                            checkmarkColor: Colors.white,
                            padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 0),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                              side: BorderSide(color: isSelected ? primaryBlue : Colors.grey.shade300),
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.refresh),
                  onPressed: _fetchAlerts,
                  tooltip: 'Refresh',
                ),
              ],
            ),
          ),

          // Incident List
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
                            Text(_errorMessage, textAlign: TextAlign.center, style: TextStyle(color: Colors.grey.shade600)),
                            const SizedBox(height: 16),
                            ElevatedButton(onPressed: _fetchAlerts, child: const Text('Retry')),
                          ],
                        ),
                      )
                    : _filteredAlerts.isEmpty
                        ? _buildEmptyState()
                        : RefreshIndicator(
                            onRefresh: _fetchAlerts,
                            child: ListView.builder(
                              padding: const EdgeInsets.all(16),
                              itemCount: _filteredAlerts.length,
                              itemBuilder: (context, index) {
                                return _buildIncidentCard(_filteredAlerts[index]);
                              },
                            ),
                          ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.check_circle_outline, size: 80, color: Colors.grey.shade400),
          const SizedBox(height: 16),
          Text(
            _selectedFilter == 'All' ? 'No alerts found' : 'No $_selectedFilter alerts',
            style: TextStyle(fontSize: 18, color: Colors.grey.shade600, fontWeight: FontWeight.w600),
          ),
          const SizedBox(height: 8),
          Text('All clear in your sector', style: TextStyle(fontSize: 14, color: Colors.grey.shade500)),
        ],
      ),
    );
  }

  Widget _buildIncidentCard(Map<String, dynamic> alert) {
    final isActive = alert['status'] == 'ACTIVE';
    final priorityColor = isActive ? Colors.red : Colors.green;
    final createdAt = alert['created_at'] != null ? DateTime.tryParse(alert['created_at']) : null;
    final timeStr = createdAt != null
        ? '${createdAt.day}/${createdAt.month} ${createdAt.hour}:${createdAt.minute.toString().padLeft(2, '0')}'
        : 'Unknown';

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => SecurityIncidentDetailScreen(
              incidentId: '${alert['id']}',
              alertData: alert,
            ),
          ),
        ).then((_) => _fetchAlerts()); // Refresh after returning
      },
      child: Card(
        elevation: 1,
        margin: const EdgeInsets.only(bottom: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(color: isActive ? Colors.red.shade200 : Colors.grey.shade200),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header row
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: priorityColor.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          'Alert #${alert['id']}',
                          style: TextStyle(color: priorityColor, fontWeight: FontWeight.bold, fontSize: 12),
                        ),
                      ),
                      if (isActive) ...[
                        const SizedBox(width: 8),
                        _buildLiveIndicator(),
                      ],
                    ],
                  ),
                  Text(timeStr, style: const TextStyle(fontSize: 11, color: Colors.grey, fontWeight: FontWeight.w500)),
                ],
              ),
              const SizedBox(height: 12),

              // Emergency Type
              Row(
                children: [
                  Icon(Icons.warning, color: priorityColor, size: 20),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      alert['emergency_type'] ?? 'SOS Emergency',
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black87),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade100,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(color: Colors.grey.shade300),
                    ),
                    child: Text(
                      alert['status'] ?? 'UNKNOWN',
                      style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey.shade800),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Staff & Location
              Row(
                children: [
                  const Icon(Icons.person, size: 14, color: Colors.grey),
                  const SizedBox(width: 4),
                  Text('Staff: ${alert['staff_id'] ?? 'Unknown'}', style: const TextStyle(fontSize: 12, color: Colors.black87)),
                ],
              ),
              if (alert['latitude'] != null) ...[
                const SizedBox(height: 4),
                Row(
                  children: [
                    const Icon(Icons.location_on, size: 14, color: Colors.grey),
                    const SizedBox(width: 4),
                    Text(
                      'Lat: ${alert['latitude']}  Long: ${alert['longitude']}',
                      style: const TextStyle(fontSize: 12, color: Colors.black54),
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLiveIndicator() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
      decoration: BoxDecoration(
        color: Colors.red.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(4),
        border: Border.all(color: Colors.red.withValues(alpha: 0.3)),
      ),
      child: const Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.circle, color: Colors.red, size: 6),
          SizedBox(width: 4),
          Text('LIVE', style: TextStyle(color: Colors.red, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
        ],
      ),
    );
  }
}
