import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dashboard_screen.dart';
import 'security/security_dashboard_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _staffIdController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool isEnglish = true;
  bool _obscurePassword = true;

  void _login() async {
    final email = _staffIdController.text.trim().toLowerCase();
    final password = _passwordController.text;

    if (email == 'staff@gmail.com' && password == 'password') {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('staff_id', email.isNotEmpty ? email : 'STAFF-1234');
      await prefs.setString('role', 'Staff (Doctor/Nurse)');

      if (!mounted) return;
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const DashboardScreen()),
      );
    } else if (email == 'security@gmail.com' && password == 'password') {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('staff_id', email);
      await prefs.setString('role', 'SECURITY_STAFF');

      if (!mounted) return;
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const SecurityDashboardScreen()),
      );
    } else if (email == 'supervisor@gmail.com' && password == 'password') {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('staff_id', email);
      await prefs.setString('role', 'SECURITY_SUPERVISOR');

      if (!mounted) return;
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const SecurityDashboardScreen()),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Invalid credentials. Try staff@, security@, or supervisor@ with password'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF042e6f);
    final bool isKeyboardOpen = MediaQuery.of(context).viewInsets.bottom > 0;

    final String titleText = isEnglish ? 'CARE ALERT' : 'கேர் அலர்ட்';
    final String subtitleText = isEnglish ? 'STATEWIDE PLATFORM' : 'மாநில அளவிலான தளம்';
    final String emailLabel = isEnglish ? 'Email / Staff ID' : 'மின்னஞ்சல் / பணியாளர் ஐடி';
    final String passwordLabel = isEnglish ? 'Password' : 'கடவுச்சொல்';
    final String forgotPasswordText = isEnglish ? 'Forgot Password?' : 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?';
    final String loginButtonText = isEnglish ? 'LOGIN' : 'உள்நுழைய';
    final String noAccountText = isEnglish ? "Don't have an account? " : "கணக்கு இல்லையா? ";
    final String registerText = isEnglish ? 'Register' : 'பதிவு செய்';

    return Scaffold(
      backgroundColor: primaryBlue,
      body: SafeArea(
        child: Column(
          children: [
            // Blue Header (Collapses when keyboard opens to remain stable and avoid panning)
            AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeInOut,
              width: double.infinity,
              padding: EdgeInsets.only(
                top: isKeyboardOpen ? 8 : 16,
                bottom: isKeyboardOpen ? 8 : 24,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (!isKeyboardOpen) ...[
                    // Custom Logo
                    Image.asset(
                      'assets/logo.png',
                      height: 80,
                      errorBuilder: (context, error, stackTrace) => const Icon(Icons.broken_image, size: 80, color: Colors.white),
                    ),
                    const SizedBox(height: 12),
                  ],
                  Text(
                    titleText,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                      letterSpacing: 1.5,
                    ),
                  ),
                  Text(
                    subtitleText,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.white70,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 2,
                    ),
                  ),
                  SizedBox(height: isKeyboardOpen ? 12 : 24),
                  // Language Toggle
                  Container(
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.white30),
                      borderRadius: BorderRadius.circular(30),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        GestureDetector(
                          onTap: () => setState(() => isEnglish = false),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                            decoration: BoxDecoration(
                              color: !isEnglish ? Colors.white.withValues(alpha: 0.2) : Colors.transparent,
                              borderRadius: BorderRadius.circular(30),
                            ),
                            child: const Text(
                              'தமிழ்',
                              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                        GestureDetector(
                          onTap: () => setState(() => isEnglish = true),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
                            decoration: BoxDecoration(
                              color: isEnglish ? Colors.white.withValues(alpha: 0.2) : Colors.transparent,
                              borderRadius: BorderRadius.circular(30),
                            ),
                            child: const Text(
                              'English',
                              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            // Bottom White Sheet (Scrolls if needed)
            Expanded(
              child: Container(
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
                ),
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(24.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const SizedBox(height: 8),
                      TextField(
                        controller: _staffIdController,
                        decoration: InputDecoration(
                          labelText: emailLabel,
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide(color: Colors.grey.shade300),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide(color: Colors.grey.shade300),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      TextField(
                        controller: _passwordController,
                        obscureText: _obscurePassword,
                        decoration: InputDecoration(
                          labelText: passwordLabel,
                          suffixIcon: GestureDetector(
                            onTap: () {
                              setState(() {
                                _obscurePassword = !_obscurePassword;
                              });
                            },
                            child: Container(
                              color: Colors.transparent, // Ensures the tap area covers the icon cleanly
                              child: Icon(
                                _obscurePassword ? Icons.visibility_off : Icons.visibility,
                                color: Colors.grey,
                              ),
                            ),
                          ),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide(color: Colors.grey.shade300),
                          ),
                          enabledBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(12),
                            borderSide: BorderSide(color: Colors.grey.shade300),
                          ),
                        ),
                      ),
                      const SizedBox(height: 4),
                      Align(
                        alignment: Alignment.centerLeft,
                        child: TextButton(
                          onPressed: () {},
                          child: Text(forgotPasswordText, style: const TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
                        ),
                      ),
                      const SizedBox(height: 8),
                      ElevatedButton(
                        onPressed: _login,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          backgroundColor: primaryBlue,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                        ),
                        child: Text(
                          loginButtonText,
                          style: const TextStyle(fontSize: 22, color: Colors.white, fontWeight: FontWeight.bold),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(noAccountText, style: const TextStyle(color: Colors.black54)),
                          Text(registerText, style: const TextStyle(color: primaryBlue, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      const SizedBox(height: 8),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
