// // App.js
// import React from "react";
// import { Layout } from "antd";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import "./App.scss";
// import Sidebar from "./components/sidebar/Sidebar";
// import AppContainer from "./components/conatiner/Conatiner";
// import { Login } from "./Pages/login/Login";
// import AppSecureStorage from "./services/secureStorage";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AppHeader from "./components/header/Navbar";
// const storage = new AppSecureStorage();
// const App = () => {
//   const accessToken = storage.get("token");
//   const isAuthenticated = !!accessToken;

//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           {isAuthenticated ? (
//             <Route
//               path="*"
//               element={
//                 <Layout style={{ minHeight: "100vh" }}>
//                   <AppHeader />
//                   <Layout className="site-layout">
//                     <Sidebar />
//                     <AppContainer />
//                   </Layout>
//                 </Layout>
//               }
//             />
//           ) : (
//             <Route path="*" element={<Navigate to="/" />} />
//           )}
//         </Routes>
//       </Router>
//       <ToastContainer />
//     </>
//   );
// };

// export default App;

//test
import React from "react";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import AppContainer from "./components/conatiner/Conatiner";
import { Login } from "./Pages/login/Login";
import AppSecureStorage from "./services/secureStorage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppHeader from "./components/header/Navbar";
const storage = new AppSecureStorage();
const App = () => {
  const accessToken = storage.get("token");
  const isAuthenticated = !!accessToken;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {isAuthenticated ? (
            <Route
              path="*"
              element={
                <Layout style={{ minHeight: "100vh" }}>
                  <AppHeader />
                  <Layout className="site-layout">
                    <Sidebar />
                    <AppContainer />
                  </Layout>
                </Layout>
              }
            />
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;


