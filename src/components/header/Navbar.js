import React from "react";
import { Layout, Menu, Dropdown, Avatar, Badge } from "antd";
import { BellOutlined, UserOutlined, DownOutlined, CaretDownOutlined } from "@ant-design/icons";
import "./navbar.scss";
import { PAGE_ROUTES } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppSecureStorage from "../../services/secureStorage";
import { setUserToken } from "../../redux/slices/authSlice";

const { Header } = Layout;

const storage = new AppSecureStorage();

const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profileReducer);

  const handleLogout = () => {
    storage.clearStorage();
    dispatch(setUserToken(""));
    navigate(PAGE_ROUTES.HOME);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate(PAGE_ROUTES.PROFILE)}>My Profile</Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background">
      <div className="header-content">
        <div className="header-left">
          <img
            src="https://app.simplifypath.com/static/media/logo.2997b524ab2d61e9dce7994b7ef13911.svg"
            alt="Logo"
            className="header-logo"
          />
          <div className="header-text">
            <h1>SimplifyPath</h1>
            <p className="powered-by">Powered by tft</p>
          </div>
        </div>
        <div className="header-right">
          <Badge offset={[10, 0]}>
            <BellOutlined className="header-icon" />
          </Badge>
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="avatar-dropdown">
              <Avatar src={user?.picture && user?.picture} icon={!user?.picture && <UserOutlined />} className="header-icon" />
              <CaretDownOutlined className="dropdown-icon" />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
