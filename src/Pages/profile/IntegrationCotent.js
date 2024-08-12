// import React, { useEffect, useState } from "react";
// import {
//   Layout,
//   Form,
//   Input,
//   Button,
//   Upload,
//   Tabs,
//   Row,
//   Col,
//   Avatar,
//   Select,
//   List,
//   Skeleton,
//   Tag,
//   Pagination,
// } from "antd";
// import {
//   UploadOutlined,
//   SearchOutlined,
//   LinkOutlined,
//   DownloadOutlined,
//   UserOutlined,
//   CopyOutlined,
// } from "@ant-design/icons";
// import "./profile.scss";
// import TopHeader from "../../components/header/Header";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getProfileDetails,
//   updateProfileDetails,
// } from "../../redux/slices/profileSlice";
// import { useNavigate } from "react-router-dom";

// import jira from "../../assets/Jira.svg";
// import googleCalender from "../../assets/googleCalender.png";
// import salesForce from "../../assets/Saleforce.png";
// import keka from "../../assets/keka.png";
// import darwinbox from "../../assets/darwin.png";
// import dbf from "../../assets/dbf.png";
// import Telegram from "../../assets/Telegram.png";
// import { getAllUploadedDocumentsProfile } from "../../redux/slices/trainAndContentSlice";
// import { setPage, setSearchITerm } from "../../redux/slices/globalSlice";
// import SearchInput from "../../components/Search/SearchInput";

// const { Content } = Layout;
// const { TabPane } = Tabs;
// const { Option } = Select;

// export const IntegrationContent = () => {
//   const [form] = Form.useForm();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.profileReducer);
//   const { allDocument } = useSelector((state) => state.trainAndContentReducer);
//   const [imageUrl, setImageUrl] = useState(
//     user?.picture || "default-profile-image-url"
//   );

//   const {
//     page,
//     limit,
//     searchItem,
//     sortConfig,
//     searchInput,
//     selectedOptionData,
//     totalPage,
//     searchTerm
//   } = useSelector((state) => state.globalReducer);

//   const getDocumentsData=()=>{
//     dispatch(
//         getAllUploadedDocumentsProfile({
//           page: page,
//           limit: limit,
//           navigate: navigate,
//           searchQuery: searchInput || "",
//         })
//       );
//   }

//   useEffect(() => {
//     dispatch(getProfileDetails());
//     dispatch(
//       getAllUploadedDocumentsProfile({
//         page: page,
//         limit: limit,
//         navigate: navigate,
//         searchQuery: searchInput || "",
//       })
//     );
//   }, [dispatch]);

//   console.log("all documents", allDocument);

//   const handleSearch=()=>{
//     dispatch(
//         getAllUploadedDocumentsProfile({
//           page: page,
//           limit: limit,
//           navigate: navigate,
//           searchQuery: searchTerm || "",
//         })
//       );
//   }

//   useEffect(()=>{
//     if(!searchTerm || searchTerm?.length === 0){
//         dispatch(setSearchITerm(""))
//         getDocumentsData()
//     }
// },[searchTerm])

