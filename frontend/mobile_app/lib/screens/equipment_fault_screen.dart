import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../constants.dart';

class EquipmentFaultScreen extends StatefulWidget {
  const EquipmentFaultScreen({super.key});

  @override
  State<EquipmentFaultScreen> createState() => _EquipmentFaultScreenState();
}

class _EquipmentFaultScreenState extends State<EquipmentFaultScreen> {
  final _formKey = GlobalKey<FormState>();
  
  String? _selectedCategory;
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _assetIdController = TextEditingController();
  final TextEditingController _hospitalController = TextEditingController(text: 'Government Hospital, Chennai - Emergency Ward'); // Auto-populated
  final TextEditingController _wardController = TextEditingController();
  String? _selectedFaultType;
  String _safetyImpact = 'No immediate impact';
  final TextEditingController _descriptionController = TextEditingController();
  bool _isInUse = false;
  String _priority = 'Normal';

  final List<String> _categories = [
    'Ventilator', 'Patient Monitor', 'ECG', 'Infusion Pump', 'Defibrillator', 
    'Oxygen Equipment', 'Anaesthesia Machine', 'Imaging', 'Laboratory', 'Other'
  ];

  final List<String> _faultTypes = [
    'Power failure', 'Error/Alarm', 'Calibration', 'Physical Damage', 
    'Electrical', 'Performance Failure', 'Infection-Control Concern', 'Other'
  ];

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isInUse = _isInUse); // trigger rebuild
      final prefs = await SharedPreferences.getInstance();
      final staffId = prefs.getString('staff_id') ?? 'UNKNOWN';

      try {
        final response = await http.post(
          Uri.parse('${ApiConstants.baseUrl}/reports/equipment-fault'),
          headers: {'Content-Type': 'application/json'},
          body: json.encode({
            'staff_id': staffId,
            'category': _selectedCategory,
            'equipment_name': _nameController.text,
            'asset_id': _assetIdController.text,
            'location': _hospitalController.text,
            'ward': _wardController.text,
            'fault_type': _selectedFaultType,
            'safety_impact': _safetyImpact,
            'description': _descriptionController.text,
            'is_in_use': _isInUse,
            'priority': _priority,
          }),
        );

        if (!mounted) return;

        if (response.statusCode == 200) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Equipment Fault Reported Successfully'), backgroundColor: Colors.green),
          );
          Navigator.pop(context);
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Submission failed (${response.statusCode})'), backgroundColor: Colors.red),
          );
        }
      } catch (e) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Cannot connect to server. Check network.'), backgroundColor: Colors.red),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        title: const Text('Report Equipment Fault'),
        backgroundColor: Colors.white,
        foregroundColor: primaryBlue,
        elevation: 1,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _buildSectionTitle('Equipment Details'),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(labelText: 'Equipment Category', border: OutlineInputBorder()),
                initialValue: _selectedCategory,
                items: _categories.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                onChanged: (val) => setState(() => _selectedCategory = val),
                validator: (val) => val == null ? 'Please select a category' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Equipment Name', border: OutlineInputBorder()),
                validator: (val) => val!.isEmpty ? 'Required field' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _assetIdController,
                decoration: const InputDecoration(labelText: 'Asset ID / Equipment ID', border: OutlineInputBorder()),
                validator: (val) => val!.isEmpty ? 'Required field' : null,
              ),
              
              const SizedBox(height: 24),
              _buildSectionTitle('Location'),
              const SizedBox(height: 12),
              TextFormField(
                controller: _hospitalController,
                decoration: const InputDecoration(labelText: 'Hospital & Department', border: OutlineInputBorder()),
                enabled: false, // Auto-populated
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _wardController,
                decoration: const InputDecoration(labelText: 'Ward / Exact Location', border: OutlineInputBorder()),
                validator: (val) => val!.isEmpty ? 'Required field' : null,
              ),

              const SizedBox(height: 24),
              _buildSectionTitle('Fault Information'),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(labelText: 'Fault Type', border: OutlineInputBorder()),
                initialValue: _selectedFaultType,
                items: _faultTypes.map((t) => DropdownMenuItem(value: t, child: Text(t))).toList(),
                onChanged: (val) => setState(() => _selectedFaultType = val),
                validator: (val) => val == null ? 'Please select a fault type' : null,
              ),
              const SizedBox(height: 16),
              
              const Text('Patient Safety Impact', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: ['No immediate impact', 'Service affected', 'Patient safety at risk'].map((impact) {
                  return ChoiceChip(
                    label: Text(impact),
                    selected: _safetyImpact == impact,
                    onSelected: (selected) {
                      if (selected) setState(() => _safetyImpact = impact);
                    },
                    selectedColor: primaryBlue.withValues(alpha: 0.2),
                  );
                }).toList(),
              ),
              
              const SizedBox(height: 16),
              TextFormField(
                controller: _descriptionController,
                maxLines: 3,
                decoration: const InputDecoration(labelText: 'Detailed Fault Description', border: OutlineInputBorder(), alignLabelWithHint: true),
                validator: (val) => val!.isEmpty ? 'Required field' : null,
              ),
              
              const SizedBox(height: 16),
              SwitchListTile(
                title: const Text('Is equipment currently in use?'),
                value: _isInUse,
                onChanged: (val) => setState(() => _isInUse = val),
                activeThumbColor: primaryBlue,
                contentPadding: EdgeInsets.zero,
              ),

              const SizedBox(height: 16),
              OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.camera_alt),
                label: const Text('Attach Photo/Video'),
                style: OutlinedButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 16)),
              ),

              const SizedBox(height: 24),
              _buildSectionTitle('Priority'),
              const SizedBox(height: 12),
              SegmentedButton<String>(
                segments: const [
                  ButtonSegment(value: 'Normal', label: Text('Normal')),
                  ButtonSegment(value: 'High', label: Text('High')),
                  ButtonSegment(value: 'Critical', label: Text('Critical')),
                ],
                selected: {_priority},
                onSelectionChanged: (Set<String> newSelection) {
                  setState(() => _priority = newSelection.first);
                },
                style: ButtonStyle(
                  backgroundColor: WidgetStateProperty.resolveWith<Color>((states) {
                    if (states.contains(WidgetState.selected)) {
                      return _priority == 'Critical' ? Colors.red.shade100 : (_priority == 'High' ? Colors.orange.shade100 : primaryBlue.withValues(alpha: 0.2));
                    }
                    return Colors.transparent;
                  }),
                ),
              ),

              const SizedBox(height: 32),
              ElevatedButton(
                onPressed: _submitForm,
                style: ElevatedButton.styleFrom(
                  backgroundColor: primaryBlue,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('Submit Equipment Fault', style: TextStyle(fontSize: 22, color: Colors.white, fontWeight: FontWeight.bold)),
              ),
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF042e6f)),
    );
  }
}
