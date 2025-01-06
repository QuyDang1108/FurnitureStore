import { lazy } from "react";
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));
const RevenueDashboard = lazy(() =>
  import("./../../views/sadmin/RevenueDashboard")
);

export const sadminRoute = [
  {
    path: "/sadmin/dashboard",
    element: <AdminDashboard />,
    role: ["superadmin"],
  },
  {
    path: "/sadmin/revenue",
    element: <RevenueDashboard />,
    role: ["superadmin"],
  },
];
