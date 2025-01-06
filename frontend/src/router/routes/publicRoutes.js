import { lazy } from "react";
const Login = lazy(() => import("./../../views/auth/Login"));
const Register = lazy(() => import("./../../views/auth/Register"));
const ForgotPassword = lazy(() => import("./../../views/auth/ForgotPassword"));
const Home = lazy(() => import("./../../views/Home"));
const Unauthorized = lazy(() => import("./../../views/util/Unauthorized"));
const NotFound = lazy(() => import("./../../views/util/NotFound"));

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "not-found",
    element: <NotFound />,
  },
];

export default publicRoutes;
