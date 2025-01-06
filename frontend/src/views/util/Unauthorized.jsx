import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Result
        status="403"
        title="Unauthorized"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={goToLogin}>
            Go to Login
          </Button>
        }
      />
    </div>
  );
};

export default Unauthorized;