//   return (
//     <Content className="app-content integration-content-wrapper">
//       <Form form={form} layout="vertical" className="profile-form">
//         <Row gutter={16} style={{ width: "100%" }}>
//           <Col xs={24}>
//             <Row>
//               <Tabs
//                 defaultActiveKey="1"
//                 style={{ marginTop: "24px", width: "100%" }}
//               >
//                 <TabPane tab="Integration" key="1">
//                   {/* Integration content */}
//                   <div className="list-container">
//                     <List
//                       className="demo-loadmore-list"
//                       itemLayout="horizontal"
//                       dataSource={user?.integrations}
//                       renderItem={(item) => {
//                         let avatar =
//                           item?.name === "google_calendar"
//                             ? googleCalender
//                             : item?.name === "darwinbox"
//                             ? darwinbox
//                             : item?.name === "jira"
//                             ? jira
//                             : item?.name === "salesforce"
//                             ? salesForce
//                             : item?.name === "keka"
//                             ? keka
//                             : item?.name === "dbf"
//                             ? dbf
//                             : item?.name === "telegram" && Telegram;
//                         return (
//                           <List.Item
//                             actions={[
//                               <Tag color="purple" key="list-loadmore-more">
//                                 {item?.website}
//                               </Tag>,
//                             ]}
//                           >
//                             <List.Item.Meta
//                               avatar={<Avatar src={avatar} />}
//                               title={<div>{item?.name}</div>}
//                               description={item?.description}
//                             />
//                           </List.Item>
//                         );
//                       }}
//                     />
//                   </div>
//                 </TabPane>
//                 <TabPane tab="Uploaded Documents" key="2">
//                   <Row gutter={16}>
//                     <Col span={14}></Col>
//                     <Col span={10}>
//                       <SearchInput onSearch={handleSearch} apiCall={getDocumentsData} />
//                     </Col>
//                   </Row>
//                   <div>
//                     <div className="list-container">
//                       <List
//                         className="demo-loadmore-list"
//                         itemLayout="horizontal"
//                         dataSource={allDocument?.data}
//                         renderItem={(item) => {
//                           let currentIcon =
//                             item?.type === "url" ? (
//                               <CopyOutlined />
//                             ) : (
//                               <DownloadOutlined />
//                             );
//                           return (
//                             <List.Item
//                               actions={[
//                                 <Tag color="purple" key="list-loadmore-more">
//                                   {currentIcon}
//                                 </Tag>,
//                               ]}
//                             >
//                               <List.Item.Meta
//                                 title={<div>{item?.fileName}</div>}
//                                 description={item?.description}
//                               />
//                             </List.Item>
//                           );
//                         }}
//                       />
//                     </div>
//                     <Pagination
//                       current={page}
//                       pageSize={limit}
//                       total={totalPage} // Total number of documents for pagination
//                       onChange={(page, pageSize) => {
//                         dispatch(setPage(page));
//                         dispatch(
//                           getAllUploadedDocumentsProfile({
//                             page: page,
//                             limit: limit,
//                             navigate: navigate,
//                             searchQuery: searchInput || "",
//                           })
//                         );
//                       }}
//                       showSizeChanger={false}
//                       className="pagination"
//                     />
//                   </div>
//                 </TabPane>
//               </Tabs>
//             </Row>
//           </Col>
//         </Row>
//       </Form>
//     </Content>
//   );
// };

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

const { Content } = Layout;
const { TabPane } = Tabs;

export const IntegrationContent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profileReducer);
  const { allDocument } = useSelector((state) => state.trainAndContentReducer);
  const [imageUrl, setImageUrl] = useState(
    user?.picture || "default-profile-image-url"
  );

  const {
    page,
    limit,
    searchItem,
    sortConfig,
    searchInput,
    selectedOptionData,
    totalPage,
    searchTerm,
  } = useSelector((state) => state.globalReducer);

  const getDocumentsData = () => {
    dispatch(
      getAllUploadedDocumentsProfile({
        page: page,
        limit: limit,
        navigate: navigate,
        searchQuery: searchInput || "",
      })
    );
  };

  useEffect(() => {
    dispatch(getProfileDetails());
    dispatch(
      getAllUploadedDocumentsProfile({
        page: page,
        limit: limit,
        navigate: navigate,
        searchQuery: searchInput || "",
      })
    );
  }, [dispatch]);

  console.log("all documents", allDocument);

  const handleSearch = () => {
    dispatch(setPage(1))
    dispatch(
      getAllUploadedDocumentsProfile({
        page: 1,
        limit: limit,
        navigate: navigate,
        searchQuery: searchTerm || "",
      })
    );
  };

  useEffect(() => {
    if (!searchTerm || searchTerm?.length === 0) {
      dispatch(setSearchITerm(""));
      getDocumentsData();
    }
  }, [searchTerm]);

