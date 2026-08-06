import 'package:flutter/material.dart';

class DrugShortageScreen extends StatefulWidget {
  const DrugShortageScreen({super.key});

  @override
  State<DrugShortageScreen> createState() => _DrugShortageScreenState();
}

class _DrugShortageScreenState extends State<DrugShortageScreen> {
  String _urgency = 'High';

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Drug / Stock Shortage', style: TextStyle(color: Colors.white, fontSize: 20)),
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
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Request Submitted!')));
                  Navigator.pop(context);
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  backgroundColor: primaryBlue,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('SUBMIT REQUEST', style: TextStyle(fontSize: 18, color: Colors.white, fontWeight: FontWeight.bold)),
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
      child: Text(text, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15, color: Colors.black54)),
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
          items: items.map((i) => DropdownMenuItem(value: i, child: Text(i, style: const TextStyle(fontSize: 17)))).toList(),
          onChanged: (val) {},
        ),
      ),
    );
  }

  Widget _buildTextField(String initialValue, {int maxLines = 1}) {
    return TextFormField(
      initialValue: initialValue,
      maxLines: maxLines,
      style: const TextStyle(fontSize: 17),
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
                fontSize: 16
              )
            ),
          ),
        ),
      ),
    );
  }
}
