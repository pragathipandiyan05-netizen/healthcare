import 'package:flutter/material.dart';
import '../security_incident_detail_screen.dart';

class SecurityEmergenciesTab extends StatefulWidget {
  const SecurityEmergenciesTab({super.key});

  @override
  State<SecurityEmergenciesTab> createState() => _SecurityEmergenciesTabState();
}

class _SecurityEmergenciesTabState extends State<SecurityEmergenciesTab> {
  String _selectedFilter = 'All';

  final List<String> _filters = ['All', 'Critical', 'High', 'Assigned', 'Unassigned'];

  // Mock data for UI structure
  final List<Map<String, dynamic>> _incidents = [
    {
      'id': 'SOS-2026-001',
      'worker': 'Dr. Kavitha R',
      'role': 'Chief Medical Officer',
      'dept': 'Emergency Ward',
      'type': 'Emergency SOS',
      'priority': 'Critical',
      'time': 'Just now',
      'status': 'NEW',
      'distance': '120m away',
      'assigned': false,
    },
    {
      'id': 'SOS-2026-002',
      'worker': 'Nurse Anitha',
      'role': 'Staff Nurse',
      'dept': 'Psychiatric Ward',
      'type': 'Violence',
      'priority': 'High',
      'time': '5 min ago',
      'status': 'ACKNOWLEDGED',
      'distance': '350m away',
      'assigned': true,
    },
    {
      'id': 'SOS-2026-003',
      'worker': 'Dr. Ramesh',
      'role': 'Surgeon',
      'dept': 'Operation Theatre 2',
      'type': 'Medical Emergency',
      'priority': 'High',
      'time': '15 min ago',
      'status': 'RESOLVED',
      'distance': '50m away',
      'assigned': true,
    },
  ];

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    List<Map<String, dynamic>> filteredIncidents = _incidents.where((incident) {
      if (_selectedFilter == 'All') return true;
      if (_selectedFilter == 'Critical') return incident['priority'] == 'Critical';
      if (_selectedFilter == 'High') return incident['priority'] == 'High';
      if (_selectedFilter == 'Assigned') return incident['assigned'] == true;
      if (_selectedFilter == 'Unassigned') return incident['assigned'] == false;
      return true;
    }).toList();

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
                        setState(() {
                          _selectedFilter = filter;
                        });
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
          
          // Incident List
          Expanded(
            child: filteredIncidents.isEmpty 
              ? _buildEmptyState()
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: filteredIncidents.length,
                  itemBuilder: (context, index) {
                    return _buildIncidentCard(filteredIncidents[index]);
                  },
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
          Text('No ${_selectedFilter == 'All' ? 'active' : _selectedFilter.toLowerCase()} emergencies', style: TextStyle(fontSize: 18, color: Colors.grey.shade600, fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          Text('All clear in your sector', style: TextStyle(fontSize: 14, color: Colors.grey.shade500)),
        ],
      ),
    );
  }

  Widget _buildIncidentCard(Map<String, dynamic> incident) {
    Color priorityColor = incident['priority'] == 'Critical' ? Colors.red : Colors.orange;
    if (incident['status'] == 'RESOLVED') priorityColor = Colors.green;
    
    final bool isLive = incident['status'] != 'RESOLVED' && incident['status'] != 'CANCELLED';

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => SecurityIncidentDetailScreen(incidentId: incident['id'])),
        );
      },
      child: Card(
        elevation: 1,
        margin: const EdgeInsets.only(bottom: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(color: Colors.grey.shade200),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
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
                          incident['id'],
                          style: TextStyle(color: priorityColor, fontWeight: FontWeight.bold, fontSize: 12),
                        ),
                      ),
                      if (isLive) ...[
                        const SizedBox(width: 8),
                        _buildLiveIndicator(),
                      ]
                    ],
                  ),
                  Text(incident['time'], style: const TextStyle(fontSize: 11, color: Colors.grey, fontWeight: FontWeight.w500)),
                ],
              ),
              const SizedBox(height: 12),
              
              // Emergency Type & Priority
              Row(
                children: [
                  Icon(Icons.warning, color: priorityColor, size: 20),
                  const SizedBox(width: 8),
                  Text(incident['type'], style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black87)),
                  const Spacer(),
                  Text(incident['priority'], style: TextStyle(color: priorityColor, fontWeight: FontWeight.bold, fontSize: 13)),
                ],
              ),
              const SizedBox(height: 12),
              
              // Location & Worker Details
              Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.person, size: 14, color: Colors.grey),
                            const SizedBox(width: 4),
                            Text('${incident['worker']} (${incident['role']})', style: const TextStyle(fontSize: 12, color: Colors.black87)),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            const Icon(Icons.location_on, size: 14, color: Colors.grey),
                            const SizedBox(width: 4),
                            Text(incident['dept'], style: const TextStyle(fontSize: 12, color: Colors.black87)),
                          ],
                        ),
                      ],
                    ),
                  ),
                  // Distance & Status
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(incident['distance'], style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: const Color(0xFF042e6f))),
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: Colors.grey.shade100,
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(color: Colors.grey.shade300),
                        ),
                        child: Text(incident['status'], style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey.shade800)),
                      )
                    ],
                  )
                ],
              ),
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
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.circle, color: Colors.red, size: 6),
          const SizedBox(width: 4),
          const Text('LIVE', style: TextStyle(color: Colors.red, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.5)),
        ],
      ),
    );
  }
}
