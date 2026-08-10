import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class WorkersListScreen extends StatefulWidget {
  const WorkersListScreen({super.key});

  @override
  State<WorkersListScreen> createState() => _WorkersListScreenState();
}

class _WorkersListScreenState extends State<WorkersListScreen> {
  List<dynamic> _workers = [];
  bool _isLoading = true;
  String _errorMessage = '';

  @override
  void initState() {
    super.initState();
    _fetchWorkers();
  }

  Future<void> _fetchWorkers() async {
    try {
      final response = await http.get(Uri.parse('http://192.168.0.115:3000/api/v1/users/workers'));
      if (response.statusCode == 200) {
        setState(() {
          _workers = json.decode(response.body);
          _isLoading = false;
        });
      } else {
        setState(() {
          _errorMessage = 'Failed to load workers: ${response.statusCode}';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Error: $e';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Total Workers'),
        backgroundColor: Colors.blueGrey.shade800,
        foregroundColor: Colors.white,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _errorMessage.isNotEmpty
              ? Center(child: Text(_errorMessage, style: const TextStyle(color: Colors.red)))
              : _workers.isEmpty
                  ? const Center(child: Text('No workers found.', style: TextStyle(fontSize: 18)))
                  : ListView.builder(
                      padding: const EdgeInsets.all(8),
                      itemCount: _workers.length,
                      itemBuilder: (context, index) {
                        final worker = _workers[index];
                        final isOnline = worker['status'] == 'ACTIVE';
                        final hospitalName = worker['hospital'] != null ? worker['hospital']['name'] : 'Unassigned';

                        return Card(
                          elevation: 2,
                          margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 4),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          child: ListTile(
                            leading: CircleAvatar(
                              backgroundColor: isOnline ? Colors.green.shade100 : Colors.grey.shade200,
                              child: Icon(Icons.person, color: isOnline ? Colors.green.shade800 : Colors.grey.shade600),
                            ),
                            title: Text(
                              worker['name'] ?? 'Unknown',
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const SizedBox(height: 4),
                                Text(worker['email'] ?? ''),
                                Text('Employee ID: ${worker['employee_id']}', style: TextStyle(color: Colors.blueGrey.shade600)),
                                Text('Hospital: $hospitalName', style: TextStyle(color: Colors.blueGrey.shade600)),
                              ],
                            ),
                            trailing: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: isOnline ? Colors.green.shade50 : Colors.grey.shade200,
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(color: isOnline ? Colors.green.shade200 : Colors.grey.shade400),
                              ),
                              child: Text(
                                worker['status'] ?? 'UNKNOWN',
                                style: TextStyle(
                                  color: isOnline ? Colors.green.shade700 : Colors.grey.shade700,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
    );
  }
}
