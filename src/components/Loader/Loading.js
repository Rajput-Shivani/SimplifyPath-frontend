// src/components/Loader.js
import React from "react";
import { Spin } from "antd";

const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "64vh",
    }}
  >
    <Spin size="large" />
  </div>
);

export default Loading;
