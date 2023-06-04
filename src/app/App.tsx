import React, { useEffect } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../common/hooks/useAppSelector";
import { LinearProgress } from "@mui/material";
import { Header } from "../features/Header/Header";
import { authThunks } from "../features/auth/authSlice";
import { RouteNames } from "./routes";
import { useAppDispatch } from "../common/hooks/useAppDispatch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(authThunks.isAuthTC())
      .unwrap()
      .then((res) => {
        if (res.profile._id) {
          navigate(RouteNames.PROFILE);
        }
      })
      .catch((e) => console.error(e));
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
      {isLoading && <LinearProgress color={"secondary"} />}
      <div className="mainContainer">
        <Outlet />{/*routes.tsx*/}
        {/*Outlet используется для рендеринга вложенных маршрутов внутри родительского маршрута*/}
      </div>
    </div>
  );
}

export default App;





// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Register />,
//   },
//   {
//     path: "/cards",
//     element: <Cards />,
//   },
//   {
//     path: "/checkEmail",
//     element: <CheckEmail />,
//   },
//   {
//     path: "forgotEmail/",
//     element: <ForgotEmail />,
//   },
//   {
//     path: "/learn",
//     element: <Learn />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/packs",
//     element: <Packs />,
//   },
//   {
//     path: "/profile",
//     element: <Profile />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/setNewPassword",
//     element: <SetNewPassword />,
//   },
// ]);


