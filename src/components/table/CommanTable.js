import React, { useState } from "react";
import {
  Layout,
  Table,
  Dropdown,
  Menu,
  Space,
  Input,
  Button,
  Pagination,
  message,
  Modal,
  Tooltip,
  Tag,
  Select,
} from "antd";
import {
  MoreOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./commanTable.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  setLimit,
  setPage,
  setSearchInput,
  setSelectedRole,
  setSelectedUserRoleId,
} from "../../redux/slices/globalSlice";
import {
  setActionName,
  setCloseBtnName,
  setIsPopUpShow,
  setPopUpTitle,
  setSubmitBtnName,
} from "../../redux/slices/popUpSlice";
import { DialogBox } from "../dialog/DialogBox";
import TopHeader from "../header/Header";

const { Content, Footer } = Layout;

const CommanTable = ({
  title,
  data,
  onEdit,
  onDelete,
  visibleColumns,
  setVisibleColumns,
  apiCall,
  actionsOptions,
  icon,
  openAddPopup,
  renderPopupContent,
  isFooter,
  customFooter,
  onClose,
  isAdd
}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [deleteKeys, setDeleteKeys] = useState([]);
  const [previousRole, setPreviousRole] = useState("");
  const { page, totalPage, limit, searchInput, selectedRole } = useSelector(
    (state) => state.globalReducer
  );
  const { getRolesData } = useSelector((state) => state.userManagementReducer);

  const handleMenuClick = (e, record) => {
    if (e.key === "edit") {
      onEdit(record);
    } else if (e.key === "delete") {
      showDeleteConfirm(
        [record.key],
        `Are you sure you want to delete ${record.name}?`
      );
    }
  };

  const menu = (record) => {
    return (
      <Menu>
        {actionsOptions?.map((list)=>{
          return (
            <Menu.Item onClick={()=>{
              list?.acttion(record)
            }} icon={list?.icon}>{list?.label}</Menu.Item>
          )
        })}
      </Menu>  
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={searchInput}
          onChange={(e) => dispatch(setSearchInput(e.target.value))}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              apiCall(page, limit, searchInput);
              clearFilters();
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 120 }}
          >
            Search
          </Button>
          <Button
            size="small"
            style={{ width: 120, height: 44 }}
            onClick={() => {
              apiCall(1, 10, "");
              dispatch(setSearchInput(""));
              dispatch(setPage(1));
              dispatch(setLimit(10));
              clearFilters();
              confirm();
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const fieldValue = record[dataIndex];
      return fieldValue && typeof fieldValue !== "undefined"
        ? fieldValue.toString().toLowerCase().includes(value.toLowerCase())
        : false;
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleDelete = (keys) => {
    onDelete(keys);
    setSelectedRowKeys([]);
    message.success("Deleted successfully");
  };

  const showDeleteConfirm = (keys, text) => {
    setDeleteKeys(keys);
    setModalText(text);
    setIsModalVisible(true);
  };

  const handleModalConfirm = () => {
    handleDelete(deleteKeys);
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleColumnToggle = (columnKey) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  const handleRoleChange = (id, value, currentRole) => {
    setPreviousRole(currentRole);
    dispatch(setSelectedUserRoleId(id));
    dispatch(setSelectedRole(value));
    dispatch(setPopUpTitle("Confirmation Popup"));
    dispatch(setActionName("User role change"));
    dispatch(setCloseBtnName("No"));
    dispatch(setSubmitBtnName("Yes"));
    dispatch(setIsPopUpShow(true));
  };



  const roleOptions = getRolesData?.data?.map((role) => ({
    label: role.name,
    value: role.name,
  }));

  const columns = [
    {
      title: "S.No",
      dataIndex: "sNo",
      render: (text, record, index) => (page - 1) * limit + index + 1,
    },
    ...(title === "User Role"
      ? [
          {
            title: "Name",
            dataIndex: "name",
            ...(visibleColumns.name
              ? {
                  sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
                  ...getColumnSearchProps("name"),
                }
              : { render: () => null, className: "hidden-column" }),
          },
          {
            title: "Permissions",
            dataIndex: "permissions",
            width: 150,
            render: (permissions) => (
              <div className="permissions-container">
                {Object.keys(permissions).map((category) => (
                  <Tooltip key={category} title={category}>
                    <Tag key={category} style={{ margin: "2px" }} ellipsis>
                      {category}
                    </Tag>
                  </Tooltip>
                ))}
              </div>
            ),
            sorter: (a, b) => {
              const aPermissions = Object.keys(a.permissions).join(",");
              const bPermissions = Object.keys(b.permissions).join(",");
              return aPermissions.localeCompare(bPermissions);
            },
          },
        ]
      : title === "User Management"
      ? [
          {
            title: "Name",
            dataIndex: "name",
            ...(visibleColumns.name
              ? {
                  sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
                  ...getColumnSearchProps("name"),
                }
              : { render: () => null, className: "hidden-column" }),
          },
          {
            title: "Email",
            dataIndex: "email",
            ...(visibleColumns.email
              ? {
                  sorter: (a, b) =>
                    (a.email || "").localeCompare(b.email || ""),
                  ...getColumnSearchProps("email"),
                }
              : { render: () => null, className: "hidden-column" }),
          },
          {
            title: "Role",
            dataIndex: "role",
            sorter: (a, b) => (a.role || "").localeCompare(b.role || ""),
            render: (text, record) => (
              <Select
                value={text}
                style={{ width: 120 }}
                onChange={(value) => handleRoleChange(record._id, value, text)}
              >
                {roleOptions?.map((option) => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            ),
            className: "role-column",
          },

          {
            title: "Status",
            dataIndex: "status",
            ...(visibleColumns.status
              ? {
                  sorter: (a, b) => {
                    const statusA = a.verified ? "Verified" : "Unverified";
                    const statusB = b.verified ? "Verified" : "Unverified";
                    return statusA.localeCompare(statusB);
                  },
                  render: (text, record) => (
                    <Tag color={record.verified ? "green" : "red"}>
                      {record.verified ? "Verified" : "Unverified"}
                    </Tag>
                  ),
                  className: "status-column", // Add a class if needed for styling
                }
              : { render: () => null, className: "hidden-column" }),
          },
        ]
      : [
          {
            title: "Name",
            dataIndex: "name",
            ...(visibleColumns.name
              ? {
                  sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
                  ...getColumnSearchProps("name"),
                }
              : { render: () => null, className: "hidden-column" }),
          },
          {
            title: "Domain",
            dataIndex: "domain",
            ...(visibleColumns.domain
              ? {
                  sorter: (a, b) =>
                    (a.domain || "").localeCompare(b.domain || ""),
                  ...getColumnSearchProps("email"),
                }
              : { render: () => null, className: "hidden-column" }),
          },
          {
            title: "Company Email",
            dataIndex: "companyEmail",
            ...(visibleColumns.companyEmail
              ? {
                  sorter: (a, b) =>
                    (a.companyEmail || "").localeCompare(b.companyEmail || ""),
                  //   responsive: ["md"],
                }
              : { render: () => null, className: "hidden-column" }),
          },
          {
            title: "Status",
            dataIndex: "status",
            ...(visibleColumns.status
              ? {
                  sorter: (a, b) =>
                    (a.status || "").localeCompare(b.status || ""),
                  //   responsive: ["md"],
                }
              : { render: () => null, className: "hidden-column" }),
          },
        ]),
    {
      title:
        selectedRowKeys?.length > 0 ? (
          <div
            onClick={() =>
              showDeleteConfirm(
                selectedRowKeys,
                "Are you sure you want to delete all data?"
              )
            }
          >
            <DeleteOutlined style={{ marginRight: "10px" }} />
            Delete Data
          </div>
        ) : (
          "Actions"
        ),
      key: "actions",
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <MoreOutlined style={{ color: "141a40", fontSize: "20px" }} />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ].filter((col) => visibleColumns[col.dataIndex] !== false);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
    getCheckboxProps: (record) => ({
      disabled: record.permissions === "Admin" || record.role === "Admin",
      name: record.name,
      className:
        record.permissions === "Admin" || record.role === "Admin"
          ? "disabled-row"
          : "",
    }),
    renderCell: (checked, record, index, originNode) => {
      return record.permissions === "Admin" || record.role === "Admin" ? (
        <Tooltip title="Permission Required: You do not have the rights to delete admin data.">
          <span>{originNode}</span>
        </Tooltip>
      ) : (
        originNode
      );
    },
  };
console.log("visibleColumns", visibleColumns)
  return (
    <Layout className="table-layout">
       <TopHeader
        isTitle={true}
        isRightContent={true}
        title={title}
        dropdownItems={visibleColumns}
        icon={icon}
        onChangeOptions={handleColumnToggle}
        isAdd={isAdd ? isAdd : false}
        openAddPopup={openAddPopup}

      />
      <Content style={{ padding: "0 24px" }}>
        <Table
          rowSelection={null}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={(record) =>
            record.permissions === "Admin" || record.role === "Admin"
              ? "disabled-row"
              : ""
          }
        />
      </Content>
      <Footer className="pagination-footer">
        <Pagination
          current={page}
          pageSize={limit}
          total={totalPage}
          onChange={(page, pageSize) => {
            dispatch(setPage(page));
            apiCall(page, pageSize, searchInput);
          }}
          style={{ marginTop: "16px", textAlign: "right" }}
        />
      </Footer>
      <Modal
        title="Confirm Deletion"
        visible={isModalVisible}
        onOk={handleModalConfirm}
        onCancel={handleModalCancel}
      >
        <p>{modalText}</p>
      </Modal>
      <DialogBox renderUi={renderPopupContent} isFooter={isFooter} customFooter={customFooter} onClose={onClose} />
    </Layout>
  );
};

export default CommanTable;
