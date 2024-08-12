import React from "react";
import { Input, Layout } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchItemresponse } from "../../../redux/slices/analyticsSlice";
// import styles from "../styles/style.module.scss";

const { Header } = Layout;

export default function SearchBarResponse() {
  const dispatch = useDispatch();
  const { searchItemResponse } = useSelector(
    (state) => state.analyticsReducer
  );

  const handleSearchChange = (event) => {
    dispatch(setSearchItemresponse(event.target.value));
  };

  return (
    <Header className="appBar">
      <div className="searchWrapper">
        <Input
          placeholder="Please search by name..."
          prefix={<SearchOutlined />}
          value={searchItemResponse}
          onChange={handleSearchChange}
          style={{
            width: "100%",
            maxWidth: "600px",
          }}
        />
      </div>
    </Header>
  );
}
