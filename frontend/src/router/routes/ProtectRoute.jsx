import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { get_user_info } from "./../../store/Reducers/authReducer";

const ProtectRoute = ({ route, children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      await dispatch(get_user_info());
      setLoading(false);
    };

    fetchUserInfo();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (route) {
    if (userInfo) {
      if (route.role.includes(userInfo.role)) {
        return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
      } else {
        return <Navigate to="/login" replace />;
      }
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectRoute;
