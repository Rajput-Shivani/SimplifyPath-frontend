import React, { useEffect, useState } from "react";
import {
  Layout,
  Dropdown,
  Button,
  Menu,
  Form,
  Typography,
  Row,
  Col,
  Space,
  Select,
} from "antd";
import {
  DownOutlined,
  ProfileFilled,
  RightOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import "./custom.scss";
import TopHeader from "../../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustom_Action } from "../../../redux/slices/trainAndContentSlice";
import { useNavigate } from "react-router-dom";
import {
  setCategoryInternalData,
  setPromptsData,
  setSelectedOption,
} from "../../../redux/slices/globalSlice";
import Loading from "../../../components/Loader/Loading";

const { Content } = Layout;
const { Text } = Typography;

export const Custom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { renderallCustomAction, loading } = useSelector(
    (state) => state.trainAndContentReducer
  );
  const {
    page,
    searchInput,
    selectedOptionData,
    categroryInternalData,
    promptsData,
  } = useSelector((state) => state.globalReducer);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [openChildren, setOpenChildren] = useState(false);

  // Handle dropdown open/close state
  const handleDropdownClick = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
    setOpenSubmenu(null); // Reset submenu when main menu changes
  };

  // Handle submenu open/close state
  const handleSubmenuClick = (actionKey) => {
    setOpenSubmenu(openSubmenu === actionKey ? null : actionKey);
  };

  useEffect(() => {
    dispatch(
      getAllCustom_Action({
        searchQuery: searchInput || "",
        navigate: navigate,
      })
    );
  }, []);

  console.log(
    "renderallCustomAction",
    renderallCustomAction,
    "opechi",
    openChildren,
    "selectedOptionData",
    selectedOptionData,
    "categroryInternalData",
    categroryInternalData,
    "promtsdata",
    promptsData
  );

  return (
    <Layout className="custom-layout">
      <TopHeader
        isTitle={true}
        isRightContent={false}
        title="Custom API Mapping"
        icon={<UsergroupAddOutlined className="icon-size text-white" />}
      />
      <Content className="custom-content">
        <div className="left-panel">
          <div className="categories-title">Current Categories</div>
          <div className="categories">
            {/* put here dropdown */}
{
  loading ? <Loading/> :
  <>
   {renderallCustomAction?.map((category) => {
              const options = Object.keys(category?.actions);

              const menu = (
                <Menu className="subKeys-wrapper">
                  {options?.map((key) => {
                    const subOptions = category.actions[key];
                    const hasSubOptions =
                      subOptions && typeof subOptions === "object";

                    return (
                      <Menu.SubMenu
                        key={key}
                        className="category-subKeys"
                        title={<span>{key}</span>}
                        popupClassName="submenu-popup"
                        popupOffset={[0, 0]}
                        onTitleClick={() => handleSubmenuClick(key)}
                        openKeys={openSubmenu === key ? [key] : []}
                      >
                        {hasSubOptions && (
                          <Menu>
                            {Object.keys(subOptions)?.map((subKey) => {
                              // Retrieve the specific apiData
                              const internalData = subOptions[subKey]?.apiData;
                              const promptsData = subOptions[subKey]?.prompts;

                              return (
                                <Menu.Item
                                  onClick={() => {
                                    dispatch(setSelectedOption(category));
                                    dispatch(
                                      setCategoryInternalData(internalData)
                                    );
                                    dispatch(setPromptsData(promptsData));
                                  }}
                                  key={subKey}
                                  className="category-subKeys-bottom"
                                >
                                  {subKey}
                                </Menu.Item>
                              );
                            })}
                          </Menu>
                        )}
                      </Menu.SubMenu>
                    );
                  })}
                </Menu>
              );

              return (
                <Dropdown
                  key={category?.category}
                  overlay={menu}
                  trigger={["click"]}
                  visible={openDropdown === category?.category}
                  onVisibleChange={() =>
                    handleDropdownClick(category?.category)
                  }
                  placement="bottom"
                >
                  <Button
                    onClick={() => handleDropdownClick(category?.category)}
                    style={{ width: "100%" }}
                    iconPosition="end"
                    size="large"
                    className="categories-dropdown full-width"
                  >
                    <div className="display-flex-space-between full-width">
                      <div>{category?.category}</div>
                      <div>
                        <DownOutlined />
                      </div>
                    </div>
                  </Button>
                </Dropdown>
              );
            })}
  </>

}
           
          </div>
        </div>

        <div className="right-panel">
          <div className="apply-leave">Apply Leave</div>
          <Form
            name="apply_leave"
            layout="vertical"
            initialValues={{ remember: true }}
            className="apply-leave-form"
          >
            <Row gutter={16}>
              {selectedOptionData?.category && (
                <Col xs={24} sm={12}>
                  <Form.Item label="Category Name" name="categoryName">
                    <Text className="right-panel-promots-button">
                      {selectedOptionData?.category}
                    </Text>
                  </Form.Item>
                </Col>
              )}
              {categroryInternalData?.method && (
                <Col xs={24} sm={12}>
                  <Form.Item label="Method" name="method">
                    <Text className="right-panel-promots-button">
                      {categroryInternalData?.method}
                    </Text>
                  </Form.Item>
                </Col>
              )}
            </Row>

            <Row gutter={16}>
              {categroryInternalData?.url && (
                <Col span={24}>
                  <Form.Item label="URL" name="url">
                    <Text className="right-panel-promots-button">
                      {categroryInternalData?.url}
                    </Text>
                  </Form.Item>
                </Col>
              )}
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label={
                    !promptsData || promptsData?.length === 0 ? null : "Promots"
                  }
                  name="prompts"
                >
                  {!promptsData || promptsData?.length === 0 ? null : (
                    <>
                      {promptsData?.map((prompt, index) => (
                        <Text
                          key={index}
                          className="right-panel-promots-button"
                        >
                          {prompt}
                        </Text>
                      ))}
                    </>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};
