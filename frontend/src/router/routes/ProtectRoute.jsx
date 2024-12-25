import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);

  if (role) {
    if (route) {
      if (userInfo) {
        if (route.role === role) {
          return (
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          );
        } else {
          return <Navigate to="/404" replace />;
        }
      } else {
        return <Navigate to="/unauthorize" replace />;
      }
    } else {
      return <Navigate to="/404" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;
