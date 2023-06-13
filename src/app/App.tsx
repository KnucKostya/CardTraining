import React, { useEffect } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { Header } from "../features/Header/Header";
import { authThunks } from "../features/auth/authSlice";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLoading_Selector } from "./app.selector";
import { RouteNames } from "./routes";
import { isLoading_Selector } from "./appSelector";

function App() {
  const isLoading = useAppSelector(isLoading_Selector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authThunks.isAuthTC())
      .unwrap()
      .then((res) => {
        if (res.profile._id) {
          // navigate(RouteNames.PACKS);
        }
      })
      .catch((e) => console.log(e.errorMessage));
    //TODO:  how to delete log ?
  }, [dispatch]);

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
