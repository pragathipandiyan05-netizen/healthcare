import 'package:flutter/material.dart';

class InventoryScreen extends StatelessWidget {
  final List<String> categories = const ['Medicines', 'Consumables', 'PPE Kits', 'Oxygen Cylinders', 'IV Fluids', 'Surgical Supplies'];

  const InventoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Inventory Dashboard')),
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
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(child: _buildKPICard('Available Stock', '1.2M', Colors.green)),
                Expanded(child: _buildKPICard('Low Stock', '45', Colors.orange)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(child: _buildKPICard('Out of Stock', '12', Colors.red)),
                Expanded(child: _buildKPICard('Expiring Soon', '89', Colors.purple)),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: 10,
              itemBuilder: (context, index) {
                return Card(
                  margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Paracetamol 500mg', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                        const Text('Category: Medicines | Hospital: GH Chennai'),
                        const Text('Qty: 5000 | Min Threshold: 1000'),
                        const Text('Expiry: Dec 2026'),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.end,
                          children: [
                            TextButton(onPressed: (){}, child: const Text('Update')),
                            TextButton(onPressed: (){}, child: const Text('Transfer')),
                            TextButton(onPressed: (){}, child: const Text('Purchase Req')),
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

  Widget _buildKPICard(String title, String value, Color color) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(value, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: color)),
            Text(title, textAlign: TextAlign.center, style: const TextStyle(fontSize: 12)),
          ],
        ),
      ),
    );
  }
}
