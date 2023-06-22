import React, { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import { Header } from "features/Header/Header";
import { authThunks } from "features/auth/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuth_auth_Selector } from "features/auth/authSelector";
import { useActions } from "common/hooks/useActions";

function App() {
  const { isAuthTC } = useActions(authThunks);
  const isAuth = useAppSelector(isAuth_auth_Selector);

  useEffect(() => {
    !isAuth && isAuthTC();
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <div className="mainContainer">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
