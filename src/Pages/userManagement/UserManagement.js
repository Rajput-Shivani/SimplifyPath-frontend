import React, { useEffect, useState } from "react";
import CommanTable from "../../components/table/CommanTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addNewUser,
  deleteUser,
  getAllUsersManagementData,
  getRoles,
  sendReminderEmail,
} from "../../redux/slices/userManagementSlice";
import { DialogBox } from "../../components/dialog/DialogBox";
import {
  DeleteOutlined,
  MailOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  setActionName,
  setCloseBtnName,
  setIsPopUpShow,
  setPopUpTitle,
  setSubmitBtnName,
} from "../../redux/slices/popUpSlice";
import { Button, Form, Input, Select } from "antd";
import { setConfirmationContent, setConfirmationData, setConfirmationTitle, setIsConfirmation, setSelectedOption } from "../../redux/slices/globalSlice";
import Confirmation from "../../components/dialog/Confirmation";
import { isUserManagementDelete } from "../../utils/permissions";

export const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectRole, setSelectedRole] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    roleId: "",
  });

  const [status, setStatus] = useState("")

  const { getUserManagementData, pageRole, limitRole, getRolesData ,loading} = useSelector(
    (state) => state.userManagementReducer
  );
  const { closeBtnName, submitBtnName } = useSelector(
    (state) => state.popUpRedducer
  );
  const { page, limit, filterValue, selectedRole, sortConfig, searchInput ,selectedOptionData} =
    useSelector((state) => state.globalReducer);

  // Handle role selection
  const handleChange = (value) => {
    // Find the role object based on the selected value
    const selectedRoleObject = getRolesData?.data?.find(role => role.name === value);
    if (selectedRoleObject) {
      setSelectedRole(value); // Display the role name
      setUserData(prevState => ({
        ...prevState,
        roleId: selectedRoleObject._id // Update the role ID in userData
      }));
    }
  };

  // Handle input change
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [visibleColumns, setVisibleColumns] = useState({
    sNo: true,
    name: true,
    email: false,
    role: true,
    status: false,
  });

  useEffect(() => {
    dispatch(
      getAllUsersManagementData({
        page,
        limit,
        navigate,
        filterValue: filterValue?.toLowerCase(),
        searchQuery: searchInput || "",
        sortKey: sortConfig.key,
        sortDirection: sortConfig.direction,
      })
    );
    dispatch(getRoles({ navigate: navigate }));
  }, []);

  const confirmationOpen=(record)=>{
    console.log("usernamanagment-recode", record)
    dispatch(setSelectedOption(record))
    dispatch(setConfirmationTitle("Remove User"))
    dispatch(setConfirmationContent("Are you sure You want to remove"))
    dispatch(setConfirmationData(record?.name))
    dispatch(setIsConfirmation(true))

  }

  const reminderConfirmation=(record)=>{
    dispatch(setSelectedOption(record))
    dispatch(setConfirmationTitle("Set Reminder"))
    dispatch(setConfirmationContent("Are you sure you want to send reminder to"))
    dispatch(setConfirmationData(record?.name))
    dispatch(setIsConfirmation(true))

  }
  const actionsOptions = [
    {
      label: "send reminder",
      acttion: (record) => {
        setStatus("reminder")
        reminderConfirmation(record)
      },
      icon: <MailOutlined />,
    },
    isUserManagementDelete && {
      label: "Delete",
      acttion: (record) => {
        setStatus("delete")
        confirmationOpen(record)
      },
      icon: <DeleteOutlined />,
    },
  ];

  const handlePopUpOpen = () => {
    dispatch(setCloseBtnName("Close"));
    dispatch(setSubmitBtnName("Submit"));
    dispatch(setActionName("Add User Management"));
    dispatch(setPopUpTitle("Add User Management"));
    dispatch(setIsPopUpShow(true));
  };

  // Prepare role options for Select component
  const options = getRolesData?.data?.map(role => ({
    value: role.name,
    label: role.name,
  }));

  const renderPopupContent = () => {
    return (
      <div>
        <Form.Item label="Email" layout="vertical" wrapperCol={{ span: 24 }}>
          <Input
            size="large"
            name="email"
            type="email"
            value={userData?.email}
            onChange={handleChangeInput}
            placeholder="Enter email"
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item label="Name" layout="vertical">
          <Input
            size="large"
            name="name"
            value={userData?.name}
            onChange={handleChangeInput}
            placeholder="Enter Name"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item label="Role" layout="vertical">
          <Select
            value={selectRole}
            size="large"
            onChange={handleChange}
            style={{ width: '100%' }}
            allowClear
            options={options}
          />
        </Form.Item>
      </div>
    );
  };

  const handleOk = () => {
    dispatch(setIsPopUpShow(false));
  };

  const onSubmit = () => {
   dispatch(addNewUser({body:userData, page:page, navigate:navigate,
    limit:limit,
    filterValue:filterValue?.toLowerCase(),
    searchQuery:searchInput || "",
    sortKey: sortConfig.key,
    sortDirection: sortConfig.direction}))
    setUserData({...userData, email:"", roleId:"", name:""})
  };

  const renderFooter = () => (
    <div className="button-groups">
      <Button onClick={handleOk}>{closeBtnName}</Button>
      <Button onClick={onSubmit}>{submitBtnName}</Button>
    </div>
  );

 

  const handleRemove=()=>{
    dispatch(deleteUser({
      id:selectedOptionData?._id,
      page:page,
      limit:limit,
      navigate:navigate,
      filterValue:filterValue?.toLowerCase(),
      searchQuery: searchInput || "",
      sortKey: sortConfig.key,
      sortDirection: sortConfig.direction,
    }))
    dispatch(setIsConfirmation(false))
  }

  const handlesendRminder=()=>{
    dispatch(sendReminderEmail({
      id:selectedOptionData?._id,
      navigate:navigate
    }))
    dispatch(setIsConfirmation(false))
  }

  return (
    <>
      <CommanTable
        title="User Management"
        data={getUserManagementData?.data}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        apiCall={(page, limit, searchInput) => {
          dispatch(
            getAllUsersManagementData({
              page: page,
              limit: limit,
              navigate,
              filterValue: filterValue?.toLowerCase(),
              searchQuery: searchInput,
              sortKey: sortConfig.key,
              sortDirection: sortConfig.direction,
            })
          );
        }}
        actionsOptions={actionsOptions}
        openAddPopup={handlePopUpOpen}
        icon={<UsergroupAddOutlined className="icon-size text-white" />}
        onClose={() => {
          dispatch(setIsPopUpShow(false))
          setUserData({...userData, email:"", roleId:"", name:""})
        }}
        renderPopupContent={renderPopupContent}
        isFooter={true}
        customFooter={renderFooter}
        isAdd={true}
        loading={loading}
      />
      <Confirmation isRemove={status === "reminder" ? false : true} 
      onRemove={handleRemove}
      onSubmit={handlesendRminder}
      />
    </>
  );
};