//   const handleDownload = (url) => {
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = true; // Assuming the server supports this
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

const handleDownload = async (fileUrl, fileName) => {
    let modifiedFileName = fileName;
    if (fileName.includes(".txt")) {
      modifiedFileName = fileName.replace(/\.(txt)$/i, ".pdf");
    }
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
      console.error("Error downloading PDF:", error);
      toast.update(downloadingToastId, {
        render: "Error downloading PDF!",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };


  const handleCopy = (url) => {
    console.log("url", url)
    navigator.clipboard.writeText(url).then(() => {
      message.success("Copied to clipboard!");
    });
  };

  return (
    <Content className="app-content integration-content-wrapper">
      <Form form={form} layout="vertical" className="profile-form">
        <Row gutter={16} style={{ width: "100%" }}>
          <Col xs={24}>
            <Row>
              <Tabs
                defaultActiveKey="1"
                style={{ marginTop: "24px", width: "100%" }}
              >
                <TabPane tab="Integration" key="1">
                  {/* Integration content */}
                  <div className="list-container">
                    <List
                      className="demo-loadmore-list"
                      itemLayout="horizontal"
                      dataSource={user?.integrations}
                      renderItem={(item) => {
                        let avatar =
                          item?.name === "google_calendar"
                            ? googleCalender
                            : item?.name === "darwinbox"
                            ? darwinbox
                            : item?.name === "jira"
                            ? jira
                            : item?.name === "salesforce"
                            ? salesForce
                            : item?.name === "keka"
                            ? keka
                            : item?.name === "dbf"
                            ? dbf
                            : item?.name === "telegram" && Telegram;
                        return (
                          <List.Item
                            actions={[
                              <Tag color="purple" key="list-loadmore-more">
                                {item?.website}
                              </Tag>,
                            ]}
                          >
                            <List.Item.Meta
                              avatar={<Avatar src={avatar} />}
                              title={<div>{item?.name}</div>}
                              description={item?.description}
                            />
                          </List.Item>
                        );
                      }}
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
                  <div>
                    <div className="list-container">
                      <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={allDocument?.data}
                        renderItem={(item) => {
                            const renderName =  item?.type === "url" ? item.urlLink : item.fileName;
                          return (
                            <List.Item
                              actions={[
                                <>
                                  {item?.type === "url" ? (
                                    <Tooltip title="Copy link">
                                      <Tag
                                        color="purple"
                                        key="copy-icon"
                                        onClick={() => handleCopy(item?.urlLink)}
                                      >
                                        <CopyOutlined />
                                      </Tag>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip title="Download file">
                                      <Tag
                                        color="purple"
                                        key="download-icon"
                                        onClick={() => handleDownload(item.location, item.fileName)}
                                      >
                                        <DownloadOutlined />
                                      </Tag>
                                    </Tooltip>
                                  )}
                                </>,
                              ]}
                            >
                              <List.Item.Meta
                                title={<div> {renderName.replace(/\.(pdf|txt|doc)$/, "") ||
                                  renderName}</div>}
                                description={item?.description}
                              />
                            </List.Item>
                          );
                        }}
                      />
                    </div>
                    <Pagination
                      current={page}
                      pageSize={limit}
                      total={totalPage} // Total number of documents for pagination
                      onChange={(page, pageSize) => {
                        dispatch(setPage(page));
                        dispatch(
                          getAllUploadedDocumentsProfile({
                            page: page,
                            limit: limit,
                            navigate: navigate,
                            searchQuery: searchInput || "",
                          })
                        );
                      }}
                      showSizeChanger={false}
                      className="pagination"
                    />
                  </div>
                </TabPane>
              </Tabs>
            </Row>
          </Col>
        </Row>
      </Form>
    </Content>
  );
};
