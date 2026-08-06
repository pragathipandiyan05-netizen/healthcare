import 'package:flutter/material.dart';

class HospitalsScreen extends StatelessWidget {
  const HospitalsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Hospitals Dashboard')),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(child: _buildKPICard('Total Hospitals', '150', Colors.blue)),
                Expanded(child: _buildKPICard('Active', '142', Colors.green)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(child: _buildKPICard('Offline', '8', Colors.grey)),
                Expanded(child: _buildKPICard('Emergency Cases', '24', Colors.red)),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: 10,
              itemBuilder: (context, index) {
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  child: ListTile(
                    title: const Text('Govt General Hospital', style: TextStyle(fontWeight: FontWeight.bold)),
                    subtitle: const Text('District: Chennai | Type: General\nBeds: 500 | Staff: 120\nActive Alerts: 3'),
                    trailing: const Chip(label: Text('Online'), backgroundColor: Colors.green),
                    isThreeLine: true,
                    onTap: () {
                      // Open hospital profile
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

  Widget _buildKPICard(String title, String value, Color color) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(value, style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: color)),
            Text(title, textAlign: TextAlign.center, style: const TextStyle(fontSize: 14)),
          ],
        ),
      ),
    );
  }
}
