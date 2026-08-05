import 'package:flutter/material.dart';

class AlertsScreen extends StatefulWidget {
  @override
  _AlertsScreenState createState() => _AlertsScreenState();
}

class _AlertsScreenState extends State<AlertsScreen> {
  final List<String> filters = ['District', 'Hospital', 'Department', 'Alert Type', 'Priority', 'Status', 'Date'];
  final List<String> categories = ['SOS Emergency', 'Drug Shortage', 'Blood Request', 'Equipment Failure', 'Facility Hazard', 'Maintenance'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Alerts Dashboard')),
      body: Column(
        children: [
          // Filter Row
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.all(8),
            child: Row(
              children: filters.map((f) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: FilterChip(label: Text(f), onSelected: (b) {}),
              )).toList(),
            ),
          ),
          // Categories Row
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.all(8),
            child: Row(
              children: categories.map((c) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: ActionChip(label: Text(c), onPressed: () {}),
              )).toList(),
            ),
          ),
          // List
          Expanded(
            child: ListView.builder(
              itemCount: 5,
              itemBuilder: (context, index) {
                return Card(
                  margin: const EdgeInsets.all(8),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Alert ID: #ALT-${index + 1000}', style: const TextStyle(fontWeight: FontWeight.bold)),
                        const SizedBox(height: 8),
                        const Text('Hospital: General Hospital'),
                        const Text('Department: Emergency'),
                        const Text('Reported By: Nurse Staff'),
                        const Text('Date & Time: Oct 10, 10:30 AM'),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            Chip(label: const Text('High Priority'), backgroundColor: Colors.red.shade100),
                            const SizedBox(width: 8),
                            Chip(label: const Text('Active'), backgroundColor: Colors.orange.shade100),
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            TextButton(onPressed: (){}, child: const Text('View')),
                            TextButton(onPressed: (){}, child: const Text('Acknowledge')),
                            TextButton(onPressed: (){}, child: const Text('Assign')),
                            TextButton(onPressed: (){}, child: const Text('Resolve')),
                          ],
                        )
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
