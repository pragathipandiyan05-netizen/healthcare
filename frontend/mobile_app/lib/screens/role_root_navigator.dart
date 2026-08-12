import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_role.dart';
import 'staff/staff_main_shell.dart';
import 'security/security_dashboard_screen.dart';
import 'admin/admin_main_shell.dart';
import 'login_screen.dart';

class RoleRootNavigator extends StatefulWidget {
  const RoleRootNavigator({super.key});

  @override
  State<RoleRootNavigator> createState() => _RoleRootNavigatorState();
}

class _RoleRootNavigatorState extends State<RoleRootNavigator> {
  UserRole _userRole = UserRole.doctor;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _checkRole();
  }

  Future<void> _checkRole() async {
    final prefs = await SharedPreferences.getInstance();
    final roleStr = prefs.getString('role');
    setState(() {
      _userRole = UserRoleExtension.fromString(roleStr);
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_userRole.isSecurity) {
      return const SecurityDashboardScreen();
    } else if (_userRole.isAdmin) {
      return AdminMainShell(userRole: _userRole);
    } else {
      return StaffMainShell(userRole: _userRole);
    }
  }
}
