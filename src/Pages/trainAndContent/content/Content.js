import React, { useEffect, useState } from "react";
import { Layout, Button, Radio, Row, Col, Pagination, List, Spin, Card, Tag } from "antd";
import {
  FileTextOutlined,
  LinkOutlined,
  FilePdfOutlined,
  ProfileFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import "./content.scss";
import TopHeader from "../../../components/header/Header";
import TrainAndContentPopup from "../DialogBox/TrainAndContentPopup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllUploadedDocuments,
  removePDF,
  setSelectedTrainStatus,
} from "../../../redux/slices/trainAndContentSlice";
import {
  setCategoryInternalData,
  setConfirmationContent,
  setConfirmationData,
  setConfirmationTitle,
  setIsConfirmation,
  setPage,
  setSelectedOption,
} from "../../../redux/slices/globalSlice";
import Confirmation from "../../../components/dialog/Confirmation";
import { Notification } from "../firebaseNotification/Notification";
import {
  isTrainAndContentAdd,
  isTrainAndContentNotification,
  isTrainAndContentDelete,
} from "../../../utils/permissions";
import Loading from "../../../components/Loader/Loading";

const { Content } = Layout;

export const TrainAndContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isTrainContentPopup, setIsTrainContentPopup] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const { page, limit, searchInput, selectedOptionData, totalPage } =
    useSelector((state) => state.globalReducer);
  const { selectedTrainStatus, allDocument, loading } = useSelector(
    (state) => state.trainAndContentReducer
  );

  const trainContentOpen = () => {
    setIsTrainContentPopup(true);
  };

  const getDocuments = (type) => {
    dispatch(
      getAllUploadedDocuments({
        page: page,
        limit: limit,
        type: type,
        navigate: navigate,
        searchQuery: searchInput || "",
      })
    ).then((action) => {
      const { payload } = action;
      if (payload && payload.data && payload.data.length > 0) {
        const firstDocument = payload.data[0];
        dispatch(setSelectedOption(firstDocument));
        setSelectedRadio(firstDocument._id);
      }
    });
  };

  useEffect(() => {
    getDocuments(selectedTrainStatus);
  }, []);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    getDocuments(selectedTrainStatus);
  };

  const isConfirmation = (record) => {
    dispatch(setConfirmationContent("Are you sure you want to delete"));
    dispatch(setConfirmationData(record?.fileName));
    dispatch(setConfirmationTitle(`Remove Training Data`));
    dispatch(setIsConfirmation(true));
  };

  const handleRemoveContent = () => {
    dispatch(
      removePDF({
        id: selectedOptionData?._id,
        page: page,
        limit: limit,
        fileType: selectedOptionData?.type,
        navigate: navigate,
        searchQuery: searchInput || "",
      })
    );
    dispatch(setIsConfirmation(false));
  };

  const handleRadioChange = (e, list) => {
    setSelectedRadio(list._id);
    dispatch(setSelectedOption(list));
  };

  return (
    <Layout className="custom-layout">
      <TopHeader
        isTitle={true}
        isRightContent={false}
        title="Train from content"
        icon={<ProfileFilled className="icon-size text-white" />}
      />
      <Content className="content-panel">
        <div className="train-content">
          <div className="train-left">
            {isTrainAndContentAdd && (
              <Button
                onClick={trainContentOpen}
                className="add-training-data-btn"
              >
                Add Training Data
              </Button>
            )}
            <div className="train-form">
              <Button
                style={{ width: "100%" }}
                size="large"
                type={selectedTrainStatus === "text" ? "primary" : "default"}
                icon={<FileTextOutlined />}
                onClick={() => {
                  dispatch(setSelectedTrainStatus("text"));
                  getDocuments("text");
                }}
                className="content-type-btn"
              >
                Text
              </Button>
              <Button
                size="large"
                style={{ width: "100%" }}
                type={selectedTrainStatus === "url" ? "primary" : "default"}
                icon={<LinkOutlined />}
                onClick={() => {
                  dispatch(setSelectedTrainStatus("url"));
                  getDocuments("url");
                }}
                className="content-type-btn"
              >
                URL
              </Button>
              <Button
                size="large"
                style={{ width: "100%" }}
                type={selectedTrainStatus === "pdf" ? "primary" : "default"}
                icon={<FilePdfOutlined />}
                onClick={() => {
                  dispatch(setSelectedTrainStatus("pdf"));
                  getDocuments("pdf");
                }}
                className="content-type-btn"
              >
                PDF
              </Button>
            </div>
            <div className="train-items">
              {loading ? (
                <Loading />
              ) : (
                <div className="train-items-scrollable">
                  {allDocument?.data?.map((list) => {
                    return (
                      <List key={list._id}>
                        <Row className="train-item">
                          <Col span={20}>
                            <Radio
                              checked={selectedRadio === list._id}
                              onChange={(e) => handleRadioChange(e, list)}
                            >
                              {list.fileName.replace(/\.(pdf|txt|doc)$/, "") ||
                                list.fileName}
                            </Radio>
                          </Col>
                          {isTrainAndContentDelete && (
                            <Col
                              onClick={() => {
                                dispatch(setSelectedOption(list));
                                isConfirmation(list);
                              }}
                              span={4}
                              className="train-item-btn"
                            >
                              <DeleteOutlined />
                            </Col>
                          )}
                        </Row>
                      </List>
                    );
                  })}
                </div>
              )}
              <div className="pagination-footer-content text-center">
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={totalPage}
                  onChange={(page, pageSize) => {
                    dispatch(setPage(page));
                    dispatch(
                      getAllUploadedDocuments({
                        page: page,
                        limit: pageSize,
                        type: selectedTrainStatus,
                        navigate: navigate,
                        searchQuery: searchInput || "",
                      })
                    );
                  }}
                  showSizeChanger={false}
                  className="pagination-content"
                />
              </div>
            </div>
          </div>
          <div className="train-right">
            <div className="preview-title">Preview</div>
            <div className="preview-content-panel">
              <div className="preview-content">
                {selectedOptionData?.type === "url" ? (
                  <Card>
                    {/* <LinkOutlined className="text-center" />
                    <div className="url-link">
                      {selectedOptionData?.urlLink}
                    </div> */}
                    <Tag
                      type="primary"
                      shape="round"
                      icon={<LinkOutlined />}
                      size={"large"}
                      color="blue"
                      className="url-link"
                    >
                      {selectedOptionData?.urlLink}
                    </Tag>
                  </Card>
                ) : (
                  <>
                    {loading ? (
                      <Loading />
                    ) : (
                      <iframe
                        className="preview-inner"
                        title="Preview"
                        src={selectedOptionData?.location}
                      ></iframe>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Content>
      <TrainAndContentPopup
        isOpen={isTrainContentPopup}
        setIsOpen={setIsTrainContentPopup}
      />
      <Confirmation isRemove={true} onRemove={handleRemoveContent} />
      {isTrainAndContentNotification && <Notification />}
    </Layout>
  );
};
