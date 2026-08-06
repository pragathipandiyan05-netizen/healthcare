import 'package:flutter/material.dart';

class FacilityHazardScreen extends StatefulWidget {
  const FacilityHazardScreen({super.key});

  @override
  State<FacilityHazardScreen> createState() => _FacilityHazardScreenState();
}

class _FacilityHazardScreenState extends State<FacilityHazardScreen> {
  final _formKey = GlobalKey<FormState>();
  
  String? _selectedCategory;
  final TextEditingController _buildingController = TextEditingController();
  final TextEditingController _blockController = TextEditingController();
  final TextEditingController _floorController = TextEditingController();
  final TextEditingController _roomController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  String _peopleAtRisk = 'None';
  bool _immediateDanger = false;
  String? _affectedService;
  final TextEditingController _affectedCountController = TextEditingController();
  String _immediateAction = 'No action taken';
  String _priority = 'Normal';

  final List<String> _categories = [
    'Fire/Smoke', 'Electrical', 'Water/Plumbing', 'Lift/Elevator', 
    'Medical Oxygen', 'Structural Damage', 'Fire Safety Equipment', 
    'Access/Exit', 'Infection Control/Sanitation', 'HVAC/Temperature', 
    'Biomedical Waste', 'Other'
  ];

  final List<String> _affectedServicesList = [
    'ICU', 'Emergency', 'OT', 'Laboratory', 'Ward', 'Pharmacy', 'Entire Building', 'Other'
  ];

  final List<String> _actionsTaken = [
    'Area evacuated', 'Equipment isolated', 'Power isolated', 
    'Oxygen supply isolated', 'Warning signage placed', 'No action taken'
  ];

  void _submitForm() {
    if (_formKey.currentState!.validate()) {
      // Simulate submission
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Facility Hazard Reported Successfully'), backgroundColor: Colors.green),
      );
      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    
    return Scaffold(
      backgroundColor: Colors.grey.shade50,
      appBar: AppBar(
        title: const Text('Report Facility Hazard'),
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
              _buildSectionTitle('Hazard Details'),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(labelText: 'Hazard Category', border: OutlineInputBorder()),
                initialValue: _selectedCategory,
                items: _categories.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                onChanged: (val) => setState(() => _selectedCategory = val),
                validator: (val) => val == null ? 'Please select a category' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _descriptionController,
                maxLines: 3,
                decoration: const InputDecoration(labelText: 'Hazard Description', border: OutlineInputBorder(), alignLabelWithHint: true),
                validator: (val) => val!.isEmpty ? 'Required field' : null,
              ),
              
              const SizedBox(height: 24),
              _buildSectionTitle('Exact Location'),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _buildingController,
                      decoration: const InputDecoration(labelText: 'Building', border: OutlineInputBorder()),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: TextFormField(
                      controller: _blockController,
                      decoration: const InputDecoration(labelText: 'Block', border: OutlineInputBorder()),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: TextFormField(
                      controller: _floorController,
                      decoration: const InputDecoration(labelText: 'Floor', border: OutlineInputBorder()),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: TextFormField(
                      controller: _roomController,
                      decoration: const InputDecoration(labelText: 'Room/Ward', border: OutlineInputBorder()),
                      validator: (val) => val!.isEmpty ? 'Required field' : null,
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 24),
              _buildSectionTitle('Impact Assessment'),
              const SizedBox(height: 12),
              
              const Text('People currently at risk', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: ['Patients', 'Healthcare Workers', 'Visitors', 'None'].map((risk) {
                  return ChoiceChip(
                    label: Text(risk),
                    selected: _peopleAtRisk == risk,
                    onSelected: (selected) {
                      if (selected) setState(() => _peopleAtRisk = risk);
                    },
                    selectedColor: primaryBlue.withValues(alpha: 0.2),
                  );
                }).toList(),
              ),
              
              const SizedBox(height: 16),
              SwitchListTile(
                title: const Text('Immediate Danger?', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.red)),
                value: _immediateDanger,
                onChanged: (val) => setState(() => _immediateDanger = val),
                activeThumbColor: Colors.red,
                contentPadding: EdgeInsets.zero,
              ),

              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(labelText: 'Affected Services', border: OutlineInputBorder()),
                initialValue: _affectedService,
                items: _affectedServicesList.map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
                onChanged: (val) => setState(() => _affectedService = val),
                validator: (val) => val == null ? 'Please select affected service' : null,
              ),
              const SizedBox(height: 12),
              TextFormField(
                controller: _affectedCountController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(labelText: 'Estimated number of people affected', border: OutlineInputBorder()),
              ),
              
              const SizedBox(height: 24),
              _buildSectionTitle('Evidence & Actions'),
              const SizedBox(height: 12),
              OutlinedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.camera_alt),
                label: const Text('Attach Photo/Video Evidence'),
                style: OutlinedButton.styleFrom(padding: const EdgeInsets.symmetric(vertical: 16)),
              ),
              
              const SizedBox(height: 16),
              const Text('Immediate action already taken', style: TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: _actionsTaken.map((action) {
                  return ChoiceChip(
                    label: Text(action),
                    selected: _immediateAction == action,
                    onSelected: (selected) {
                      if (selected) setState(() => _immediateAction = action);
                    },
                    selectedColor: primaryBlue.withValues(alpha: 0.2),
                  );
                }).toList(),
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
                child: const Text('Submit Facility Hazard', style: TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.bold)),
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
      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF042e6f)),
    );
  }
}
