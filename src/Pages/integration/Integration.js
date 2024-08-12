import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Layout,
  Tabs,
  Card,
  Button,
  Row,
  Col,
  Avatar,
  Switch,
  Input,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./integration.scss";
import {
  activateIntegrations,
  activateIntegrationsTelegram,
  getIntegrationsData,
  getOrgIntegrationsData,
  removeIntegrationsData,
  setEmployeeId,
  setIntegrationDrawerOpen,
  setRefreshToken,
  setTelegramId,
  setTelegramToken,
  setUser,
} from "../../redux/slices/integrationSlice";
import jira from "../../assets/Jira.svg";
import googleCalender from "../../assets/googleCalender.png";
import salesForce from "../../assets/Saleforce.png";
import keka from "../../assets/keka.png";
import darwinbox from "../../assets/darwin.png";
import dbf from "../../assets/dbf.png";
import Telegram from "../../assets/Telegram.png";
import {
  DeploymentUnitOutlined,
  GoogleOutlined,
  KeyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  setActionName,
  setCloseBtnName,
  setIsPopUpShow,
  setPopUpTitle,
  setSubmitBtnName,
} from "../../redux/slices/popUpSlice";
import { DialogBox } from "../../components/dialog/DialogBox";
import {
  setConfirmationContent,
  setConfirmationData,
  setConfirmationTitle,
  setIsConfirmation,
  setSelectedOption,
} from "../../redux/slices/globalSlice";
import TopHeader from "../../components/header/Header";
import Confirmation from "../../components/dialog/Confirmation";
import { IntegrationDrawer } from "./drawer/IntegrationDrawer";
import SpinLoader from "../../components/Loader/SpinLoader";

const { Content } = Layout;
const { TabPane } = Tabs;

