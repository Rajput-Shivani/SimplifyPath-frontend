import React, { useState, useEffect, useCallback } from "react";
import { Layout, Menu, Dropdown, Button, Checkbox, Tag } from "antd";
import { DownOutlined, MoreOutlined } from "@ant-design/icons";
import {
  isUserRoleAdd,
  isUserManagementAdd,
  isOrganizationAdd,
} from "../../utils/permissions";
import "./header.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfileDetails } from "../../redux/slices/profileSlice";

const { Header } = Layout;

const TopHeader = ({
  dropdownItems,
  isTitle,
  title,
  isRightContent,
  icon,
  onChangeOptions,
  isAdd,
  openAddPopup,
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleResize = useCallback(() => {
    setIsSmallScreen(window.innerWidth < 576);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const renderColumnMenu = () => (
    <Menu>
      {Object.keys(dropdownItems).map((column) => (
        <Menu.Item key={column}>
          <Checkbox
            checked={dropdownItems[column]}
            onChange={() => onChangeOptions(column)}
          >
            {column.charAt(0).toUpperCase() + column.slice(1)}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const renderMenu = () => (
    <Menu>
      <Menu.Item>
        <Button onClick={openAddPopup}>Add {title}</Button>
      </Menu.Item>
      {isRightContent && (
        <Menu.Item>
          <Dropdown overlay={renderColumnMenu()} trigger={["click"]}>
            <Button className="columns-btn">
              Columns <DownOutlined />
            </Button>
          </Dropdown>
        </Menu.Item>
      )}
    </Menu>
  );

  const addPermission =
    (title === "User Role" && isUserRoleAdd) ||
    (title === "User Management" && isUserManagementAdd) ||
    (title === "Organization" && !isOrganizationAdd);

  useEffect(() => {
    dispatch(getProfileDetails({ navigate: navigate }));
  }, []);

  return (
    <Header className="sticky-header">
      <div className="top-header-content">
        <div className="header-left">
          <div className="display-flex-center-gap-10">
            {icon}
            <div className="text-white">
              <div className="display-flex-center-gap-10">
                {isTitle && (
                  <div
                    className={
                      isSmallScreen
                        ? "header-title-text-small"
                        : "header-title-text"
                    }
                  >
                    {title}
                  </div>
                )}
                {!isSmallScreen && addPermission && (
                  <Tag
                    style={{ padding: "5px 10px", cursor: "pointer" }}
                    onClick={openAddPopup}
                  >
                    Add {title}
                  </Tag>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="header-right">
          {isSmallScreen && addPermission ? (
            <Dropdown overlay={renderMenu()} trigger={["click"]}>
              <Button className="more-btn">
                <MoreOutlined />
              </Button>
            </Dropdown>
          ) : (
            isRightContent && (
              <Dropdown overlay={renderColumnMenu()} trigger={["click"]}>
                <Tag
                  style={{ padding: "5px 10px", cursor: "pointer" }}
                  className="columns-btn"
                >
                  Columns <DownOutlined />
                </Tag>
              </Dropdown>
            )
          )}
        </div>
      </div>
    </Header>
  );
};

export default TopHeader;
