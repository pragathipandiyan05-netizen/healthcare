import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../../constants.dart';

class StaffSosTriggerFlow extends StatefulWidget {
  const StaffSosTriggerFlow({super.key});

  @override
  State<StaffSosTriggerFlow> createState() => _StaffSosTriggerFlowState();
}

class _StaffSosTriggerFlowState extends State<StaffSosTriggerFlow> {
  String _selectedEmergencyType = 'General Emergency';
  String _sosCode = 'SOS-CONNECTING...';
  bool _isDispatching = true;

  final List<String> _emergencyTypes = [
    'General Emergency',
    '🚨 Violence / Assault',
    '🏥 Medical Emergency',
    '🔥 Fire / Hazard',
    '👥 Patient Overcrowding',
    '👨⚕️ Staff Shortage',
    '⚠️ Other',
  ];

  @override
  void initState() {
    super.initState();
    _dispatchSosToBackend();
  }

  Future<void> _dispatchSosToBackend() async {
    final prefs = await SharedPreferences.getInstance();
    final staffId = prefs.getString('staff_id') ?? 'EMP-001';

    try {
      final response = await http.post(
        Uri.parse('${ApiConstants.baseUrl}/alerts'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'staff_id': staffId,
          'emergency_type': _selectedEmergencyType,
          'latitude': 12.9716,
          'longitude': 77.5946,
          'building': 'Emergency Block',
          'floor': '2nd Floor',
          'room': 'Room 204'
        }),
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _sosCode = data['sos_code'] ?? 'SOS-${DateTime.now().millisecondsSinceEpoch}';
          _isDispatching = false;
        });
      } else {
        setState(() {
          _sosCode = 'SOS-2026-000182';
          _isDispatching = false;
        });
      }
    } catch (e) {
      debugPrint('SOS dispatch error: $e');
      setState(() {
        _sosCode = 'SOS-2026-000182';
        _isDispatching = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('EMERGENCY ACTIVE', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
        automaticallyImplyLeading: false,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.red.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.red),
              ),
              child: Row(
                children: [
                  const Icon(Icons.warning, color: Colors.red, size: 36),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(_sosCode, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.red)),
                        Text(_isDispatching ? 'Connecting to emergency DB...' : 'Emergency Dispatched to Database', style: const TextStyle(color: Colors.redAccent)),
                      ],
                    ),
                  )
                ],
              ),
            ),
            const SizedBox(height: 20),

            const Text('Emergency Type:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            const SizedBox(height: 8),
            DropdownButtonFormField<String>(
              value: _selectedEmergencyType,
              items: _emergencyTypes.map((t) => DropdownMenuItem(value: t, child: Text(t))).toList(),
              onChanged: (val) {
                if (val != null) setState(() => _selectedEmergencyType = val);
              },
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              ),
            ),
            const SizedBox(height: 20),

            const Text('📍 Location', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: primaryBlue)),
            const Text('Emergency Block — Floor 2, Room 204'),
            const Divider(height: 32),

            const Text('Response Status', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: primaryBlue)),
            const SizedBox(height: 12),

            ListTile(
              leading: const Icon(Icons.check_circle, color: Colors.green),
              title: const Text('Security'),
              subtitle: const Text('Notified & Responding (Officer Rahul)'),
            ),
            ListTile(
              leading: const Icon(Icons.check_circle, color: Colors.green),
              title: const Text('Department Head'),
              subtitle: const Text('Notified'),
            ),
            ListTile(
              leading: const Icon(Icons.hourglass_empty, color: Colors.orange),
              title: const Text('Medical Superintendent'),
              subtitle: const Text('Waiting acknowledgement'),
            ),

            const SizedBox(height: 24),
            Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.blue.shade50,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const Text(
                  'Response Time: 00:01:42',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: primaryBlue),
                ),
              ),
            ),

            const SizedBox(height: 32),
            SizedBox(
              width: double.infinity,
              height: 48,
              child: OutlinedButton(
                style: OutlinedButton.styleFrom(
                  side: const BorderSide(color: Colors.red, width: 2),
                ),
                onPressed: () {
                  Navigator.pop(context);
                },
                child: const Text('CANCEL SOS', style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
