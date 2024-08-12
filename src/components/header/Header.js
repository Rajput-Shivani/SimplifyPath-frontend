import React, { useState, useEffect, useCallback } from "react";
import { Layout, Menu, Dropdown, Button, Checkbox, Tag } from "antd";
import { DownOutlined, MoreOutlined } from "@ant-design/icons";
import "./header.scss";

const { Header } = Layout;

const TopHeader = ({
  dropdownItems,
  isTitle,
  title,
  isRightContent,
  icon,
  onChangeOptions,
  isAdd,
  openAddPopup
}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 576);

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
            <Button className="columns-btn">Columns <DownOutlined /></Button>
          </Dropdown>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Header className="sticky-header">
      <div className="top-header-content">
        <div className="header-left">
          <div className="display-flex-center-gap-10">
            {icon}
            <div className="text-white">
              <div className="display-flex-center-gap-10">
                {isTitle && <div className={isSmallScreen ? "header-title-text-small": "header-title-text"}>{title}</div>}
                {!isSmallScreen && isAdd && (
                  <Tag style={{padding:"5px 10px", cursor:"pointer"}}  onClick={openAddPopup}>Add {title}</Tag>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="header-right">
          {isSmallScreen  && isAdd ? (
            <Dropdown overlay={renderMenu()} trigger={["click"]}>
              <Button className="more-btn">
                <MoreOutlined />
              </Button>
            </Dropdown>
          ) : (
            isRightContent && (
              <Dropdown overlay={renderColumnMenu()} trigger={["click"]}>
                <Button className="columns-btn">Columns <DownOutlined /></Button>
              </Dropdown>
            )
          )}
        </div>
      </div>
    </Header>
  );
};

export default TopHeader;
