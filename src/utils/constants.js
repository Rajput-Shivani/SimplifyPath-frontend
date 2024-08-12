const PAGE_ROUTES = {
  HOME: "/",
  CHAT: "/chat",
  INTEGRATION: "/integration",
  PROFILE: "/profile",
  LOGIN: "/login",
  USER_ROLES: "/user-roles",
  CONTENT: "/content",
  CUSTOM: "/custom",
  USER_MANAGEMENT: "/user-management",
  ORGANIZATION: "/organization",
  ANALYTICS:"/analytics"
};
const API_ROUTES = {
  BASE_URL: process.env.REACT_APP_BACKEND_API_URL,
  AUTHENTICATION: {
    LOGIN_AUTH: "auth/google/login",
    LOGOUT_AUTH: "auth/google/logout",
  },
  ADMIN: {
    ADMINS: "admins",
  },
  PROFILE: {
    GET_PROFILE_DETAILS: "/profile",
    UPDATE_PROFILE_DETAILS: "/profile/",
    CREATE_DOCUMENTS: "/admin/train/content/:type",
  },
  CHAT: {
    GET_CHAT_DATA: `/chat?startDate=2023-10-15&endDate=2025-01-15`,
    FEEDBACK: "/feedback",
  },
  ORGANIZATION: {
    ORG: "/organisation",
  },
  USERMANAGEMENT: {
    GET_All_USERS: "/admin/users",
    GET_USERS: "/admin/users",
    GET_ROLES: "/admin/role",
    GET_ALL_PERMISSIONS: "/admin/permission",
    DELETE_USER: "/admin/user/:id",
    SEND_REMINDER_EMAIL: "/admin/user/:id/reminder",
    ADD_NEW_USER: "/admin/user",
    UPDATE_USER: "/admin/user/:id",
  },
  INTEGRATION: {
    INTEGRATION: "/integration",
    UPDATE_INTEGRATION: "/integration/default",
    KEKA_INTEGRATION: "/integration/keka",
    DBF_INTEGRATION: "/integration/dbf",
    TELEGRAM_INTEGRATION: "/integration/telegram",
    REMOVE_INTEGRATION: "/integration/",
    GET_ORG_INTEGRATION: "/app",
    ACTIVATE_INTEGRATION: "/app/activation",
    ACTIVATE_INTEGRATION_TELEGRAM: "/app/activation/telegram",
    DARWINBOX: "/integration/darwinbox",
  },
  TRAINFROMECONTENT: {
    UPLOAD_PDF_DATA: "/admin/upload",
    DELETE_PDF: "/admin/train/content",
    UPLOAD_Text_DATA: "/admin/upload",
    UPLOAD_URL_DATA: "/admin/upload",
    GET_UPLOADED_DOCUMENT: "/admin/train/content",
    CUSTOM_API: "/admin/train/custom-action",
    GET_CUSTOM_API: "/admin/train/custom-action",
    GET_SINGLE_DATA: "/admin/train/custom-action",
    GET_CUSTOM_ACTION_API: "/action",
  },
  USER_ROLES: {
    GET_ROLES: "/admin/role",
    Add_NEW_Role: "/admin/role/",
    Edit_NEW_Role: "/admin/role",
  },
  ANALYTICS: {
    GET_ANALYTICS_DATA: "/admin/analytics",
  },
};

const API_URL =
  window.location.origin === "https://staging-app.simplifypath.com"
    ? "https://staging-api.simplifypath.com"
    : "https://api.simplifypath.com";

const CONFIG = {
  TIMEOUT: 30000,
};

export { PAGE_ROUTES, API_ROUTES, CONFIG,API_URL };
