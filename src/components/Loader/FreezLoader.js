// src/components/Loader.js
import React from 'react';
import './loaderStyle.scss'; // Create this file for loader styling

const FreezLoader = () => (
  <div className="loader-overlay">
    <div className="loader"></div>
  </div>
);

export default FreezLoader;
