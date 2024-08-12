// AppContainer.js
import React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import "./container.scss";
import { IntegrationPage } from "../../Pages/integration/Integration";
import { ChatPage } from "../../Pages/chatPage/ChatPage";
import { Profile } from "../../Pages/profile/Profile";
import { Custom } from "../../Pages/trainAndContent/custom/Custom";
import { TrainAndContent } from "../../Pages/trainAndContent/content/Content";
import { UserRole } from "../../Pages/userRole/UserRole";
import Redirect from "../redirect/Redirect";
import { UserManagement } from "../../Pages/userManagement/UserManagement";
import { Organization } from "../../Pages/organization/Organization";
import { Analytics } from "../../Pages/Analytics/Analytics";
const { Content } = Layout;

const AppContainer = () => (
  <Content
    className="site-layout-background"
    style={{
      margin: "24px 16px",
      flex: 1,
    }}
  >
    <Routes>
      <>
        <Route path="/" element={<Redirect />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/integration" element={<IntegrationPage />} />
        <Route path="/user-roles" element={<UserRole />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/content" element={<TrainAndContent />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/analytics" element={<Analytics />} />
      </>
    </Routes>
  </Content>
);

export default AppContainer;
