import React from "react";
import { Card, Spin, Row, Col, Typography } from "antd";
import { useSelector } from "react-redux";
// import ChatNav from "../../components/chatNav/ChatNav";
import AreaChartPage from "./Graph/AreaChart";
import PieChartPage from "./Graph/PieChart";
import AnalyticsTable from "./AnalyticsTable/AnalyticsTable";
import ResponseWiseTable from "./AnalyticsTable/ResponseWiseTable";
import './analytics.scss'
// import styles from "./styles/style.module.scss"; // Make sure to adapt the styles for Ant Design if needed

const { Title } = Typography;

const AnalyticsData = () => {
  const { loading, analyticsData } = useSelector(
    (state) => state.analyticsReducer
  );

  const extractNumericValue = (str) => {
    const match = str.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : null;
  };

  const avgResponseTime = analyticsData?.avgResponseTime;
  const numericValue = avgResponseTime
    ? extractNumericValue(avgResponseTime)
    : null;

  function extractUnitOfTime(str) {
    const match = str.match(/\b(?:seconds?|milliseconds?|minutes?|hours?)\b/i);
    return match ? match[0] : null;
  }

  const unitOfTime = avgResponseTime
    ? extractUnitOfTime(avgResponseTime)
    : null;

  return (
    <div className="analytics_wrapper">
      {/* <ChatNav title={"Analytics"} /> */}
      <Card className="analytics-card-wrapper">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24}>
            {loading ? (
              <Spin size="large" />
            ) : (
              <AreaChartPage numericValue={numericValue} unitOfTime={unitOfTime} />
            )}
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col xs={24} sm={24} md={24} lg={24} style={{ height: 300 }}>
            {loading ? <Spin size="large" /> : <PieChartPage />}
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Title level={4}>Analytics Table</Title>
            <AnalyticsTable />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Title level={4}>Response Wise Table</Title>
            <ResponseWiseTable />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AnalyticsData;
