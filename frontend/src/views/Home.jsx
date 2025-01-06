import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { role } = useSelector((state) => state.auth);
  if (role === "customer") return <Navigate to="/customer/dashboard" replace />;
  else if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  else if (role === "superadmin")
    return <Navigate to="/sadmin/dashboard" replace />;
  else return <Navigate to="/login" replace />;
};

export default Home;
