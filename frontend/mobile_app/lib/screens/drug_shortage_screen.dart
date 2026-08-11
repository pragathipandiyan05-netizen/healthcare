import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../constants.dart';

class DrugShortageScreen extends StatefulWidget {
  const DrugShortageScreen({super.key});

  @override
  State<DrugShortageScreen> createState() => _DrugShortageScreenState();
}

class _DrugShortageScreenState extends State<DrugShortageScreen> {
  String _urgency = 'High';
  bool _isSubmitting = false;

  String _selectedItem = 'Paracetamol 650mg';
  String _selectedCategory = 'Medicine';
  final TextEditingController _currentStockController = TextEditingController(text: '10 Tablets');
  final TextEditingController _requiredQtyController = TextEditingController(text: '1000 Tablets');
  final TextEditingController _notesController = TextEditingController(text: 'Urgently required in ICU');

  Future<void> _submitRequest() async {
    setState(() => _isSubmitting = true);
    try {
      final prefs = await SharedPreferences.getInstance();
      final staffId = prefs.getString('staff_id') ?? 'UNKNOWN';

      final response = await http.post(
        Uri.parse('${ApiConstants.baseUrl}/reports/drug-shortage'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'staff_id': staffId,
          'item_name': _selectedItem,
          'category': _selectedCategory,
          'current_stock': _currentStockController.text,
          'required_quantity': _requiredQtyController.text,
          'urgency': _urgency,
          'notes': _notesController.text,
        }),
      );

      if (!mounted) return;
      setState(() => _isSubmitting = false);

      if (response.statusCode == 200) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Request Submitted Successfully!'), backgroundColor: Colors.green),
        );
        Navigator.pop(context);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Submission failed (${response.statusCode})'), backgroundColor: Colors.red),
        );
      }
    } catch (e) {
      if (!mounted) return;
      setState(() => _isSubmitting = false);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Cannot connect to server. Check network.'), backgroundColor: Colors.red),
      );
    }
  }


  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Drug / Stock Shortage', style: TextStyle(color: Colors.white, fontSize: 24)),
        backgroundColor: primaryBlue,
        iconTheme: const IconThemeData(color: Colors.white),
        elevation: 0,
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _buildLabel('Item Name'),
              _buildDropdown(['Paracetamol 650mg', 'Amoxicillin 500mg', 'IV Fluids (RL)'], 'Paracetamol 650mg'),
              const SizedBox(height: 20),
              
              _buildLabel('Category'),
              _buildDropdown(['Medicine', 'Surgical', 'Consumable'], 'Medicine'),
              const SizedBox(height: 20),

              _buildLabel('Current Stock'),
              _buildTextField('10 Tablets'),
              const SizedBox(height: 20),

              _buildLabel('Required Quantity'),
              _buildTextField('1000 Tablets'),
              const SizedBox(height: 20),

              _buildLabel('Urgency'),
              Row(
                children: [
                  _buildUrgencyButton('Low', Colors.grey.shade300, Colors.black87),
                  const SizedBox(width: 12),
                  _buildUrgencyButton('Medium', Colors.grey.shade300, Colors.black87),
                  const SizedBox(width: 12),
                  _buildUrgencyButton('High', Colors.red, Colors.white),
                ],
              ),
              const SizedBox(height: 20),

              _buildLabel('Additional Notes'),
              _buildTextField('Urgently required in ICU', maxLines: 4),
              const SizedBox(height: 40),

              ElevatedButton(
                onPressed: _isSubmitting ? null : _submitRequest,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  backgroundColor: primaryBlue,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: _isSubmitting
                    ? const SizedBox(height: 24, width: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : const Text('SUBMIT REQUEST', style: TextStyle(fontSize: 22, color: Colors.white, fontWeight: FontWeight.bold)),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLabel(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Text(text, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 19, color: Colors.black54)),
    );
  }

  Widget _buildDropdown(List<String> items, String value) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey.shade300),
        borderRadius: BorderRadius.circular(12),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          value: value,
          isExpanded: true,
          icon: const Icon(Icons.keyboard_arrow_down, color: Colors.black54),
          items: items.map((i) => DropdownMenuItem(value: i, child: Text(i, style: const TextStyle(fontSize: 21)))).toList(),
          onChanged: (val) {},
        ),
      ),
    );
  }

  Widget _buildTextField(String initialValue, {int maxLines = 1}) {
    return TextFormField(
      initialValue: initialValue,
      maxLines: maxLines,
      style: const TextStyle(fontSize: 21),
      decoration: InputDecoration(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: const Color(0xFF042e6f)),
        ),
      ),
    );
  }

  Widget _buildUrgencyButton(String level, Color defaultColor, Color defaultTextColor) {
    bool isSelected = _urgency == level;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _urgency = level),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: isSelected ? (level == 'High' ? Colors.red : (level == 'Medium' ? Colors.orange : Colors.green)) : Colors.transparent,
            border: Border.all(color: isSelected ? Colors.transparent : Colors.grey.shade300),
            borderRadius: BorderRadius.circular(30),
          ),
          child: Center(
            child: Text(
              level, 
              style: TextStyle(
                color: isSelected ? Colors.white : Colors.black87, 
                fontWeight: FontWeight.w600,
                fontSize: 20
              )
            ),
          ),
        ),
      ),
    );
  }
}
