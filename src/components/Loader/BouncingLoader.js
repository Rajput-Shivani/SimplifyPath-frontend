import React from "react";
import './loaderStyle.scss'

const BouncingLoader = (props) => {
  return (
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
  );
};

export default BouncingLoader;