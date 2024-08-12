import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "./store";

const clientId =
  "835387730826-tgdj9urmcgg3cbcateld9ao1608mc007.apps.googleusercontent.com";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
