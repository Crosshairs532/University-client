import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import routesGenerator from "../utils/routesGenerator";
import { adminPath } from "./admin.routes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
  },
  {
    path: "/admin",
    element: <App />,
    children: routesGenerator(adminPath),
  },
  {
    path: "/faculty",
    element: <App></App>,
    children: routesGenerator(adminPath),
  },
  {
    path: "/student",
    element: <App></App>,
    children: routesGenerator(adminPath),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
]);

export default router;
