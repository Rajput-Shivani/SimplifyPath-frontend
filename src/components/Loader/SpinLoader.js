// src/components/Loader.js
import React from 'react';
import './loaderStyle.scss'; 
import { Spin } from 'antd';

const SpinLoader = () => (
  <div className="spin-loading-container">
      <div className="spin-loading-overlay">
        <Spin size='large' />
      </div>
  </div>
);

export default SpinLoader;
