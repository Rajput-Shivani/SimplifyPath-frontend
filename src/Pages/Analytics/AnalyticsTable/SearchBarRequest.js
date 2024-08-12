import React from "react";
import { Input, Layout, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchItemAnalytics } from "../../../redux/slices/analyticsSlice";
// import styles from "../styles/style.module.scss";

const { Header } = Layout;
const { Text } = Typography;

export default function SearchBarRequest() {
  const dispatch = useDispatch();
  const { searchItemAnalytics } = useSelector(
    (state) => state.analyticsReducer
  );

  const handleSearchChange = (event) => {
    dispatch(setSearchItemAnalytics(event.target.value));
  };

  return (
    <Header className="appBar">
      <div className="searchWrapper">
        <Input
          placeholder="Please search by name..."
          prefix={<SearchOutlined />}
          value={searchItemAnalytics}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        />
      </div>
    </Header>
  );
}
