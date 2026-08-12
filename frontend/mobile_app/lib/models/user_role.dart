enum UserRole {
  // Staff Roles
  doctor,
  nurse,
  intern,
  otherStaff,

  // Security Roles
  securityStaff,
  securitySupervisor,

  // Admin Roles
  departmentHead,
  hospitalAdmin,
  medicalSuperintendent,
  superAdmin,
}

extension UserRoleExtension on UserRole {
  String get rawValue {
    switch (this) {
      case UserRole.doctor:
        return 'DOCTOR';
      case UserRole.nurse:
        return 'NURSE';
      case UserRole.intern:
        return 'INTERN';
      case UserRole.otherStaff:
        return 'OTHER_STAFF';
      case UserRole.securityStaff:
        return 'SECURITY_STAFF';
      case UserRole.securitySupervisor:
        return 'SECURITY_SUPERVISOR';
      case UserRole.departmentHead:
        return 'DEPARTMENT_HEAD';
      case UserRole.hospitalAdmin:
        return 'HOSPITAL_ADMIN';
      case UserRole.medicalSuperintendent:
        return 'MEDICAL_SUPERINTENDENT';
      case UserRole.superAdmin:
        return 'SUPER_ADMIN';
    }
  }

  String get displayName {
    switch (this) {
      case UserRole.doctor:
        return 'Doctor';
      case UserRole.nurse:
        return 'Nurse';
      case UserRole.intern:
        return 'Intern';
      case UserRole.otherStaff:
        return 'Healthcare Staff';
      case UserRole.securityStaff:
        return 'Security Staff';
      case UserRole.securitySupervisor:
        return 'Security Supervisor';
      case UserRole.departmentHead:
        return 'Department Head';
      case UserRole.hospitalAdmin:
        return 'Hospital Admin';
      case UserRole.medicalSuperintendent:
        return 'Medical Superintendent';
      case UserRole.superAdmin:
        return 'Super Admin';
    }
  }

  bool get isStaff =>
      this == UserRole.doctor ||
      this == UserRole.nurse ||
      this == UserRole.intern ||
      this == UserRole.otherStaff;

  bool get isSecurity =>
      this == UserRole.securityStaff || this == UserRole.securitySupervisor;

  bool get isAdmin =>
      this == UserRole.departmentHead ||
      this == UserRole.hospitalAdmin ||
      this == UserRole.medicalSuperintendent ||
      this == UserRole.superAdmin;

  static UserRole fromString(String? role) {
    if (role == null) return UserRole.doctor;
    final cleanRole = role.toUpperCase().trim();
    switch (cleanRole) {
      case 'DOCTOR':
        return UserRole.doctor;
      case 'NURSE':
        return UserRole.nurse;
      case 'INTERN':
        return UserRole.intern;
      case 'SECURITY_STAFF':
        return UserRole.securityStaff;
      case 'SECURITY_SUPERVISOR':
        return UserRole.securitySupervisor;
      case 'DEPARTMENT_HEAD':
      case 'HOD':
        return UserRole.departmentHead;
      case 'HOSPITAL_ADMIN':
      case 'ADMIN':
        return UserRole.hospitalAdmin;
      case 'MEDICAL_SUPERINTENDENT':
        return UserRole.medicalSuperintendent;
      case 'SUPER_ADMIN':
        return UserRole.superAdmin;
      default:
        if (cleanRole.contains('SECURITY')) return UserRole.securityStaff;
        if (cleanRole.contains('ADMIN') || cleanRole.contains('SUPER')) return UserRole.hospitalAdmin;
        return UserRole.doctor;
    }
  }
}
