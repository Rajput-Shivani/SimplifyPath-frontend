// import React, { useState, useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Tabs, Table, Typography, Avatar, Input, Space } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { sortData } from "../../../utils/helpers"; // Ensure this is implemented correctly
// import '../analytics.scss'

// const { TabPane } = Tabs;

// export default function AnalyticsTable() {
//   const { analyticsData, searchItemAnalytics } = useSelector(
//     (state) => state.analyticsReducer
//   );

//   const dataSources = useMemo(
//     () => ({
//       "Category Wise Requests": analyticsData?.categoryWiseRequests || {},
//       "Source Wise Requests": analyticsData?.sourceWiseRequests || {},
//       "Action Wise Requests": analyticsData?.actionWiseRequests || {},
//     }),
//     [analyticsData]
//   );

//   const [selectedTab, setSelectedTab] = useState("0");
//   const [sortConfig, setSortConfig] = useState({
//     key: "name",
//     direction: "asc",
//   });

//   const handleTabChange = (newValue) => {
//     setSelectedTab(newValue);
//     setSortConfig({ key: "name", direction: "asc" }); // Reset sort config when tab changes
//   };

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const convertDataToRows = (data) =>
//     Object.entries(data)
//       .map(([name, value]) => ({
//         name,
//         value,
//       }))
//       .filter(
//         (row) =>
//           row.name.toLowerCase().includes(searchItemAnalytics.toLowerCase()) ||
//           row.value
//             .toString()
//             .toLowerCase()
//             .includes(searchItemAnalytics.toLowerCase())
//       );

//   const tabTitles = Object.keys(dataSources);
//   const tabData = Object.values(dataSources);

//   const sortedRows = useMemo(() => {
//     const rows = convertDataToRows(tabData[selectedTab]);
//     return sortData(rows, sortConfig.key, sortConfig.direction);
//   }, [tabData, selectedTab, sortConfig, searchItemAnalytics]);

//   const columns = [
//     {
//       title: "S.No.",
//       dataIndex: "index",
//       key: "index",
//       render: (_, __, index) => index + 1,
//     },
//     {
//       title: (
//         <Space>
//           Name
//         </Space>
//       ),
//       dataIndex: "name",
//       key: "name",
//       sorter: (a, b) => {
//         if (a.name < b.name) return sortConfig.direction === "asc" ? -1 : 1;
//         if (a.name > b.name) return sortConfig.direction === "asc" ? 1 : -1;
//         return 0;
//       },
//       render: (text) => {
//         const formattedName =
//           text.charAt(0).toUpperCase() +
//           text.slice(1).replace(/_/g, " ").replace(/-/g, " ");
//         return (
//           <div className="tableName">
//             <Avatar
//               alt={formattedName}
//               src={`/static/images/avatar/${formattedName}.jpg`}
//             />
//             <span>{formattedName}</span>
//           </div>
//         );
//       },
//     },
//     {
//       title: (
//         <Space>
//           Requests
//         </Space>
//       ),
//       dataIndex: "value",
//       key: "value",
//       align: "center",
//       sorter: (a, b) => a.value - b.value,
//     },
//   ];

//   return (
//     <div>
//       <Tabs
//         activeKey={selectedTab}
//         onChange={handleTabChange}
//         aria-label="data tables"
//       >
//         {tabTitles.map((title, index) => (
//           <TabPane tab={title} key={index.toString()} />
//         ))}
//       </Tabs>
//       <Space className="search_box" direction="vertical">
//         <Input
//         size="large"
//           prefix={<SearchOutlined />}
//           placeholder="Search"
//           value={searchItemAnalytics}
//           onChange={(e) => {
//             // Dispatch search action here if needed
//           }}
//         />
//       </Space>

//       {tabData[selectedTab] && (
//         <div className="analytics_table">
//           <Table
//             columns={columns}
//             dataSource={sortedRows}
//             pagination={false}
//             rowKey="name"
//             locale={{
//               emptyText: (
//                 <Typography.Text type="secondary">No results found</Typography.Text>
//               ),
//             }}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Tabs, Table, Typography, Avatar, Input, Space, Tag, Row, Col } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { sortData } from "../../../utils/helpers"; // Ensure this is implemented correctly
import "../analytics.scss";

const { TabPane } = Tabs;

export default function AnalyticsTable() {
  const { analyticsData, searchItemAnalytics } = useSelector(
    (state) => state.analyticsReducer
  );

  const [searchTerm, setSearchTerm] = useState(""); // Local state for search input
  const [selectedTab, setSelectedTab] = useState("0");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const dataSources = useMemo(
    () => ({
      "Category Wise Requests": analyticsData?.categoryWiseRequests || {},
      "Source Wise Requests": analyticsData?.sourceWiseRequests || {},
      "Action Wise Requests": analyticsData?.actionWiseRequests || {},
    }),
    [analyticsData]
  );

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
    setSortConfig({ key: "name", direction: "asc" }); // Reset sort config when tab changes
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const convertDataToRows = (data) =>
    Object.entries(data)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .filter(
        (row) =>
          row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );

  const tabTitles = Object.keys(dataSources);
  const tabData = Object.values(dataSources);

  const sortedRows = useMemo(() => {
    const rows = convertDataToRows(tabData[selectedTab]);
    return sortData(rows, sortConfig.key, sortConfig.direction);
  }, [tabData, selectedTab, sortConfig, searchTerm]);

  const columns = [
    {
      title: "S.No.",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: <Space>Name</Space>,
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        if (a.name < b.name) return sortConfig.direction === "asc" ? -1 : 1;
        if (a.name > b.name) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      },
      render: (text) => {
        const formattedName =
          text.charAt(0).toUpperCase() +
          text.slice(1).replace(/_/g, " ").replace(/-/g, " ");
        return (
          <div className="tableName">
            {/* <Avatar
              alt={formattedName}
              src={`/static/images/avatar/${formattedName}.jpg`}
            /> */}
            <Tag>
              <UserOutlined />
            </Tag>
            <span>{formattedName}</span>
          </div>
        );
      },
    },
    {
      title: <Space>Requests</Space>,
      dataIndex: "value",
      key: "value",
      align: "center",
      sorter: (a, b) => a.value - b.value,
    },
  ];

  return (
    <div>
      <Tabs
        activeKey={selectedTab}
        onChange={handleTabChange}
        aria-label="data tables"
      >
        {tabTitles.map((title, index) => (
          <TabPane tab={title} key={index.toString()} />
        ))}
      </Tabs>
        <Row gutter={16}>
          <Col span={18}></Col>
          <Col span={6}>
            <Input
              size="large"
              prefix={<SearchOutlined />}
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearchChange} // Update search term on input change
            />
          </Col>
        </Row>

      {tabData[selectedTab] && (
        <div className="analytics_table">
          <Table
            columns={columns}
            dataSource={sortedRows}
            pagination={false}
            rowKey="name"
            locale={{
              emptyText: (
                <Typography.Text type="secondary">
                  No results found
                </Typography.Text>
              ),
            }}
          />
        </div>
      )}
    </div>
  );
}
