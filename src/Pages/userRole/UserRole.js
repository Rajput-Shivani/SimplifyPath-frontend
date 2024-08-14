import React, { useEffect, useState } from "react";
import CommanTable from "../../components/table/CommanTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addNewRoleData,
  editRoleData,
  getRolesData,
  setAddRoleData,
} from "../../redux/slices/userRoleSlice";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import {
  setConfirmationContent,
  setConfirmationData,
  setConfirmationTitle,
  setIsConfirmation,
  setLimit,
  setPage,
  setSelectedOption,
} from "../../redux/slices/globalSlice";
import Confirmation from "../../components/dialog/Confirmation";
import {
  setActionName,
  setCloseBtnName,
  setIsActivatePopup,
  setIsEditActive,
  setIsEditpopup,
  setIsPopUpShow,
  setPopUpTitle,
  setSubmitBtnName,
} from "../../redux/slices/popUpSlice";
import { Button, Input } from "antd";
import ActiveDeactive from "../../components/dialog/ActivateDeactivate";
import { getAllPermissions } from "../../redux/slices/userManagementSlice";
import { toast } from "react-toastify";

export const UserRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const {
    page,
    limit,
    searchItem,
    sortConfig,
    searchInput,
    selectedOptionData,
  } = useSelector((state) => state.globalReducer);
  const { roles, addUserRoles,loading } = useSelector((state) => state.userRoleReducer);
  const { closeBtnName, submitBtnName, isEditpopup, isEditActivate } =
    useSelector((state) => state.popUpRedducer);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    roleId: "",
  });
  const [addNewRole, setAddNewRole] = useState({
    name: selectedOptionData?.name || "",
    permissions: selectedOptionData?.permissions || "",
  });

  const [visibleColumns, setVisibleColumns] = useState({
    sNo: true,
    name: true,
    permissions: false,
  });

  const handleConfirmationOpen = (record) => {
    dispatch(setCloseBtnName("Cancel"));
    dispatch(setSubmitBtnName("Next"));
    dispatch(setSelectedOption(record));
    dispatch(setIsEditpopup(true));
    dispatch(setIsEditActive(true));
  };

  const actionsOptions = [
    {
      label: "Edit",
      acttion: (record) => {
        handleConfirmationOpen(record);
        setAddNewRole({
          ...addNewRole,
          name: record?.name,
          permissions: record?.permissions,
        });
      },
      icon: <EditOutlined />,
    },
  ];

  const handlePopUpOpen = () => {
    dispatch(setCloseBtnName("Cancel"));
    dispatch(setSubmitBtnName("Next"));
    dispatch(setActionName("User Role"));
    dispatch(setPopUpTitle("User Role"));
    dispatch(setIsPopUpShow(true));
  };

  useEffect(() => {
    dispatch(
      getRolesData({
        page: page,
        limit: limit,
        searchQuery: searchInput || "",
        sortKey: sortConfig.key,
        sortDirection: sortConfig.direction,
        navigate: navigate,
      })
    );
  }, [page, limit, searchItem, sortConfig]);

  const handleChaneRole = (e) => {
    setAddNewRole({ ...addNewRole, name: e.target.value });
  };

  const onNext = () => {
    console.log("called", addNewRole);
    dispatch(getAllPermissions({ navigate: navigate }));
    if (!addNewRole?.name) {
      toast.error("role name is required");
    } else {
      dispatch(setIsActivatePopup(true));
      dispatch(setIsEditpopup(false));
      dispatch(setIsPopUpShow(false));
    }
  };

  const handleOk = () => {
    dispatch(setIsActivatePopup(false));
    dispatch(setIsPopUpShow(false));
    setAddNewRole({ ...addNewRole, name: "", permissions: {} });
  };

  const renderFooter = () => (
    <div className="button-groups">
      <Button onClick={handleOk}>{closeBtnName}</Button>
      <Button onClick={onNext}>{submitBtnName}</Button>
    </div>
  );

  const onSubmitPermission = () => {
    const filteredPermissions = Object.fromEntries(
      Object.entries(addNewRole?.permissions).filter(
        ([key, value]) => value.length > 0
      )
    );
    const updatedRole = {
      ...addNewRole,
      permissions: filteredPermissions,
    };
    console.log("updatedRole", updatedRole);
    if (isEditActivate) {
      dispatch(
        editRoleData({
          body: updatedRole,
          page: page,
          id: selectedOptionData?._id,
          limit: limit,
          searchQuery: searchItem || "",
          sortKey: sortConfig.key,
          sortDirection: sortConfig.direction,
          navigate: navigate,
        })
      );

      dispatch(setIsActivatePopup(false));
      dispatch(setIsEditpopup(false));
      dispatch(setPage(1));
      dispatch(setLimit(10));
      dispatch(
        getRolesData({
          page,
          limit,
          searchQuery: searchItem || "",
          sortKey: sortConfig.key,
          sortDirection: sortConfig.direction,
          navigate,
        })
      );
      dispatch(getAllPermissions({ navigate: navigate }));
      setAddNewRole({ ...addNewRole, name: "", permissions: {} });
    } else {
      dispatch(
        addNewRoleData({
          body: addNewRole,
          page: page,
          limit: limit,
          searchQuery: searchItem || "",
          sortKey: sortConfig.key,
          sortDirection: sortConfig.direction,
          navigate: navigate,
        })
      );
      dispatch(setIsActivatePopup(false));
      dispatch(getAllPermissions({ navigate: navigate }));
      handleOk();
    }
  };

  const renderPopupContent = () => {
    return (
      <div className="pop-up-content">
        <div>Role</div>
        <Input
          size="large"
          name="name"
          value={addNewRole?.name}
          onChange={handleChaneRole}
          placeholder="Enter user role"
          prefix={<UserOutlined />}
        />
      </div>
    );
  };

  return (
    <>
      <CommanTable
        title="User Role"
        data={roles?.data}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        apiCall={(page, limit, searchInput) => {
          dispatch(
            getRolesData({
              page: page,
              limit: limit,
              searchQuery: searchInput || "",
              sortKey: sortConfig.key,
              sortDirection: sortConfig.direction,
              navigate: navigate,
            })
          );
        }}
        actionsOptions={actionsOptions}
        icon={<UserOutlined className="icon-size text-white" />}
        openAddPopup={handlePopUpOpen}
        renderPopupContent={renderPopupContent}
        isFooter={true}
        customFooter={renderFooter}
        isEdit={isEditpopup}
        onClose={() =>
          setAddNewRole({ ...addNewRole, name: "", permissions: {} })
        }
        isAdd={true}
        loading={loading}
      />
      <Confirmation />
      <ActiveDeactive
        setOpen={() => {
          dispatch(setIsActivatePopup(false));
          setAddNewRole({ ...addNewRole, name: "", permissions: {} });
        }}
        onClose={handleOk}
        addNewRole={addNewRole}
        setAddNewRole={setAddNewRole}
        setUserData={setUserData}
        handleSubmit={onSubmitPermission}
        isEdit={isEdit}
      />
    </>
  );
};

export default UserRole;
