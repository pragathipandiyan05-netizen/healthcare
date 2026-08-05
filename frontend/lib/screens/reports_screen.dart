import 'package:flutter/material.dart';

class ReportsScreen extends StatelessWidget {
  final List<String> categories = ['SOS', 'Drug Shortage', 'Blood Request', 'Equipment Failure', 'Facility Hazard', 'Maintenance', 'General Incident'];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Staff Reports')),
      body: Column(
        children: [
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.all(8),
            child: Row(
              children: categories.map((c) => Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: FilterChip(label: Text(c), onSelected: (b){}),
              )).toList(),
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: 8,
              itemBuilder: (context, index) {
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  child: ListTile(
                    title: Text('Report #REP-${2000 + index}', style: const TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: const Text('Reporter: Dr. John | Dept: ER\nType: Drug Shortage | Date: Oct 10'),
                    trailing: const Icon(Icons.chevron_right),
                    isThreeLine: true,
                    onTap: () {
                      // Open detail report
                    },
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
