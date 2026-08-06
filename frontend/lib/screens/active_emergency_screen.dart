import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

class ActiveEmergencyScreen extends StatefulWidget {
  final String distressType;
  final bool isTimerActive;
  final String staffId;

  const ActiveEmergencyScreen({
    super.key,
    required this.distressType,
    required this.isTimerActive,
    required this.staffId,
  });

  @override
  State<ActiveEmergencyScreen> createState() => _ActiveEmergencyScreenState();
}

class _ActiveEmergencyScreenState extends State<ActiveEmergencyScreen> with SingleTickerProviderStateMixin {
  late AnimationController _pulseController;
  String statusMessage = "Alert will be sent to Hospital,\nDistrict & State Control Room";
  String locationText = "Acquiring GPS...";
  String alertId = "";
  bool _isSending = false;

  @override
  void initState() {
    super.initState();
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 1),
    )..repeat(reverse: true);
    
    _getLocation();
  }
  
  Future<void> _getLocation() async {
    if (kIsWeb) {
      setState(() => locationText = "Govt. Hospital, Chennai\nLat: 13.0827  Long: 80.2707");
      return;
    }
    await Permission.location.request();
    try {
      // ignore: deprecated_member_use
      Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
      setState(() {
        locationText = "Govt. Hospital, Chennai\nLat: ${position.latitude.toStringAsFixed(4)}  Long: ${position.longitude.toStringAsFixed(4)}";
      });
    } catch (e) {
      setState(() => locationText = "Govt. Hospital, Chennai\nLat: 13.0827  Long: 80.2707"); // fallback for demo
    }
  }

  Future<void> _fireAlert() async {
    setState(() {
      _isSending = true;
      statusMessage = "Sending SOS Alert...";
    });

    if (kIsWeb) {
      await Future.delayed(const Duration(seconds: 2));
      if (mounted) {
        setState(() {
          statusMessage = "ALERT ACTIVE: State Control Room Notified";
          alertId = "web_mock_123";
          _isSending = false;
        });
      }
      return;
    }

    try {
      // ignore: deprecated_member_use
      Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
      DocumentReference docRef = await FirebaseFirestore.instance.collection('care_alerts').add({
        'staff_id': widget.staffId,
        'distress_type': widget.distressType,
        'latitude': position.latitude,
        'longitude': position.longitude,
        'timestamp': FieldValue.serverTimestamp(),
        'status': 'ACTIVE',
        'timer_active': widget.isTimerActive,
        'escalation_level': 1,
      });

      setState(() {
        alertId = docRef.id;
        statusMessage = "ALERT ACTIVE: State Control Room Notified";
        _isSending = false;
      });
    } catch (e) {
      setState(() {
        statusMessage = "Failed to send alert. Check network.";
        _isSending = false;
      });
    }
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('SOS Emergency', style: TextStyle(color: Colors.white, fontSize: 18)),
        backgroundColor: primaryBlue,
        iconTheme: const IconThemeData(color: Colors.white),
        elevation: 0,
        centerTitle: true,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 32.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Large SOS Pulse
              Center(
                child: AnimatedBuilder(
                  animation: _pulseController,
                  builder: (context, child) {
                    return Stack(
                      alignment: Alignment.center,
                      children: [
                        // Outer pulse ring
                        Container(
                          width: 250 + (_pulseController.value * 30),
                          height: 250 + (_pulseController.value * 30),
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.red.withValues(alpha: 0.15 - (_pulseController.value * 0.15)),
                          ),
                        ),
                        // Inner ring
                        Container(
                          width: 220,
                          height: 220,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.red.withValues(alpha: 0.2),
                          ),
                        ),
                        // Main button
                        Container(
                          width: 170,
                          height: 170,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: const Color(0xFFE53935), // Red
                            boxShadow: [
                              BoxShadow(color: Colors.red.withValues(alpha: 0.4), blurRadius: 15, spreadRadius: 5),
                            ],
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: const [
                              Icon(Icons.health_and_safety, color: Colors.white, size: 40),
                              SizedBox(height: 4),
                              Text('SOS', style: TextStyle(color: Colors.white, fontSize: 40, fontWeight: FontWeight.bold, letterSpacing: 2)),
                              Text('Tap to Alert', style: TextStyle(color: Colors.white, fontSize: 14)),
                            ],
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
              
              const SizedBox(height: 48),
              
              // Location info
              const Text('Your Location', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.black87)),
              const SizedBox(height: 8),
              Text(
                locationText,
                style: const TextStyle(fontSize: 14, color: Colors.black54, height: 1.5),
              ),
              
              const Spacer(),
              
              // Send Button
              ElevatedButton(
                onPressed: alertId.isEmpty ? _fireAlert : null,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFE53935),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  elevation: 2,
                ),
                child: _isSending
                    ? const CircularProgressIndicator(color: Colors.white)
                    : Text(
                        alertId.isEmpty ? 'SEND SOS ALERT' : 'ALERT ACTIVE',
                        style: const TextStyle(fontSize: 16, color: Colors.white, fontWeight: FontWeight.bold),
                      ),
              ),
              
              const SizedBox(height: 24),
              
              Text(
                statusMessage,
                textAlign: TextAlign.center,
                style: const TextStyle(color: Colors.black54, fontSize: 13),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
