import React, { useEffect, useState, useMemo } from "react";
import {
  Layout,
  Form,
  Input,
  Button,
  Upload,
  Row,
  Col,
  Avatar,
  Select,
  Spin,
} from "antd";
import { LoadingOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons";
import "./profile.scss";
import TopHeader from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileDetails,
  updateProfileDetails,
} from "../../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import { IntegrationContent } from "./IntegrationCotent";
import SpinLoader from "../../components/Loader/SpinLoader";
import { experienceOptions, genderOptions } from "../../utils/constants";
import Loading from "../../components/Loader/Loading";

const { Content } = Layout;
const { Option } = Select;

export const Profile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, profileLoading } = useSelector((state) => state.profileReducer);
  const defaultImage = "default-profile-image-url";
  
  const [imageUrl, setImageUrl] = useState(defaultImage);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        email: user.email,
        gender: user.gender,
        experience: user.experience,
        contactNo: user.contactNo,
      });
      setImageUrl(user.picture || defaultImage);
    }
  }, [user, form, defaultImage]);

  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.onerror = (err) => {
      console.error("Failed to read file:", err);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit =  (values) => {
    const body = {
      gender: values.gender,
      experience: values.experience,
      contactNo: values.contactNo,
      picture: imageUrl,
    };

    try {
       dispatch(updateProfileDetails({ body, navigate }));
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleReset = () => {
    const currentEmail = form.getFieldValue("email");
    form.resetFields();
    form.setFieldsValue({ email: currentEmail });
  };

  const genderSelectOptions = useMemo(() => (
    genderOptions.map(({ value, label }) => (
      <Option key={value} value={value}>
        {label}
      </Option>
    ))
  ), []);

  const experienceSelectOptions = useMemo(() => (
    experienceOptions.map((exp) => (
      <Option key={exp} value={exp}>
        {exp}
      </Option>
    ))
  ), []);

  useEffect(() => {
    dispatch(getProfileDetails());
  }, []);

  return (
    <Layout className="chat-layout">
      <TopHeader
        isTitle={true}
        isRightContent={false}
        title="Profile"
        icon={<UserOutlined className="icon-size text-white" />}
      />
      <Content className="app-content">
        <Form
          form={form}
          layout="vertical"
          className="profile-form"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col xs={24} sm={8} className="profile-image-col">
              <div className="profile-name">{user?.name}</div>
              <Avatar size={128} src={profileLoading ? <Spin indicator={<LoadingOutlined spin />} size="large" /> : imageUrl} className="profile-avatar" />
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
              {
                profileLoading ?
                <Loading/>
                :
                <Row className="fields-section">
                <Col xs={24} sm={11}>
                  <Form.Item label="Email" name="email">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Gender" name="gender">
                    <Select>{genderSelectOptions}</Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Experience" name="experience">
                    <Select>{experienceSelectOptions}</Select>
                  </Form.Item>
                  <Form.Item label="Contact No." name="contactNo">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              }
              <div className="button-group">
                <Button type="primary" htmlType="submit" className="reset-btn">
                  Save
                </Button>
                <Button className="reset-btn" onClick={handleReset}>
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
