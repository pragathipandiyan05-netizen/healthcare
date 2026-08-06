import 'package:flutter/material.dart';

class ReportsScreen extends StatefulWidget {
  const ReportsScreen({super.key});

  @override
  State<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends State<ReportsScreen> {
  static const List<String> categories = ['SOS', 'Drug Shortage', 'Blood Request', 'Equipment Failure', 'Facility Hazard', 'Maintenance', 'General Incident'];
  String _selectedCategory = 'SOS';

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
                child: FilterChip(
                  label: Text(c, style: TextStyle(color: _selectedCategory == c ? Colors.white : Colors.black)),
                  selected: _selectedCategory == c,
                  selectedColor: const Color(0xFF042e6f),
                  checkmarkColor: Colors.white,
                  onSelected: (b) {
                    setState(() { _selectedCategory = c; });
                  },
                ),
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
                    subtitle: Text('Reporter: Dr. John | Dept: ER\nType: $_selectedCategory | Date: Oct 10'),
                    trailing: const Icon(Icons.chevron_right),
                    isThreeLine: true,
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Opening report details...'))
                      );
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
