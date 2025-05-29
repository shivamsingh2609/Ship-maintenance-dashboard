export const roles = {
  Admin: {
    canManageUsers: true,
    canManageShips: true,
    canViewJobs: true,
    canManageJobs: true,
    canAccessDashboard: true,
    canViewOverdueMaintenance: true,
    canAccessLogs: true,
  },
  Inspector: {
    canManageUsers: false,
    canManageShips: false,
    canViewJobs: true,
    canManageJobs: false,
    canAccessDashboard: true,
    canViewOverdueMaintenance: true,
    canAccessLogs: false,
  },
  Engineer: {
    canManageUsers: false,
    canManageShips: false,
    canViewJobs: true,
    canManageJobs: true,
    canAccessDashboard: true, // Allow Engineers to access the dashboard
    canViewOverdueMaintenance: false,
    canAccessLogs: false,
  },
};

export const hasPermission = (role, permission) => {
  console.log("Checking permission for role:", role, "Permission:", permission);
  const result = roles[role]?.[permission] || false;
  console.log("Permission result:", result);
  return result;
};
