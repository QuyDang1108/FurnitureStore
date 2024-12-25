import { lazy } from "react";
const Login = lazy(() => import("./../../views/auth/Login"));
const Register = lazy(() => import("./../../views/auth/Register"));
const AdminLogin = lazy(() => import("./../../views/auth/AdminLogin"));
const ForgotPassword = lazy(() => import("./../../views/auth/ForgotPassword"));

const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/forgot-password", 
    element: <ForgotPassword />,
  },
];

export default publicRoutes;
