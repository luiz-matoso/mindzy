import { useEffect, useRef, useState } from "react";
import "./App.css";
import Mindzy from "./components/Mindzy/Mindzy";
import Header from "./components/Header/Header";

import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Flip, ToastContainer } from "react-toastify";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { useTranslation } from "react-i18next";
import EmailVerify from "./pages/EmailVerify/EmailVerify";
import MindzyHub from "./components/Mindzy/MindzyHub";

function App() {
  const { t } = useTranslation();

  const mindzyRef = useRef(null);

  const handleScrollToMindzy = () => {
    mindzyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Flip}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/verify_account" element={<EmailVerify />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home onScrollClick={handleScrollToMindzy} />
                <div
                  ref={mindzyRef}
                  className="mt-60 mb-60 flex justify-center"
                >
                  <MindzyHub />
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
