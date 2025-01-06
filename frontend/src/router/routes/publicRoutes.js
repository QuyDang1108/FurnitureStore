import { lazy } from "react";
const Login = lazy(() => import("./../../views/auth/Login"));
const Register = lazy(() => import("./../../views/auth/Register"));
const ForgotPassword = lazy(() => import("./../../views/auth/ForgotPassword"));
const Home = lazy(() => import("./../../views/Home"));

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
];

export default publicRoutes;
