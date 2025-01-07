import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { get_user_info } from "../store/Reducers/authReducer";
import Loading from "./components/Loading";

const Home = () => {
  const { userInfo, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(get_user_info());
    }
  }, [dispatch]);

  if (loader) return <Loading />;
  if (!userInfo) return <Navigate to="/login" replace />;

  const role = userInfo.role;
  if (role === "USER") return <Navigate to="/customer/homepage" replace />;
  if (role === "ADMIN" || role === "SUPER_ADMIN")
    return <Navigate to="/admin/dashboard" replace />;
};

export default Home;
