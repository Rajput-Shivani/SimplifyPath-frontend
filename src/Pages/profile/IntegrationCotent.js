import React, { useEffect, useState } from "react";
import {
  Layout,
  Form,
  Row,
  Col,
  Avatar,
  List,
  Tag,
  Pagination,
  Tooltip,
  message,
  Tabs,
} from "antd";
import { CopyOutlined, DownloadOutlined } from "@ant-design/icons";
import "./profile.scss";
import TopHeader from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileDetails,
  updateProfileDetails,
} from "../../redux/slices/profileSlice";
import { useNavigate } from "react-router-dom";
import { getAllUploadedDocumentsProfile } from "../../redux/slices/trainAndContentSlice";
import { setPage, setSearchITerm } from "../../redux/slices/globalSlice";
import SearchInput from "../../components/Search/SearchInput";

import jira from "../../assets/Jira.svg";
import googleCalender from "../../assets/googleCalender.png";
import salesForce from "../../assets/Saleforce.png";
import keka from "../../assets/keka.png";
import darwinbox from "../../assets/darwin.png";
import dbf from "../../assets/dbf.png";
import Telegram from "../../assets/Telegram.png";
import { toast } from "react-toastify";
import AppSecureStorage from "../../services/secureStorage";

const { Content } = Layout;
const { TabPane } = Tabs;
const storage = new AppSecureStorage();

const avatarMap = {
  google_calendar: googleCalender,
  darwinbox: darwinbox,
  jira: jira,
  salesforce: salesForce,
  keka: keka,
  dbf: dbf,
  telegram: Telegram,
};

export const IntegrationContent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleData = storage.get("role");
  const { user, profileLoading } = useSelector((state) => state.profileReducer);
  const { allDocument, documentLoad } = useSelector(
    (state) => state.trainAndContentReducer
  );

  const { page, limit, searchTerm, searchInput, totalPage } = useSelector(
    (state) => state.globalReducer
  );

  const getDocumentsData = () => {
    dispatch(
      getAllUploadedDocumentsProfile({
        page,
        limit,
        navigate,
        searchQuery: searchInput || "",
      })
    );
  };

  useEffect(() => {
    dispatch(getProfileDetails());
    getDocumentsData();
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(setPage(1));
    dispatch(
      getAllUploadedDocumentsProfile({
        page: 1,
        limit,
        navigate,
        searchQuery: searchTerm || "",
      })
    );
  };

  useEffect(() => {
    if (!searchTerm?.length) {
      dispatch(setSearchITerm(""));
      getDocumentsData();
    }
  }, [searchTerm]);

  const handleDownload = async (fileUrl, fileName) => {
    const modifiedFileName = fileName.replace(/\.txt$/i, ".pdf");
    const downloadingToastId = toast.success("File Downloading...", {
      isLoading: true,
    });

    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = modifiedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.update(downloadingToastId, {
        render: "Download Completed!",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.update(downloadingToastId, {
        render: "Error downloading file!",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      message.success("Copied to clipboard!");
    });
  };

  return (
    <Content className="app-content integration-content-wrapper">
      <Form form={form} layout="vertical" className="profile-form">
        <Row gutter={16} style={{ width: "100%" }}>
          <Col xs={24}>
            <Tabs
              defaultActiveKey="1"
              style={{ marginTop: "24px", width: "100%" }}
            >
              <TabPane tab="Integration" key="1">
                <div className="list-container">
                  <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={user?.integrations}
                    loading={profileLoading}
                    renderItem={(item) => (
                      <List.Item
                        actions={[<Tag color="purple">{item?.website}</Tag>]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={avatarMap[item?.name]} />}
                          title={<div>{item?.name}</div>}
                          description={item?.description}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </TabPane>
              <TabPane tab="Uploaded Documents" key="2">
                <Row gutter={16} className="search-input-profile">
                  <Col>
                    <SearchInput
                      onSearch={handleSearch}
                      apiCall={getDocumentsData}
                      placeholder={"Search by fileName & urlLink"}
                    />
                  </Col>
                </Row>
                <div className="list-container">
                  <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={allDocument?.data?.filter((item) =>
                      item?.role?.includes(roleData)
                    )}
                    loading={documentLoad}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Tooltip
                            title={
                              item?.type === "url"
                                ? "Copy link"
                                : "Download file"
                            }
                          >
                            <Tag
                              color="purple"
                              onClick={() =>
                                item?.type === "url"
                                  ? handleCopy(item?.urlLink)
                                  : handleDownload(item.location, item.fileName)
                              }
                            >
                              {item?.type === "url" ? (
                                <CopyOutlined />
                              ) : (
                                <DownloadOutlined />
                              )}
                            </Tag>
                          </Tooltip>,
                        ]}
                      >
                        <List.Item.Meta
                          title={
                            <div>
                              {item.fileName.replace(/\.(pdf|txt|doc)$/, "")}
                            </div>
                          }
                          description={item?.description}
                        />
                      </List.Item>
                    )}
                  />
                  <Pagination
                    current={page}
                    pageSize={limit}
                    total={totalPage}
                    onChange={(page) => {
                      dispatch(setPage(page));
                      getDocumentsData();
                    }}
                    showSizeChanger={false}
                    className="pagination"
                  />
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Form>
    </Content>
  );
};
