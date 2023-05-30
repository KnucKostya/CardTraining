import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cards from "components/cards/cards";
import ForgotEmail from "components/forgotPassword/forgotEmail";
import CheckEmail from "components/checkEmail/checkEmail";
import Learn from "components/learn/learn";
import Login from "components/login/login";
import Packs from "components/packs/packs";
import Profile from "components/profile/profile";
import Register from "components/register/register";
import SetNewPassword from "components/setNewPassword/setNewPassword";

function App() {
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

  return (
    <div className="App">
      <div className="mainContainer">
        {/*<img src={logo} className="App-logo" alt="logo" />*/}

        <RouterProvider router={router} />
        {/*<Counter />*/}
      </div>
    </div>
  );
}

export default App;
