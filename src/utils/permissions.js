import AppSecureStorage from "../services/secureStorage";

const storage = new AppSecureStorage();
const permissions = JSON.parse(storage.get("permissions"));

const checkPermission = (module, action) =>
  permissions?.[module]?.includes(action);

// Chat permissions
export const isChatGet = checkPermission("Chat", "Get");

// Integration permissions
export const isIntegrationGet = checkPermission("Integration", "Get");
export const isIntegrationAdd = checkPermission("Integration", "Add");
export const isIntegrationEdit = checkPermission("Integration", "Edit");
export const isIntegrationDelete = checkPermission("Integration", "Delete");

// User Role permissions
export const isUserRoleGet = checkPermission("User Role", "Get");
export const isUserRoleAdd = checkPermission("User Role", "Add");
export const isUserRoleEdit = checkPermission("User Role", "Edit");
export const isUserRoleDelete = checkPermission("User Role", "Delete");

// User Management permissions
export const isUserManagementGet = checkPermission("User Management", "Get");
export const isUserManagementAdd = checkPermission("User Management", "Add");
export const isUserManagementEdit = checkPermission("User Management", "Edit");
export const isUserManagementDelete = checkPermission("User Management", "Delete");

// Profile permissions
export const isProfileGet = checkPermission("Profile", "Get");
export const isProfileEdit = checkPermission("Profile", "Edit");

// Analytics permissions
export const isAnalyticsGet = checkPermission("Analytics", "Get");

// Train and Content permissions
export const isTrainAndContentGet = checkPermission("TrainContent", "Get");
export const isTrainAndContentAdd = checkPermission("TrainContent", "Add");
export const isTrainAndContentEdit = checkPermission("TrainContent", "Edit");
export const isTrainAndContentDelete = checkPermission("TrainContent", "Delete");
export const isTrainAndContentNotification = checkPermission("TrainContent", "Notification");

// Custom Actions permissions
export const isCustomActionsGet = checkPermission("Custom Actions", "Get");
export const isCustomActionsAdd = checkPermission("Custom Actions", "Add");

// Organizational App permissions
export const isOrganizationalAppGet = checkPermission("Organizational App", "Get");
export const isOrganizationalAppAdd = checkPermission("Organizational App", "Add");

// Organization App permissions
export const isOrganizationGet = checkPermission("Organization", "Get");
export const isOrganizationAdd = checkPermission("Organization", "Add");
export const isOrganizationEdit = checkPermission("Organization", "Edit");
export const isOrganizationDelete = checkPermission("Organization", "Delete");


