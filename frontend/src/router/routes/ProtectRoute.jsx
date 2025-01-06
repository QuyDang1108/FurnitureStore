import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);

  console.log(role, userInfo);
  console.log(route.role);

  if (role) {
    if (route) {
      if (userInfo) {
        if (route.role === role) {
          return (
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          );
        } else {
          return <Navigate to="/not-found" replace />;
        }
      } else {
        return <Navigate to="/unauthorized" replace />;
      }
    } else {
      return <Navigate to="/not-found" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;