export const IntegrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [selectedOrg, setSelectedOrg] = useState(null);
  const { selectedOptionData } = useSelector((state) => state.globalReducer);
  const [activeStatus, setActiveStatus]= useState(false)
  const [activeTitle, setActiveTitle] = useState(""); // Track the active card title
  const {
    orgIntegrationList,
    integrationList,
    refreshToken,
    employeeId,
    user,
    telegramId,
    telegramToken,
    loader
  } = useSelector((state) => state.integrationReducer);
  const { actionName } = useSelector((state) => state.popUpRedducer);

  const handleSwitchToggle = (name, isActivated) => {
    let activeStatus = isActivated ? "Deactivate" : "Activate";
    setSelectedOrg(!isActivated);
    if (name) {
      dispatch(setConfirmationTitle(`${activeStatus} ${name}`));
      dispatch(
        setConfirmationContent(`Are you sure you want to ${activeStatus}`)
      );
      dispatch(setConfirmationData(name));
      dispatch(setIsConfirmation(true));
    }
    if (name === "telegram") {
      dispatch(setIsConfirmation(false));
      dispatch(setActionName("telegram"));
      dispatch(setPopUpTitle(`${activeStatus} Telegram`));
      dispatch(setIsPopUpShow(true));
      dispatch(setCloseBtnName("Cancel"));
        dispatch(setSubmitBtnName("Submit"));
    }
  };

 
  const handleActivateSwitch = () => {
    const payload = {
      name: selectedOptionData?.name,
      activate: selectedOptionData?.activated ? false : true,
    };
    dispatch(activateIntegrations({ body: payload }));
  };

  const handleCancel = () => {
    dispatch(setIsConfirmation(false));
  };

  const handleTelegramActivate = () =>{
    const payload = {
      telegramToken: telegramToken,
      activate:true
    };
    dispatch(activateIntegrationsTelegram({body:payload,navigate:navigate}))
  }

  const logoMapping = {
    keka,
    dbf,
    google_calendar: googleCalender,
    jira,
    salesforce: salesForce,
    telegram: Telegram,
    gmail: <GoogleOutlined className="gmail-icon" />,
    darwinbox,
  };

  console.log("selectedOptionData", selectedOrg);

  const IntegrationCard = React.memo(
    ({
      title,
      link,
      features,
      showSwitch,
      isActivated,
      selectedCard,
      activatedData,
    }) => {
      console.log("selected", selectedCard);
      const [showMore, setShowMore] = useState(false);

      const handleToggleShowMore = () => {
        setShowMore(!showMore);
      };

      const handleActive = () => {
        setActiveTitle(title);
        dispatch(setPopUpTitle(title));
        dispatch(setActionName("activate"));
        dispatch(setCloseBtnName("Cancel"));
        dispatch(setSubmitBtnName("Submit"));
        dispatch(setIsPopUpShow(true));
        if (title === "google_calendar") {
          dispatch(setPopUpTitle(title));
          dispatch(setActionName("google_calendar"));
          dispatch(setCloseBtnName("No"));
          dispatch(setSubmitBtnName("Yes"));
        }
        if (title === "jira") {
          dispatch(setPopUpTitle(title));
          dispatch(setActionName("jira"));
          dispatch(setCloseBtnName("No"));
          dispatch(setSubmitBtnName("Yes"));
        }
        if (title === "salesforce") {
          dispatch(setPopUpTitle(title));
          dispatch(setActionName("salesforce"));
          dispatch(setCloseBtnName("No"));
          dispatch(setSubmitBtnName("Yes"));
        }
      };
      const handleDeactivate = () => {
        setActiveTitle(title);
        dispatch(setPopUpTitle(title));
        dispatch(setActionName("deactivate"));
        dispatch(setCloseBtnName("No"));
        dispatch(setSubmitBtnName("Yes"));
        dispatch(setIsPopUpShow(true));
      };

      const renderFeatures = () => (
        <>
          {features.slice(0, 2).map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
          {showMore &&
            features
              .slice(2)
              .map((feature, index) => <li key={index + 2}>{feature}</li>)}
        </>
      );

      console.log(" setActiveStatus(isActivated)", isActivated)

      return (
        <Col xs={24} sm={12} md={8} className="card-section">
          <Card className="custom-card">
            <div className="header">
              <div className="logo-container">
                <div className={activeTab === "2" ? "logo-org" : "logo"}>
                  <Avatar src={logoMapping[title] || ""} />
                </div>
                {showSwitch && (
                  <div className={selectedCard?.activated ?"switch-activated-container":"switch-container"}>
                    <Switch
                    className={selectedCard?.activated ? 'switch-activated' : ''}
                      onClick={() => {
                        dispatch(setSelectedOption(selectedCard));
                        handleSwitchToggle(
                          selectedCard?.name,
                          selectedCard?.activated
                        );
                      }}
                      checked={!!selectedCard?.activated}
                    />
                  </div>
                )}
              </div>
              <div className="brand-name">{title}</div>
              <div className="tagline">
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </div>
            </div>
            <div className="descriptions">
              <ul>{renderFeatures()}</ul>
              {features.length > 2 && (
                <Button type="link" onClick={handleToggleShowMore}>
                  {showMore ? "Show Less" : "More..."}
                </Button>
              )}
            </div>
            <div className="footer">
              {isActivated ? (
                <Button onClick={()=>{
                  setActiveStatus(isActivated)
                  handleDeactivate()
                  }}>
                  {isActivated && "Deactivate"}
                </Button>
              ) : (
                <Button onClick={()=>{
                  setActiveStatus(isActivated)
                  handleActive()
                  }}>
                  {!isActivated && "Activate"}
                </Button>
              )}
              <Button onClick={() => {dispatch(setIntegrationDrawerOpen(true));
                dispatch(setSelectedOption(selectedCard))
              }}>Kick-Starter</Button>
            </div>
          </Card>
        </Col>
      );
    }
  );

  const groupByCategory = (list = []) => {
    if (!Array.isArray(list)) {
      return {}; // Return an empty object if list is not an array
    }

    return list?.reduce((acc, item) => {
      const category = item?.category || "Uncategorized"; // Handle cases where item.category is undefined or null
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };
console.log("activateststaus", activeStatus)
  const renderIntegrationCards = (integrationList, showSwitch) => {
    const groupedIntegrations = groupByCategory(integrationList);

    if (!groupedIntegrations) {
      return null;
    }

    return Object.keys(groupedIntegrations)?.map((category) => (
      <div key={category}>
        <h2>{category}</h2>
        <Row gutter={[16, 16]} className="cards-container">
          {groupedIntegrations[category].map((card, index) => (
            <IntegrationCard
              key={index}
              title={card.name}
              link={card.website}
              features={card.actions}
              showSwitch={showSwitch}
              isActivated={card.isActivated}
              selectedCard={card}
              activatedData={() => setSelectedOrg(card?.ativated)}
            />
          ))}
        </Row>
      </div>
    ));
  };

  const renderOrganizationCards = (orgIntegrationList, showSwitch) => {
    const groupedIntegrations = groupByCategory(orgIntegrationList);

    if (!groupedIntegrations) {
      return null;
    }

    return Object?.keys(groupedIntegrations).map((category) => (
      <div key={category}>
        <h2>{category}</h2>
        <Row gutter={[16, 16]} className="cards-container">
          {groupedIntegrations[category].map((card, index) => (
            <IntegrationCard
              key={index}
              title={card.name}
              link={card.website}
              features={card.actions}
              showSwitch={showSwitch}
              isActivated={card.isActivated}
              selectedCard={card}
              activatedData={() => setSelectedOrg(card?.ativated)}
            />
          ))}
        </Row>
      </div>
    ));
  };

  const popUpContent = () => {
    if (actionName === "activate") {
      if (activeTitle === "keka") {
        return (
          <div className="pop-up-content">
            <div>Refresh Token</div>
            <Input
              size="large"
              placeholder="Enter Refresh Token"
              prefix={<KeyOutlined />}
              value={refreshToken}
              onChange={(e) => dispatch(setRefreshToken(e.target.value))}
            />
          </div>
        );
      } else if (activeTitle === "darwinbox") {
        return (
          <div className="pop-up-content">
            <div>Employee ID</div>
            <Input
              size="large"
              placeholder="Enter Employee ID"
              prefix={<UserOutlined />}
              value={employeeId}
              onChange={(e) => dispatch(setEmployeeId(e.target.value))}
            />
          </div>
        );
      } else if (activeTitle === "dbf")
        return (
          <div className="pop-up-content">
            <div>Email</div>
            <Input
              size="large"
              type="email"
              placeholder="Enter User Email"
              prefix={<UserOutlined />}
              value={user.email}
              onChange={(e) => dispatch(setUser({ email: e.target.value }))}
            />
            <div>Password</div>
            <Input
              size="large"
              type="password"
              placeholder="Enter Password"
              prefix={<KeyOutlined />}
              value={user.password}
              onChange={(e) => dispatch(setUser({ password: e.target.value }))}
            />
          </div>
        );
      else if (activeTitle === "telegram")
        return (
          <div className="pop-up-content">
            <div>Telegram Id</div>
            <Input
              size="large"
              placeholder="Enter Telegram Id"
              prefix={<UserOutlined />}
              value={telegramId}
              onChange={(e) => dispatch(setTelegramId(e.target.value))}
            />
          </div>
        );
      else if (
        activeTitle === "google_calendar" ||
        activeTitle === "jira" ||
        activeTitle === "salesforce"
      )
        return (
          <div className="confirm-text">
            You want to activate? {<div>{activeTitle}</div>}
          </div>
        );
      return null;
    } else if (selectedOptionData?.name === "telegram") {
      return <div className="pop-up-content">
      <div>Telegram Token</div>
      <Input
        size="large"
        placeholder="Enter Telegram Token"
        prefix={<KeyOutlined />}
        value={telegramToken}
        onChange={(e) => dispatch(setTelegramToken(e.target.value))}
      />
    </div>
    } else {
      return (
        <div className="confirm-text">
          Are you sure you want to {activeStatus?  "deacivate" : "activate"} ? {<div>{activeTitle}</div>}
        </div>
      );
    }
  };
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    if (activeTab === "1") {
      dispatch(getIntegrationsData(navigate));
    } else {
      dispatch(getOrgIntegrationsData(navigate));
    }
  }, [activeTab, dispatch, navigate, selectedOptionData]);

  const integrationCards = useMemo(() => {
    const showSwitch = activeTab === "2";
    return activeTab === "1"
      ? renderIntegrationCards(integrationList, showSwitch)
      : renderOrganizationCards(orgIntegrationList, showSwitch);
  }, [activeTab, integrationList, orgIntegrationList]);

  return (
    <Layout className="chat-layout">
      <TopHeader
        isTitle={true}
        isRightContent={false}
        title="Integration"
        icon={<DeploymentUnitOutlined className="icon-size text-white" />}
      />
      <Content className="integration-content">
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab="Your Apps" key="1">
            {loader ? <SpinLoader/> : integrationCards}
          </TabPane>
          <TabPane tab="Organization Apps" key="2">
            {loader ? <SpinLoader/> : integrationCards}
          </TabPane>
        </Tabs>
      </Content>
      <DialogBox onSubmit={handleTelegramActivate} renderUi={popUpContent} />
      <Confirmation
        onClose={handleCancel}
        isRemove={false}
        onSubmit={handleActivateSwitch}
      />
      <IntegrationDrawer/>
    </Layout>
  );
};
