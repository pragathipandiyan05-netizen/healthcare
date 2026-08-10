import 'package:flutter/material.dart';

class AnalyticsScreen extends StatelessWidget {
  const AnalyticsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Executive Analytics'),
        actions: [
          IconButton(icon: const Icon(Icons.picture_as_pdf), onPressed: (){}),
          IconButton(icon: const Icon(Icons.table_chart), onPressed: (){}),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Expanded(child: _buildKPICard('Alerts Today', '142', Colors.red)),
                  Expanded(child: _buildKPICard('Avg Response', '12m', Colors.orange)),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                children: [
                  Expanded(child: _buildKPICard('Resolution Rate', '94%', Colors.green)),
                  Expanded(child: _buildKPICard('Staff Efficiency', '88%', Colors.blue)),
                ],
              ),
            ),
            _buildMockChartCard('Alerts by District (Bar Chart)'),
            _buildMockChartCard('Monthly Incident Trend (Line Chart)'),
            _buildMockChartCard('Emergency Distribution Heatmap'),
            _buildMockChartCard('Hospital Performance Comparison'),
          ],
        ),
      ),
    );
  }

  Widget _buildKPICard(String title, String value, Color color) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(value, style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: color)),
            Text(title, textAlign: TextAlign.center, style: const TextStyle(fontSize: 18)),
          ],
        ),
      ),
    );
  }

  Widget _buildMockChartCard(String title) {
    return Card(
      margin: const EdgeInsets.all(16),
      child: Container(
        height: 200,
        width: double.infinity,
        color: Colors.grey.shade100,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.insert_chart, size: 50, color: Colors.grey),
              const SizedBox(height: 8),
              Text(title, style: const TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
            ],
          ),
        ),
      ),
    );
  }
}
