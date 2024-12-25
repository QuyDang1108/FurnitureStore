import { privateRoute } from "./privateRoutes";
import MainLayout from "../../layout/MainLayout";

export const getRoute = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: privateRoute,
  };
};
