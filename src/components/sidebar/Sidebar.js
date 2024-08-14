import React, { useState, useEffect, useMemo } from "react";
import { Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LineChartOutlined,
  AliwangwangOutlined,
  DeploymentUnitOutlined,
  UsergroupAddOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  ProfileFilled,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import "./sidebar.scss";
import { PAGE_ROUTES } from "../../utils/constants";
import AppSecureStorage from "../../services/secureStorage";
import { useDispatch } from "react-redux";
import {
  isAnalyticsGet,
  isChatGet,
  isCustomActionsGet,
  isIntegrationGet,
  isOrganizationGet,
  isProfileGet,
  isTrainAndContentGet,
  isUserManagementGet,
  isUserRoleGet,
} from "../../utils/permissions";

const storage = new AppSecureStorage();

const Sidebar = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    storage.clearStorage();
    navigate(PAGE_ROUTES.HOME);
  };

  const menuItems = useMemo(() => {
    return [
      isChatGet && {
        key: "1",
        icon: <AliwangwangOutlined />,
        label: "Chat",
        path: PAGE_ROUTES.CHAT,
      },
      isIntegrationGet && {
        key: "2",
        icon: <DeploymentUnitOutlined />,
        label: "Integration",
        path: PAGE_ROUTES.INTEGRATION,
      },
      isProfileGet && {
        key: "3",
        icon: <UserOutlined />,
        label: "Profile",
        path: PAGE_ROUTES.PROFILE,
      },
      isAnalyticsGet && {
        key: "4",
        icon: <LineChartOutlined />,
        label: "Analytics",
        path: PAGE_ROUTES.ANALYTICS,
      },
      isUserRoleGet && {
        key: "5",
        icon: <UserOutlined />,
        label: "User Roles",
        path: PAGE_ROUTES.USER_ROLES,
      },
      isUserManagementGet && {
        key: "6",
        icon: <UsergroupAddOutlined />,
        label: "User Management",
        path: PAGE_ROUTES.USER_MANAGEMENT,
      },
      isOrganizationGet && {
        key: "7",
        icon: <ApartmentOutlined />,
        label: "Organization",
        path: PAGE_ROUTES.ORGANIZATION,
      },
      (isTrainAndContentGet || isCustomActionsGet) && {
        key: "sub1",
        icon: <FileTextOutlined />,
        label: "Train and Content",
        children: [
          isTrainAndContentGet && {
            key: "8",
            icon: <ProfileFilled />,
            label: "Content",
            path: PAGE_ROUTES.CONTENT,
          },
          isCustomActionsGet && {
            key: "9",
            icon: <UsergroupAddOutlined />,
            label: "Custom",
            path: PAGE_ROUTES.CUSTOM,
          },
        ].filter(Boolean),
      },
    ].filter(Boolean);
  }, []);

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu
            key={item.key}
            icon={item.icon}
            title={item.label}
          >
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.path}>{item.label}</Link>
        </Menu.Item>
      );
    });
  };

  const getSelectedKey = () => {
    const findActiveKey = (items) => {
      for (let item of items) {
        if (item.path === location.pathname) {
          return item.key;
        }
        if (item.children) {
          const childKey = findActiveKey(item.children);
          if (childKey) return childKey;
        }
      }
      return null;
    };
    return findActiveKey(menuItems) || "1";
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  useEffect(() => {
    const isInTrainAndContent = location.pathname.startsWith(PAGE_ROUTES.CONTENT) ||
      location.pathname.startsWith(PAGE_ROUTES.CUSTOM);

    if (!isInTrainAndContent) {
      setOpenKeys([]);
    }
  }, [location]);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="sider"
      breakpoint="md"
      collapsedWidth={80}
      onBreakpoint={(broken) => broken && setCollapsed(true)}
    >
      <div className="logo" />
      {React.createElement(
        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: `trigger ${collapsed ? "collapsed" : "expanded"}`,
          onClick: toggle,
        }
      )}
      <div className="menu-wrapper">
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          className="menu-container"
        >
          {renderMenuItems(menuItems)}
        </Menu>
      </div>
      <div className="logout-menu">
        <Menu
          theme="dark"
          mode="inline"
          style={{ position: "absolute", bottom: 0, width: "100%" }}
        >
          <Menu.Item key="a0" icon={<UserOutlined />} onClick={handleLogout}>
            <Link to={PAGE_ROUTES.LOGOUT}>Logout</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar;
