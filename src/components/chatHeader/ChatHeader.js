import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Dropdown, Button, Checkbox, Input } from "antd";
import { DownOutlined, KeyOutlined } from "@ant-design/icons";
import {
  UserOutlined,
  LineChartOutlined,
  AliwangwangOutlined,
  DeploymentUnitOutlined,
  UsergroupAddOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  ProfileFilled,
} from "@ant-design/icons";
import "./chatHeader.scss";
import { useDispatch, useSelector } from "react-redux";
import { setActionName, setCloseBtnName, setIsActivatePopup, setIsPopUpShow, setPopUpTitle, setSubmitBtnName } from "../../redux/slices/popUpSlice";
import { DialogBox } from "../dialog/DialogBox";
import { setAddRoleData } from "../../redux/slices/userRoleSlice";
import ActiveDeactive from "../dialog/ActivateDeactivate";
import { closeActiveModal } from "../../redux/slices/userManagementSlice";

const { Header } = Layout;

const ChatHeader = ({ title, onColumnToggle, visibleColumns = {} }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const dispatch = useDispatch()
  const {addUserRoles} = useSelector((state)=>state.userRoleReducer)
  const [addNewRole, setAddNewRole] = useState({
    name: "",
    permissions: null,
  });
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    roleId: "",
  });

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columnMenu = (
    <Menu>
      {Object.keys(visibleColumns).map((column) => (
        <Menu.Item key={column}>
          <Checkbox
            checked={visibleColumns[column]}
            onChange={() => onColumnToggle(column)}
          >
            {column.charAt(0).toUpperCase() + column.slice(1)}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const handlePopUpOpen = ()=>{
    dispatch(setCloseBtnName("Cancel"))
    dispatch(setSubmitBtnName("Next"))
    dispatch(setActionName("User Role"))
    if(title === 'User Role'){
      console.log('step true')
      dispatch(setIsPopUpShow(true))
    }
  }

  console.log("titleuser", title)

  const handleChaneRole=(e)=>{
    console.log("handleChaneRole", e)
    dispatch(setAddRoleData({...addUserRoles, role:e.target.value}))
  }

  const renderUi=()=>{
    if (title === "User Role") {
      return (
        <div className="pop-up-content">
          <div>Role</div>
          <Input
            size="large"
            name="role"
            value={addUserRoles?.role}
            onChange={handleChaneRole}
            placeholder="Enter user role"
            prefix={<UserOutlined />}
            // value={refreshToken}
            // onChange={(e) => dispatch(setRefreshToken(e.target.value))}
          />
        </div>
      );
    } 
  }

  return (
    <Header className="site-layout-background">
      <div
        className={`chat-header-content ${isSmallScreen ? 'small-screen' : ''}`}
      >
        <div className="header-left">
          {title === "Chat" ? (
            <AliwangwangOutlined className="chat-nav-icon" />
          ) : title === "Integration" ? (
            <DeploymentUnitOutlined />
          ) : title === "Profile" ? (
            <UserOutlined />
          ) : title === "Analytics" ? (
            <LineChartOutlined />
          ) : title === "User Role" ? (
            <UserOutlined />
          ) : title === "User Management" ? (
            <UsergroupAddOutlined />
          ) : title === "Organization" ? (
            <ApartmentOutlined />
          ) : title === "Train from content" ? (
            <ProfileFilled />
          ) : title === "Custom API Mapping" ? (
            <UsergroupAddOutlined />
          ) : (
            ""
          )}

          <div className="header-text">
            <div className="header-text-data">{title}</div>  
          </div>
          {(title === "User Role" || title === "User Management" || title === "Organization") && (
            <Button onClick={()=>{
              dispatch(setPopUpTitle(title === "User Role" && "Add a new user role"))
              handlePopUpOpen()
            }}  className="add-btn">Add {title.split(' ')[0]}</Button>
          )}
        </div>
        <div className="header-right">
          {(  window.location.pathname === "/user-roles" ||
          window.location.pathname === "/user-management" ||
          window.location.pathname === "/organization") && (
            <Dropdown overlay={columnMenu} trigger={["click"]}>
              <Button
                className="columns-btn"
                style={{
                  fontSize: window.innerWidth < 576 ? '0.75rem' : '1rem'
                }}
              >
                Columns <DownOutlined />
              </Button>
            </Dropdown>
          )}
        </div>
      </div>
      <DialogBox renderUi={renderUi}/>
      {/* <ActiveDeactive 
      setOpen={()=>dispatch(setIsActivatePopup(false))}
      addNewRole={addNewRole} setAddNewRole={setAddNewRole} setUserData={setUserData}
      onClose={() => dispatch(closeActiveModal())}
      /> */}
    </Header>
  );
};

ChatHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onColumnToggle: PropTypes.func.isRequired,
  visibleColumns: PropTypes.object,
};

export default ChatHeader;
