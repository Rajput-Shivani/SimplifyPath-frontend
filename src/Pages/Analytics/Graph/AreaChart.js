import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DatePicker,
  Row,
  Col,
  Typography,
  Statistic,
  Card,
  List,
  Avatar,
  Input,
  Tag,
  Form,
} from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getAnalytics_Data } from "../../../redux/slices/analyticsSlice";
// import styles from "../styles/style.module.scss";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  EditOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import "../analytics.scss";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const yAxisTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const formatYAxis = (tickItem) => {
  return tickItem.toString();
};

const formatChartData = (data) => {
  return data.map(([key, value]) => ({
    name: key.replace(/[_-]/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
    value,
  }));
};

const AreaChartPage = ({ unitOfTime, numericValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { analyticsData } = useSelector((state) => state.analyticsReducer);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const endDateData = `${year}-${month}-${day}`;
  const initialStartDate = new Date(endDateData);
  initialStartDate.setDate(initialStartDate.getDate() - 3);
  const startDateData = `${initialStartDate.getFullYear()}-${(
    initialStartDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${initialStartDate
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  const [startDate, setStartDate] = useState(startDateData);
  const [endDate, setEndDate] = useState(endDateData);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [dates, setDates] = useState([moment().subtract(3, "days"), moment()]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  useEffect(() => {
    if (analyticsData) {
      setData1(
        formatChartData(
          Object.entries(analyticsData?.categoryWiseRequests || {})
        )
      );
      setData2(
        formatChartData(Object.entries(analyticsData?.sourceWiseRequests || {}))
      );
      setData3(
        formatChartData(Object.entries(analyticsData?.actionWiseRequests || {}))
      );
    }
  }, [analyticsData]);

  const fetchData = () => {
    if (startDate && endDate) {
      dispatch(getAnalytics_Data({ startDate, endDate, navigate }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <>
      <Card>
        <Row gutter={16}>
          <Col xs={24} lg={16}>
            <Row gutter={16}>
              <Col xs={24} lg={8}>
                <Card
                  style={{
                    width: "100%",
                  }}
                >
                  <Meta
                    avatar={
                      <Avatar
                        className="graph-avatar"
                        icon={<FileDoneOutlined />}
                      />
                    }
                    className="analytics-header-text"
                    title="Total Requests"
                    description={
                      <div className="graph-card-desp">
                        {analyticsData?.totalRequests || 0}
                      </div>
                    }
                  />
                </Card>
              </Col>
              <Col xs={24} lg={8} className="analytics-header-text">
                <Card
                  style={{
                    width: "100%",
                  }}
                >
                  <Meta
                    avatar={
                      <Avatar
                        className="graph-avatar"
                        icon={<FieldTimeOutlined />}
                      />
                    }
                    title="Average Response Time"
                    description={
                      <div className="graph-card-desp">{numericValue || 0}</div>
                    }
                  />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={8} className="analytics-header-text">
            <Row gutter={16}>
              <Col xs={24} lg={12}>
                <Form.Item label="Start Date" layout="vertical">
                  <Input
                    type="date"
                    id="startDatePicker"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="datepicker"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item label="End Date" layout="vertical">
                  {" "}
                  <Input
                    type="date"
                    id="endDatePicker"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="datepicker"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Title level={3} style={{ margin: "20px 0px" }}>
        Category wise request
      </Title>
      <ResponsiveContainer width="100%" height={266}>
        <BarChart
          data={data1}
          margin={{ top: 30, right: 30, left: 20, bottom: 0 }}
          style={{ paddingRight: "30px" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            ticks={yAxisTicks}
            tick={{ fontSize: 12 }}
            tickFormatter={formatYAxis}
          />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" fill="#baddf8" />
        </BarChart>
      </ResponsiveContainer>
      <Title level={3} style={{ margin: "20px 0px" }}>
        Source wise request
      </Title>
      <ResponsiveContainer width="100%" height={266}>
        <BarChart
          data={data2}
          margin={{ top: 30, right: 30, left: 20, bottom: 0 }}
          style={{ paddingRight: "30px" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            ticks={yAxisTicks}
            tick={{ fontSize: 12 }}
            tickFormatter={formatYAxis}
          />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" fill="#baddf8" />
        </BarChart>
      </ResponsiveContainer>
      <Title level={3} style={{ margin: "20px 0px" }}>
        Action wise request
      </Title>
      <ResponsiveContainer width="100%" height={266}>
        <BarChart
          data={data3}
          margin={{ top: 30, right: 30, left: 20, bottom: 0 }}
          style={{ paddingRight: "30px" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis
            ticks={yAxisTicks}
            tick={{ fontSize: 12 }}
            tickFormatter={formatYAxis}
          />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="value" fill="#baddf8" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default AreaChartPage;
