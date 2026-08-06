import 'package:flutter/material.dart';

class BloodBankScreen extends StatelessWidget {
  final List<String> bloodGroups = const ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  final List<String> components = const ['Whole Blood', 'PRBC', 'Platelets', 'Plasma'];

  const BloodBankScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Blood Bank Dashboard')),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Padding(padding: EdgeInsets.all(16), child: Text('Available Blood Units', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold))),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              padding: const EdgeInsets.symmetric(horizontal: 16),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 4,
                childAspectRatio: 1,
                crossAxisSpacing: 8,
                mainAxisSpacing: 8,
              ),
              itemCount: bloodGroups.length,
              itemBuilder: (context, index) {
                return Card(
                  color: Colors.red.shade100,
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(bloodGroups[index], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 20, color: Colors.red)),
                        const Text('12 U', style: TextStyle(color: Colors.red)),
                      ],
                    ),
                  ),
                );
              },
            ),
            const Padding(padding: EdgeInsets.all(16), child: Text('Blood Components', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold))),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 8),
              child: Row(
                children: components.map((c) => Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Text(c, style: const TextStyle(fontWeight: FontWeight.bold)),
                  ),
                )).toList(),
              ),
            ),
            const Padding(padding: EdgeInsets.all(16), child: Text('Pending Requests', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold))),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: 3,
              itemBuilder: (context, index) {
                return const Card(
                  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  child: ListTile(
                    title: Text('O+ Blood Required', style: TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: Text('Hospital: GH Chennai | Priority: Urgent\nUnits: 2'),
                    trailing: Chip(label: Text('Pending')),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
