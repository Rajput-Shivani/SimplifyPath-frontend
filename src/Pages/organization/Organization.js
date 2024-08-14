import React, { useEffect, useState } from "react";
import CommanTable from "../../components/table/CommanTable";
import { ApartmentOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addOrganizationData, getOrganizationData } from "../../redux/slices/organizationSlice";
import { useNavigate } from "react-router-dom";
import { setActionName, setCloseBtnName, setIsPopUpShow, setPopUpTitle, setSubmitBtnName } from "../../redux/slices/popUpSlice";
import { Button, Form, Input } from "antd";

export const Organization = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name:"",
    admin:"",
    domain:""
  })
  const [data, setData] = useState([
    {
      key: 1,
      name: "John Brown",
      domain: "Admin",
      companyEmail: "Admintft@gmail.com",
      status: "Verified",
    },
    {
      key: 1,
      name: "John Brown",
      domain: "Employee",
      companyEmail: "Admintft@gmail.com",
      status: "Verified",
    },
  ]);

  const {
    page,
    limit,
    searchItem,
    sortConfig,
    searchInput,
    selectedOptionData,
  } = useSelector((state) => state.globalReducer);
  const {organisations} = useSelector((state)=>state.organizationReducer)
  const { closeBtnName, submitBtnName, isEditpopup, isEditActivate } =
  useSelector((state) => state.popUpRedducer);

  const [visibleColumns, setVisibleColumns] = useState({
    sNo: true,
    name: true,
    domain: false,
    companyEmail: true,
    status: false,
  });

  const handleEdit = (record) => {
    // Implement edit functionality
  };

  const handleDelete = (keys) => {
    setData((prevData) => prevData.filter((item) => !keys.includes(item.key)));
  };

  useEffect(()=>{
    dispatch(getOrganizationData(
      { page:page, limit:limit, navigate:navigate, searchQuery:searchInput || "", 
        sortKey: sortConfig.key,
        sortDirection: sortConfig.direction, }
    ))
  },[])

  const handlePopUpOpen = () => {
    dispatch(setCloseBtnName("Cancel"));
    dispatch(setSubmitBtnName("Submit"));
    dispatch(setActionName("organization"));
    dispatch(setPopUpTitle("Add Organaization"));
    dispatch(setIsPopUpShow(true));
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };


  const onNext = () => {
    dispatch(addOrganizationData({payload:userData, navigate:navigate})); 
      dispatch(setIsPopUpShow(false));
    
  };

  const handleOk = () => {
    dispatch(setIsPopUpShow(false));
    setUserData({ ...userData, name: "", admin:"" , domain:"" });
  };

  const renderPopupContent = () => {
    return (
      <div>
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
        <Form.Item label="Admin" layout="vertical">
        <Input
          size="large"
          name="admin"
          value={userData?.admin}
          onChange={handleChangeInput}
          placeholder="Enter Admin"
          prefix={<UserOutlined />}
        />
        </Form.Item> 
        <Form.Item label="Domain" layout="vertical">
        <Input
          size="large"
          name="domain"
          value={userData?.domain}
          onChange={handleChangeInput}
          placeholder="Enter Domain"
          prefix={<UserOutlined />}
        />
        </Form.Item>   
      </div>
    );
  };

  const renderFooter = () => (
    <div className="button-groups">
      <Button onClick={handleOk}>{closeBtnName}</Button>
      <Button onClick={onNext}>{submitBtnName}</Button>
    </div>
  );


console.log("organisations", organisations)
  return (
    <CommanTable
      title="Organization"
      data={organisations?.data}
      onEdit={handleEdit}
      onDelete={handleDelete}
      visibleColumns={visibleColumns}
      setVisibleColumns={setVisibleColumns}
      icon={<ApartmentOutlined className="icon-size text-white"/>}
      // isAdd={true}
      apiCall={(page, limit, searchInput) => {
        dispatch(getOrganizationData(
          { page:page, limit:limit, navigate:navigate, searchQuery:searchInput || "", 
            sortKey: sortConfig.key,
            sortDirection: sortConfig.direction, }
        ))
      }}
      openAddPopup={handlePopUpOpen}
      renderPopupContent={renderPopupContent}
      isFooter={true}
      customFooter={renderFooter}
    />
  );
};
