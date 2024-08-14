import React from "react";
import { Outlet, Navigate, createBrowserRouter } from "react-router-dom";
import Redirect from "../components/redirect/Redirect";
import { ChatPage } from "./chatPage/ChatPage";
import { IntegrationPage } from "./integration/Integration";
import { Profile } from "./profile/Profile";
import { PAGE_ROUTES } from "../utils/constants";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import { Analytics } from "./Analytics/Analytics";
import { UserManagement } from "./userManagement/UserManagement";
import { Organization } from "./organization/Organization";
import { TrainAndContent } from "./trainAndContent/content/Content";
import UserRole from "./userRole/UserRole";
import { Login } from "./login/Login";
import { Custom } from "./trainAndContent/custom/Custom";

// const Chat = React.lazy(() => import("./chat/Chat"));
// const Integration = React.lazy(() => import("./integration/Integration"));
// const Profile = React.lazy(() => import("./profile/Profile"));
// const Analytics = React.lazy(() => import("./analytics/Analytics"));

// const Error = React.lazy(() => import("./errorPage/Error"));
// const Login = React.lazy(() => import("../pages/auth/Login"));
// // const Users = React.lazy(() => import("./Users/Users"));
// const Redirect = React.lazy(() => import("../components/redirect/redirect"));
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Redirect />,
    SideNav: true,
  },
  {
    path: PAGE_ROUTES.CHAT,
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
    SideNav: true,
  },
  {
    path: PAGE_ROUTES.INTEGRATION,
    element: (
      <ProtectedRoute>
        <IntegrationPage />
      </ProtectedRoute>
    ),
    SideNav: true,
  },
  {
    path: PAGE_ROUTES.PROFILE,
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    SideNav: true,
  },
  {
    path: PAGE_ROUTES.ANALYTICS,
    element: (
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    ),
    SideNav: true,
  },
  {
    path: PAGE_ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    ),
    SideNav: true,
  },
  {
    path: PAGE_ROUTES.USER_MANAGEMENT,
    element: (
      <ProtectedRoute>
        <UserManagement />
      </ProtectedRoute>
    ),
    SideNav: true,
  },
  {
    path: PAGE_ROUTES.ORGANIZATION,
    element: (
      <ProtectedRoute>
        <Organization />
      </ProtectedRoute>
    ),
    SideNav: true,
  },
  {
    path: PAGE_ROUTES.CONTENT,
    element: (
      <ProtectedRoute>
        <TrainAndContent />
      </ProtectedRoute>
    ),
    SideNav: true,
  },
  {
    path: PAGE_ROUTES.CUSTOM,
    element: (
      <ProtectedRoute>
        <Custom />
      </ProtectedRoute>
    ),
    SideNav: true,
  },
  {
    path: PAGE_ROUTES.USER_ROLES,
    element: (
      <ProtectedRoute>
        <UserRole />
      </ProtectedRoute>
    ),
    SideNav: true,
  },

  //     ],
  //   },
  {
    path: PAGE_ROUTES.LOGIN,
    element: <Login />,
    SideNav: false,
  },

  // { path: "*", element: <Error />, SideNav: false },
]);

export default routes;
