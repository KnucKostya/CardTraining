import React from "react";
import "./App.css";
import Register from "../components/register/register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cards from "../components/cards/cards";
import CheckEmail from "../components/checkEmail/checkEmail";
import ForgotEmail from "../components/forgotPassword/forgotEmail";
import Learn from "../components/learn/learn";
import Login from "../components/login/login";
import SetNewPassword from "../components/setNewPassword/setNewPassword";
import { LinearProgress } from "@mui/material";
import { useAppSelector } from "common/hooks/hooks";
import {Profile} from "components/profile/Profile";
import {ErrorSnackbar} from "common/components/error-snack-bar/ErrorSnackBar";
import {Header} from "features/Header/Header";
import Packs from "components/packs/packs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/cards",
    element: <Cards />,
  },
  {
    path: "/checkEmail",
    element: <CheckEmail />,
  },
  {
    path: "forgotEmail/",
    element: <ForgotEmail />,
  },
  {
    path: "/learn",
    element: <Learn />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/packs",
    element: <Packs />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/setNewPassword",
    element: <SetNewPassword />,
  },
]);

function App() {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  return (
    <div className="App">
      <ErrorSnackbar />
      <Header />
      {isLoading && <LinearProgress color={"secondary"} />}
      <div className="mainContainer">
        <RouterProvider router={router} />
        {/*<GlobalError />*/}
        {/*!!!!!!!!!ERROR HANDLING!!!!!!!!!!!*/}
        {/*<Counter />*/}
      </div>
    </div>
  );
}

export default App;
