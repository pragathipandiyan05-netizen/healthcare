import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'screens/login_screen.dart';
import 'screens/dashboard_screen.dart';
import 'package:flutter/gestures.dart';
import 'screens/security/security_dashboard_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    if (!kIsWeb) {
      await Firebase.initializeApp();
    } else {
      debugPrint('Running on Web: Bypassing Firebase Initialization to prevent crashes.');
    }
  } catch (e) {
    debugPrint('Firebase initialization error: $e');
  }
  
  // Basic session check
  SharedPreferences prefs = await SharedPreferences.getInstance();
  String? role = prefs.getString('role');
  
  Widget initialScreen = const LoginScreen();
  if (role == 'SECURITY_STAFF' || role == 'SECURITY_SUPERVISOR') {
    initialScreen = const SecurityDashboardScreen();
  } else if (role == 'MEDICAL_STAFF' || role != null) {
    initialScreen = const DashboardScreen();
  }


  runApp(CareAlertApp(initialScreen: initialScreen));
}

class CareAlertApp extends StatelessWidget {
  final Widget initialScreen;
  
  const CareAlertApp({super.key, required this.initialScreen});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CARE ALERT PRO',
      scrollBehavior: const MaterialScrollBehavior().copyWith(
        dragDevices: {PointerDeviceKind.mouse, PointerDeviceKind.touch, PointerDeviceKind.stylus, PointerDeviceKind.unknown},
      ),
      theme: ThemeData(
        primarySwatch: Colors.red,
        fontFamily: 'Roboto',
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black87,
          elevation: 1,
        ),
      ),
      home: initialScreen,
      debugShowCheckedModeBanner: false,
    );
  }
}
