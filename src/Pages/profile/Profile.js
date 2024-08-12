import React, { useEffect, useState } from "react";
import {
  Layout,
  Form,
  Input,
  Button,
  Upload,
  Tabs,
  Row,
  Col,
  Avatar,
  Select,
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./profile.scss";
import TopHeader from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileDetails,
  setProfileLoading,
  updateProfileDetails,
} from "../../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import { IntegrationContent } from "./IntegrationCotent";
import SpinLoader from "../../components/Loader/SpinLoader";

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

export const Profile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, profileLoading } = useSelector((state) => state.profileReducer);
  const [imageUrl, setImageUrl] = useState(
    user?.picture || "default-profile-image-url"
  );

  useEffect(() => {
    dispatch(getProfileDetails());
    dispatch(setProfileLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        gender: user.gender,
        experience: user.experience,
        contactNo: user.contactNo,
      });
      setImageUrl(user.picture || "default-profile-image-url");
    }
  }, [user, form]);

  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values) => {
    const body = {
      gender: values.gender,
      experience: values.experience,
      contactNo: values.contactNo,
      picture: imageUrl,
    };

    try {
      dispatch(updateProfileDetails({ body: body, navigate: navigate }));
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <Layout className="chat-layout">
      <TopHeader
        isTitle={true}
        isRightContent={false}
        title="Profile"
        icon={<UserOutlined className="icon-size text-white" />}
      />
      <Content className="app-content">
        {profileLoading && <SpinLoader />}
        <Form
          form={form}
          layout="vertical"
          className="profile-form"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col xs={24} sm={8} className="profile-image-col">
            <div className="profile-name">{user?.name}</div>
              <Avatar size={128} src={imageUrl} className="profile-avatar" />
              <Upload
                showUploadList={false}
                customRequest={handleUpload}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />} className="upload-button">
                  Upload Profile Image
                </Button>
              </Upload>
            </Col>

            <Col xs={24} sm={16}>
              <Row className="fields-section">
                <Col xs={24} sm={11}>
                  <Form.Item label="Email" name="email">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Gender" name="gender">
                    <Select>
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">others</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Experience" name="experience">
                    <Select>
                      <Option value="Freshers">Freshers</Option>
                      <Option value="1 year">1 year</Option>
                      <Option value="2 years">2 years</Option>
                      <Option value="3 years">3 years</Option>
                      <Option value="4 years">4 years</Option>
                      <Option value="5 years">5 years</Option>
                      <Option value="6 years">6 years</Option>
                      <Option value="7 years">7 years</Option>
                      <Option value="8 years">8 years</Option>
                      <Option value="9 years">9 years</Option>
                      <Option value="10 years">10 years</Option>
                      <Option value="10+ years">10+ years</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Contact No." name="contactNo">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <div className="button-group">
                <Button type="primary" htmlType="submit" className="reset-btn">
                  Save
                </Button>
                <Button
                  className="reset-btn"
                  onClick={() => {
                    const currentEmail = form.getFieldValue("email");
                    form.resetFields();
                    form.setFieldsValue({ email: currentEmail });
                  }}
                >
                  Reset Profile
                </Button>

              </div>
              <IntegrationContent />
            </Col>
          </Row>
        </Form>
      </Content>
    </Layout>
  );
};
