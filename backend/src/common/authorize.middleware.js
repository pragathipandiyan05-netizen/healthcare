function authorizeRole(allowedRoles = []) {
  return (req, res, next) => {
    const userRole = req.headers['x-user-role'] || 'DOCTOR';
    const isSecurity = userRole.includes('SECURITY');
    const isAdmin = ['DEPARTMENT_HEAD', 'HOSPITAL_ADMIN', 'MEDICAL_SUPERINTENDENT', 'SUPER_ADMIN'].includes(userRole);

    if (allowedRoles.includes('ADMIN') && !isAdmin) {
      return res.status(403).json({ error: 'Access Denied: Admin authorization required' });
    }
    if (allowedRoles.includes('SECURITY') && !isSecurity && !isAdmin) {
      return res.status(403).json({ error: 'Access Denied: Security or Admin authorization required' });
    }
    next();
  };
}

module.exports = authorizeRole;
