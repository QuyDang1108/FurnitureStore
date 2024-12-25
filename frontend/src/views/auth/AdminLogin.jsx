import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, messageClear } from "./../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state));
  };

  const overrideStyle = {
    dislay: "flex",
    margin: "0 auto",
    height: "50%",
    justifyContent: "center",
    alignItem: "center",
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/admin/dashboard");
    }
  });

  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <div className="h-[70px] flex justify-center items-center">
            <div className="w-[180px] h-[50px]">
              <img
                className="w-full h-full"
                src="http://localhost:3000/images/logo.png"
                alt="Logo"
              />
            </div>
          </div>

          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Email</label>
              <input
                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md focus:ring-red-400"
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                onChange={inputHandle}
                value={state.email}
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Password</label>
              <input
                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md focus:ring-red-400"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                onChange={inputHandle}
                value={state.password}
                required
              />
            </div>

            <button
              disabled={loader ? true : false}
              className="bg-slate-700 w-full hover:shadow-blue-300/50 hover:shadow-lg 
                        text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PulseLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
