import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Cards } from "../features/cards/cards";
import { CheckEmail } from "../features/auth/checkEmail/checkEmail";
import { ForgotEmail } from "../features/auth/forgotPassword/forgotEmail";
import { Learn } from "../features/learn/learn";
import { Login } from "../features/login/login";
import { Packs } from "../features/packs/packs";
import { Profile } from "../features/profile/profile";
import { Register } from "../features/auth/register/register";
import { SetNewPassword } from "../features/auth/setNewPassword/setNewPassword";

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
