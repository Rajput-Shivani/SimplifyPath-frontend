import React, { useState } from "react";
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
import { setUserToken } from "../../redux/slices/authSlice";
const storage = new AppSecureStorage();

const menuItems = [
  {
    key: "1",
    icon: <AliwangwangOutlined />,
    label: "Chat",
    path: PAGE_ROUTES.CHAT,
  },
  {
    key: "2",
    icon: <DeploymentUnitOutlined />,
    label: "Integration",
    path: PAGE_ROUTES.INTEGRATION,
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: "Profile",
    path: PAGE_ROUTES.PROFILE,
  },
  {
    key: "4",
    icon: <LineChartOutlined />,
    label: "Analytics",
    path: PAGE_ROUTES.ANALYTICS,
  },
  {
    key: "5",
    icon: <UserOutlined />,
    label: "User Roles",
    path: PAGE_ROUTES.USER_ROLES,
  },
  {
    key: "6",
    icon: <UsergroupAddOutlined />,
    label: "User Management",
    path: PAGE_ROUTES.USER_MANAGEMENT,
  },
  {
    key: "7",
    icon: <ApartmentOutlined />,
    label: "Organization",
    path: PAGE_ROUTES.ORGANIZATION,
  },
  {
    key: "sub1",
    icon: <FileTextOutlined />,
    label: "Train and Content",
    children: [
      {
        key: "8",
        icon: <ProfileFilled />,
        label: "Content",
        path: PAGE_ROUTES.CONTENT,
      },
      {
        key: "9",
        icon: <UsergroupAddOutlined />,
        label: "Custom",
        path: PAGE_ROUTES.CUSTOM,
      },
    ],
  },
];

const Sidebar = () => {
  const dispatch = useDispatch()
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu
            className="submenuesStyle"
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

  const handleLogout = () => {
    storage.clearStorage();
    dispatch(setUserToken(""))
    navigate(PAGE_ROUTES.HOME);
  };

  const getSelectedKey = () => {
    const path = location.pathname;
  
    let selectedKey = "1"; // default to the first item in case nothing matches
  
    const findActiveKey = (items) => {
      for (let item of items) {
        if (item.path === path) {
          return item.key;
        }
        if (item.children) {
          const childKey = findActiveKey(item.children);
          if (childKey) {
            return childKey;
          }
        }
      }
      return null;
    };
  
    const foundKey = findActiveKey(menuItems);
    if (foundKey) {
      selectedKey = foundKey;
    }
  
    return selectedKey;
  };
  
  const getOpenKey = () => {
    const path = location.pathname;
  
    const findParentKey = (items, parentKey = null) => {
      for (let item of items) {
        if (item.path === path) {
          return parentKey;
        }
        if (item.children) {
          const childKey = findParentKey(item.children, item.key);
          if (childKey) {
            return childKey;
          }
        }
      }
      return null;
    };
  
    return findParentKey(menuItems);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="sider"
      breakpoint="md"
      collapsedWidth={80}
      onBreakpoint={(broken) => {
        if (broken) {
          setCollapsed(true);
        }
      }}
    >
      <div className="logo" />
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: `trigger ${collapsed ? "collapsed" : "expanded"}`,
        onClick: toggle,
      })}
      <div className="menu-wrapper">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[getSelectedKey()]}
        defaultOpenKeys={[getOpenKey()]}
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
