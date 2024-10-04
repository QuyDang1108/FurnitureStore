import { lazy } from "react";
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("./../../views/admin/Orders"));

export const adminRoute = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "/admin/orders",
    element: <Orders />,
    role: "admin",
  },
];
