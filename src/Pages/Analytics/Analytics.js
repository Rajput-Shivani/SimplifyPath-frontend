import { Layout } from "antd";
import React from "react";
import TopHeader from "../../components/header/Header";
import { LineChartOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import AnalyticsData from "./AnalyticsData";

export const Analytics = () => {
  return (
    <Layout className="chat-layout">
      <TopHeader
        isTitle={true}
        isRightContent={false}
        title="Analytics"
        icon={<LineChartOutlined className="icon-size text-white" />}
      />
      <Content className="app-content">
        <AnalyticsData />
      </Content>
    </Layout>
  );
};
