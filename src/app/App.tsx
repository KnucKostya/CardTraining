import React from "react";
import "./App.css";
import Register from "../components/register/register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cards from "../components/cards/cards";
import CheckEmail from "../components/checkEmail/checkEmail";
import ForgotEmail from "../components/forgotPassword/forgotEmail";
import Learn from "../components/learn/learn";
import Login from "../components/login/login";
import Packs from "../components/packs/packs";
import Profile from "../components/profile/profile";
import SetNewPassword from "../components/setNewPassword/setNewPassword";

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
  return (
    <div className="App">
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
