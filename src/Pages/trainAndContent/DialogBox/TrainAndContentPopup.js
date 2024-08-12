import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Collapse,
  Radio,
  Form,
  Input,
  Select,
  Upload,
  Tag,
} from "antd";
import { UploadOutlined, FilePdfOutlined, FileTextOutlined, LinkOutlined } from "@ant-design/icons";
import "./trainContent.scss"; // Assuming you have a separate SCSS file for custom styles
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRoles } from "../../../redux/slices/userManagementSlice";
import TextArea from "antd/es/input/TextArea";
import { setSelectedTrainStatus, uploadText } from "../../../redux/slices/trainAndContentSlice";
import PreviewPopup from "./PreviewPopup";

const { Panel } = Collapse;

const TrainAndContentPopup = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("1");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [textName, setTextName] = useState("");
  const [textDescp, setTextDesp] = useState("");
  const [urlName, setUrlName] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [isPreview, setIsPreview]=useState(false)
  const [activePayload, setIsActivePayload]= useState({})
  const [addDscription, setDescription]=useState("")
  const [pdfSelect, setPdfSelect] = useState(null); // Separate state for PDF upload

  const { getRolesData } = useSelector((state) => state.userManagementReducer);
  const { selectedTrainStatus } = useSelector(
    (state) => state.trainAndContentReducer
  );

  const {
    page,
    limit,
    searchInput,
  } = useSelector((state) => state.globalReducer);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setTextName("")
    setTextDesp("")
    setSelectedRoles([])
    setUrlLink("")
    setUrlName("")
    setPdfSelect(null)
    setFileName("")
  };

  const options = getRolesData?.data?.map((role) => ({
    value: role.name,
    label: role.name,
  }));

  // Handle file change but do not trigger any upload
 // Handle file change but do not trigger any upload
const handleFileChange = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      setFileName(file.name);
      setPdfSelect(file); // Store the actual file in the state
    } else {
      setFileName("");
      setPdfSelect(null);
    }
  };
  

  const items = [
    {
      key: "1",
      label: "TEXT",
      icon:<FileTextOutlined />,
      onClickContent: () => {
        dispatch(setSelectedTrainStatus("text"));
      },
      children: () => {
        return (
          <div>
            <Form.Item label="Enter Text file" layout="vertical">
              <Input
                placeholder="Enter Text file"
                name="textName"
                value={textName}
                onChange={(e) => setTextName(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Select Roles" layout="vertical">
              <Select
                size="large"
                mode="multiple"
                value={selectedRoles}
                onChange={(values) => setSelectedRoles(values)}
                style={{ width: "100%" }}
                options={options}
              />
            </Form.Item>
            <Form.Item label="Please Enter description here" layout="vertical">
              <TextArea
                rows={4}
                placeholder="Enter Text file"
                name="textDescp"
                value={textDescp}
                onChange={(e) => setTextDesp(e.target.value)}
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      key: "2",
      label: "URL",
      icon:<LinkOutlined />,
      onClickContent: () => {
        dispatch(setSelectedTrainStatus("url"));
      },
      children: () => {
        return (
          <div>
            <Form.Item label="Enter URL Name" layout="vertical">
              <Input
                value={urlName}
                onChange={(e) => setUrlName(e.target.value)}
                placeholder="Enter URL Name"
              />
            </Form.Item>
            <Form.Item label="Select Roles" layout="vertical">
              <Select
                size="large"
                mode="multiple"
                value={selectedRoles}
                onChange={(values) => setSelectedRoles(values)}
                style={{ width: "100%" }}
                options={options}
              />
            </Form.Item>
            <Form.Item label="Enter URL Link" layout="vertical">
              <Input
                value={urlLink}
                onChange={(e) => setUrlLink(e.target.value)}
                placeholder="Enter URL Link"
              />
            </Form.Item>
          </div>
        );
      },
    },
    {
      key: "3",
      label: "PDF",
      icon:<FilePdfOutlined />,
      onClickContent: () => {
        dispatch(setSelectedTrainStatus("pdf"));
      },
      children: () => {
        return (
          <div>
            <Form.Item label="Select Roles" layout="vertical">
              <Select
                size="large"
                mode="multiple"
                value={selectedRoles}
                onChange={(values) => setSelectedRoles(values)}
                style={{ width: "100%" }}
                options={options}
              />
            </Form.Item>
            <Upload
              accept=".pdf"
              showUploadList={false}
              beforeUpload={() => false} 
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Attach or Browse PDF</Button>
            </Upload>
            {fileName && (
              <div
                style={{
                  marginLeft: 16,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FilePdfOutlined style={{ fontSize: "24px", color: "red" }} />
                <span style={{ marginLeft: 8 }}>{fileName}</span>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const handleChange = (key) => {
    setActiveKey((prevKey) => (prevKey === key ? prevKey : key));
    setSelectedRoles([]);
  };

  // Submit handler
  const handleSubmit = () => {

    const formData = new FormData();
    formData.append("file", pdfSelect);
    formData.append("role", selectedRoles); 

    const textPayload = {
      textFileName: textName,
      role: selectedRoles,
      text: textDescp,
    };
    const urlPayload = {
      role: selectedRoles,
      url: urlLink,
      urlFileName: urlName,
    };
    const pdfPayload = {
        formData
    };

    // Determine the active payload
    let data =
      activeKey == 1
        ? textPayload
        : activeKey == 2
        ? urlPayload
        : activeKey == 3 && formData;

    let descp =  
    activeKey == 1
      ? textDescp
      : activeKey == 2
      ? urlLink
      : activeKey == 3 && fileName;

    // API call only on submit
    setIsActivePayload(data)
    setDescription(descp)
    setIsPreview(true)
    setIsOpen(false)

  };

  const onSubmitTrainContent=()=>{
    console.log("active payload", activePayload)
    let status =
      activeKey == 1
        ? "text"
        : activeKey == 2
        ? "url"
        : activeKey == 3 && "pdf";
    dispatch(
      uploadText({
        body: activePayload,
        fileType: status,
        page: page,
        limit: limit,
        navigate: navigate,
        searchQuery: searchInput || "",
      })
    );
    setIsOpen(false)
    setTextName("")
    setTextDesp("")
    setSelectedRoles([])
    setUrlLink("")
    setUrlName("")
    setPdfSelect(null)
    setFileName("")
  }

  useEffect(() => {
    dispatch(getRoles({ navigate: navigate }));
  }, [dispatch, navigate]);

  return (
    <>
      <Modal
        width={900}
        centered
        title="Add training data"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
        <div className='preview-btn'>
        <Button onClick={handleCancel}>Close</Button>
        <Button onClick={handleSubmit}>Next</Button>
       </div>}
      >
        <Collapse
          activeKey={[activeKey]}
          onChange={handleChange}
          accordion
          expandIcon={({ isActive }) => <Radio checked={isActive} />}
          expandIconPosition="right"
          className="custom-collapse"
        >
          {items.map((item) => (
            <Panel
              key={item.key}
              header={
                <div onClick={item?.onClickContent} className="collapse-header">
                  <span className="header-title"><Tag>{item.icon}</Tag>{item.label}</span>
                </div>
              }
            >
              {item.children()}
            </Panel>
          ))}
        </Collapse>
      </Modal>
      <PreviewPopup isOpen={isPreview} setIsOpen={setIsPreview} 
      description={addDscription} onSubmit={onSubmitTrainContent}/>
    </>
  );
};

export default TrainAndContentPopup;

