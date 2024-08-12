import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { PAGE_ROUTES } from "../../utils/constants";
import { googleLogin } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import FreezLoader from "../../components/Loader/FreezLoader";
import AppSecureStorage from "../../services/secureStorage";


export const Login = () => {
  const storage = new AppSecureStorage();
  let token = storage.get('token')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loader,userToken} = useSelector((state)=>state.authReducer)

  const handleLogin = async (data) => {
    dispatch(googleLogin({ data: data, navigate: navigate }));
  };


  useEffect(() => {
    if (token || userToken) {
      navigate('/chat');
    }
  }, []);

  console.log("token", userToken, "tokenUSe", token)

  return (
    <Layout className="login-layout">
        {loader && <FreezLoader />} 
      <div className="login-container">
        <div className="left-panel">
          <div className="login-box">
            <h1 className="logo">SimplifyPath</h1>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleLogin(credentialResponse);
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              // useOneTap
            />
          </div>
        </div>
        <div className="right-panel">
          <h1>Simplifying Technology Creation and Adoption</h1>
          <p>
            The primary objective of SimplifyPath is to provide a centralized
            and easily accessible interface, leveraging the power of chat, to
            retrieve organization-wide information seamlessly. By integrating
            various applications into the platform, we enable users to perform
            actions and retrieve data effortlessly based on their specific
            requirements, all within the familiar chatbot environment.
            Harnessing the capabilities of advanced machine learning models,
            SimplifyPath streamlines processes and enhances organizational
            efficiency.
          </p>
        </div>
      </div>
    </Layout>
  );
};
