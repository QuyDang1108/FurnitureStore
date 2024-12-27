import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, messageClear } from "./../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { use } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const validate = () => {
    let usernameError = "";
    let passwordError = "";

    if (!state.username) {
      usernameError = "Username is required";
    }

    if (!state.password) {
      passwordError = "Password is required";
    } else if (state.password.length < 6) {
      passwordError = "Password must be at least 6 characters";
    }

    if (usernameError || passwordError) {
      setErrors({
        username: usernameError,
        password: passwordError,
      });
      return false;
    }
    return true;
  };

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
    if (!validate()) {
      return;
    }
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
    <div class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
      <div class="flex flex-row gap-3 pb-4">
        <div>
          <img src="/images/export.svg" alt="Logo" width="50" />
        </div>
        <h1 class="text-3xl font-boldtext-[#4B5563] my-auto">FurniStyle</h1>
      </div>
      <div class="text-sm font-light text-[#6B7280] pb-8 ">
        Login to admin account on FurniStyle.
      </div>
      <form class="flex flex-col" onSubmit={submit}>
        <div class="pb-2">
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-[#111827]"
          >
            Username
          </label>
          <div class="relative text-gray-400">
            <input
              type="text"
              name="username"
              id="username"
              className={`pl-6 bg-gray-50 text-gray-600 border sm:text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-1 ${
                errors.username
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
              autocomplete="off"
              aria-autocomplete="list"
              onChange={inputHandle}
              placeholder="Your Username"
              value={state.username}
              onBlur={validate}
            />
          </div>
          {errors.username && (
            <span className="text-sm text-red-500">{errors.username}</span>
          )}
        </div>
        <div class="pb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-[#111827]"
          >
            Password
          </label>
          <div class="relative text-gray-400">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••••"
              className={`pl-6 bg-gray-50 text-gray-600 border sm:text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
              autocomplete="new-password"
              aria-autocomplete="list"
              onChange={inputHandle}
              value={state.password}
              onBlur={validate}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>
        </div>
        <button
          type="submit"
          class="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
        >
          Login
        </button>
        <div class="text-sm font-light text-[#6B7280] ">
          Forgot your password?{" "}
          <a
            href="/forgot-password"
            class="font-medium text-[#4F46E5] hover:underline"
          >
            Reset Password
          </a>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
