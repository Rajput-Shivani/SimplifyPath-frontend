import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Tabs, Table,Typography, Input, Row, Col, Tag } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { sortData } from "../../../utils/helpers";

const { TabPane } = Tabs;
const { Column } = Table;

const TableContent = ({ data, keyName, sortConfig, onSort, searchItem, loader }) => {
  const rows = useMemo(
    () =>
      data
        .filter((item) =>
          item[keyName].toLowerCase().includes(searchItem.toLowerCase())
        )
        .map((item, index) => ({
          id: index + 1,
          name:
            item[keyName].charAt(0).toUpperCase() +
            item[keyName].slice(1).replace(/_/g, " ").replace(/-/g, " "),
          value: item.averageTime,
        })),
    [data, keyName, searchItem]
  );

  const sortedRows = useMemo(
    () => sortData(rows, sortConfig.key, sortConfig.direction),
    [rows, sortConfig]
  );

  return (
    <Table
      dataSource={sortedRows}
      pagination={false}
      rowKey={(record) => record.name}
      loading={loader}
    >
      <Column title="S.No." dataIndex="id" key="id" />
      <Column
        title={
          <span onClick={() => onSort("name")} style={{ cursor: "pointer" }}>
            Name{" "}
            {sortConfig.key === "name" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </span>
        }
        dataIndex="name"
        key="name"
        render={(text, record) => (
          <div className="tableName">
            <Tag><UserOutlined /></Tag>
            <span>{text}</span>
          </div>
        )}
      />
      <Column
        title={
          <span onClick={() => onSort("value")} style={{ cursor: "pointer" }}>
            Response Time{" "}
            {sortConfig.key === "value" &&
              (sortConfig.direction === "asc" ? "↑" : "↓")}
          </span>
        }
        dataIndex="value"
        key="value"
        align="center"
      />
      {sortedRows.length === 0 && (
        <Table.Column
          colSpan={3}
          align="center"
          render={() => (
            <Typography.Text type="secondary">No results found</Typography.Text>
          )}
        />
      )}
    </Table>
  );
};

export default function ResponseWiseTable() {
  const { analyticsData ,loader} = useSelector((state) => state.analyticsReducer);

  const [selectedTab, setSelectedTab] = useState("0");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [searchItem, setSearchItem] = useState("");

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

  const dataSources = useMemo(() => ({
    "Action Wise Response Time": analyticsData?.actionAvgResponseTimes || [],
    "App Wise Response Time": analyticsData?.appAvgResponseTimes || [],
    "Category Wise Response Time": analyticsData?.categoryAvgResponseTimes || [],
  }), [analyticsData]);

  const tabTitles = Object.keys(dataSources);
  const keyMapping = {
    "Action Wise Response Time": "action",
    "App Wise Response Time": "app",
    "Category Wise Response Time": "category",
  };

  return (
    <div>
      <Tabs
        activeKey={selectedTab}
        onChange={handleTabChange}
        style={{ marginBottom: 16 }}
      >
        {tabTitles.map((title, index) => (
          <TabPane
            tab={title}
            key={index.toString()}
            style={{ textTransform: "capitalize", fontSize: "17px" }}
          />
        ))}
      </Tabs>
      <Row gutter={16}>
        <Col span={18}></Col>
        <Col span={6}>
          <Input
            size="large"
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            value={searchItem}
            onChange={handleSearchChange}
            style={{ marginBottom: 16 }}
          />
        </Col>
      </Row>
      {tabTitles.map((title, index) => (
        <div key={index} hidden={index.toString() !== selectedTab}>
          <TableContent
            data={dataSources[title]}
            keyName={keyMapping[title]}
            sortConfig={sortConfig}
            onSort={handleSort}
            searchItem={searchItem}
            loader ={loader}
          />
        </div>
      ))}
    </div>
  );
}
