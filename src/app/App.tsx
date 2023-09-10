import React, { useEffect } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import { Header } from "features/Header/Header";
import { authThunks } from "features/auth/authSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuth_auth_Selector } from "features/auth/authSelector";
import { RouteNames } from "app/routes";

function App() {
  const isAuth = useAppSelector(isAuth_auth_Selector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      dispatch(authThunks.isAuthTC())
        .unwrap()
        .then(() => {
          isAuth && navigate(RouteNames.PACKS);
        })
        .catch((e) => {
          return;
        });
    } else return;
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
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
