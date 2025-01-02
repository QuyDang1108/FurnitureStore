import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { user_login, messageClear } from "../../store/Reducers/authReducer";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    username: "",
  });

  const validate = () => {
    let valid = true;
    let passwordError = "";
    let usernameError = "";

    if (!state.password) {
      passwordError = "Password is required";
      valid = false;
    } else if (state.password.length < 6) {
      passwordError = "Password must be at least 6 characters";
      valid = false;
    }

    if (!state.username) {
      usernameError = "Username is required";
      valid = false;
    } else {
      usernameError = "";
    }

    setErrors({
      password: passwordError,
      username: usernameError,
    });

    return valid;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage } = useSelector(
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
    dispatch(user_login(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }

    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div class="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
      <div class="flex flex-row gap-3 pb-4">
        <div>
          <img src="/images/export.svg" alt="Logo" width="50" />
        </div>
        <h1 class="text-3xl font-boldtext-[#4B5563] my-auto">FurniStyle</h1>
      </div>
      <div class="text-sm font-light text-[#6B7280] pb-8 ">
        Login to your account on FurniStyle.
      </div>
      <form class="flex flex-col" onSubmit={submit}>
        <div class="pb-6">
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
              placeholder="Your Username"
              autocomplete="off"
              aria-autocomplete="list"
              onChange={inputHandle}
              value={state.username}
              onBlur={validate}
            />
            {errors.username && (
              <span className="text-sm text-red-500">{errors.username}</span>
            )}
          </div>
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
          Don't have an accout yet?{" "}
          <a
            href="/register"
            class="font-medium text-[#4F46E5] hover:underline"
          >
            Sign Up
          </a>
        </div>
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
      <div class="relative flex py-8 items-center">
        <div class="flex-grow border-t border-[1px] border-gray-200"></div>{" "}
        <span class="flex-shrink mx-4 font-medium text-gray-500">OR</span>
        <div class="flex-grow border-t border-[1px] border-gray-200"></div>
      </div>
      <form>
        <div class="flex flex-row gap-2 justify-center">
          <button class="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>{" "}
            <span class="font-medium mx-auto">Github</span>
          </button>
          <button class="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-twitter"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>{" "}
            <span class="font-medium mx-auto">Twitter</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
