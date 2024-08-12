import React from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  dbfIntegrations,
  getDarwinBox,
  kekaIntegrations,
  removeIntegrationsData,
  setEmployeeId,
  setRefreshToken,
  setTelegramId,
  setTelegramToken,
  setUser,
  telegramIntegrations,
} from "../../redux/slices/integrationSlice";
import {
  setIsActivatePopup,
  setIsEditpopup,
  setIsPopUpShow,
  setPopUpTitle,
} from "../../redux/slices/popUpSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ROUTES } from "../../utils/constants";
import AppSecureStorage from "../../services/secureStorage";
import "./dialog.scss";
import { ActiveDeactive } from "./ActivateDeactivate";
import { update_user } from "../../redux/slices/userManagementSlice";

const storage = new AppSecureStorage();

export const DialogBox = ({ renderUi=()=>{},onSubmit,onNext ,isFooter, customFooter=()=>{}, onClose=()=>{}}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    refreshToken,
    employeeId,
    user: { email, password },
    telegramId,
  } = useSelector((state) => state.integrationReducer);
  const { isPopUpShow, actionName, popUpTitle, closeBtnName, submitBtnName,isEditpopup } =
    useSelector((state) => state.popUpRedducer);
  const { page, filterValue, limit, searchInput, selectedRole,sortConfig,selectedUserRoleId } = useSelector(
    (state) => state.globalReducer
  );

  const handleOk = () => {
    dispatch(setIsPopUpShow(false));
    dispatch(setRefreshToken(""));
    dispatch(setUser({ email: "", password: "" }));
    dispatch(setTelegramId(""));
    dispatch(setEmployeeId(""));
    dispatch(setTelegramToken(""))
    dispatch(setIsEditpopup(false))
    onClose()
    
  };

  const handleIntegrations = (integrationAction) => {
    switch (integrationAction) {
      case "keka":
        dispatch(kekaIntegrations({ body: { refreshToken }, navigate }));
        break;
      case "darwinbox":
        dispatch(
          getDarwinBox({
            employeeId,
            body: { employee_no: employeeId },
            navigate,
          })
        );
        break;
      case "dbf":
        dispatch(dbfIntegrations({ body: { email, password }, navigate }));
        break;
      case "telegram":
        dispatch(telegramIntegrations({ body: { telegramId }, navigate }));
        break;
      default:
        break;
    }
    dispatch(setIsPopUpShow(false));
  };

  // const userPermissionsOpens=()=>{
  //   dispatch(setPopUpTitle("Permissions"))
  //   dispatch(cance("Permissions"))
  // }

  const handleSubmit = () => {
    switch (actionName) {
      case "User role change":
        dispatch(
          update_user({
            id: selectedUserRoleId,
            data: { role: selectedRole },
            navigate: navigate,
            page: page,
            limit: limit,
            filterValue: filterValue.toLowerCase(),
            searchQuery: searchInput,
            sortKey: sortConfig.key,
            sortDirection: sortConfig.direction,
          })
        );
        dispatch(setIsPopUpShow(false));
        break;
      case "User Role":
        dispatch(setIsActivatePopup(true));
        dispatch(setIsPopUpShow(false));
        break;
      case "activate":
        handleIntegrations(popUpTitle);
        break;
      case "deactivate":
        dispatch(removeIntegrationsData({ name: popUpTitle, navigate }));
        dispatch(setIsPopUpShow(false));
        break;
      case "google_calendar":
      case "jira":
      case "salesforce":
        handleExternalIntegrations();
        break;
        case "telegram":
          onSubmit();
          break;
      default:
        break;
    }
  };

  const handleExternalIntegrations = () => {
    const token = storage.get("token");
    const apiUrl = `${API_ROUTES.BASE_URL}integration/${
      actionName === "google_calendar" ? "google-calendar" : actionName
    }?authorization=Bearer ${token}`;
    if (actionName === "jira") {
      window.location.href = apiUrl;
    } else {
      axios
        .get(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => dispatch(setIsPopUpShow(false)))
        .catch(() => {});
    }
  };

  const renderFooter = () => (
    <div className="button-groups">
      <Button onClick={handleOk}>{closeBtnName}</Button>
      {["google_calendar", "jira", "salesforce"].includes(actionName) ? (
        <a
          href={`${API_ROUTES.BASE_URL}integration/${
            actionName === "google_calendar" ? "google-calendar" : actionName
          }?authorization=Bearer ${storage.get("token")}`}
        >
          <Button className="integration-google-btn">{submitBtnName}</Button>
        </a>
      ) : (
        <Button onClick={handleSubmit}>{submitBtnName}</Button>
      )}
    </div>
  );

  return (
    <Modal
      className="modal-container"
      title={popUpTitle}
      open={isEditpopup ? isEditpopup :isPopUpShow}
      onOk={handleOk}
      onCancel={handleOk}
      footer={isFooter ? customFooter () : renderFooter()}
      centered
    >
      {renderUi()}
    </Modal>
  );
};
