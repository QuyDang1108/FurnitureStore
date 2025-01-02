import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { user_register, messageClear } from "../../store/Reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-hot-toast";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    address: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    phoneError: "",
    fullNameError: "",
    addressError: "",
    dateOfBirthError: "",
    genderError: "",
  });

  const validate = () => {
    let valid = true;
    let passwordError = "";
    let emailError = "";
    let phoneError = "";
    let fullNameError = "";
    let addressError = "";
    let dateOfBirthError = "";
    let genderError = "";

    if (!state.password) {
      passwordError = "Password is required";
      valid = false;
    } else if (state.password.length < 6) {
      passwordError = "Password must be at least 6 characters";
      valid = false;
    } else {
      passwordError = "";
    }

    if (!state.email) {
      emailError = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      emailError = "Email is invalid";
      valid = false;
    } else {
      emailError = "";
    }

    if (!state.phone) {
      phoneError = "Phone is required";
      valid = false;
    } else if (state.phone.length < 10) {
      phoneError = "Phone must be at least 10 characters";
      valid = false;
    } else if (/[^0-9]/.test(state.phone)) {
      phoneError = "Phone must be a number";
      valid = false;
    } else {
      phoneError = "";
    }

    if (!state.fullName) {
      fullNameError = "Name is required";
      valid = false;
    } else {
      fullNameError = "";
    }

    if (!state.address) {
      addressError = "Address is required";
      valid = false;
    } else {
      addressError = "";
    }

    if (!state.dateOfBirth) {
      dateOfBirthError = "Date of birth is required";
      valid = false;
    } else {
      dateOfBirthError = "";
    }

    if (!state.gender) {
      genderError = "Gender is required";
      valid = false;
    } else {
      genderError = "";
    }

    setErrors({
      passwordError,
      emailError,
      phoneError,
      fullNameError,
      addressError,
      dateOfBirthError,
      genderError,
    });

    return valid;
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(user_register(state));
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
        Sign up for an account on FurniStyle.
      </div>
      <form class="flex flex-col" onSubmit={submit}>
        <div class="pb-2">
          <label
            for="fullName"
            class="block mb-2 text-sm font-medium text-[#111827]"
          >
            Full Name
          </label>
          <div class="relative text-gray-400">
            <input
              type="text"
              name="fullName"
              id="fullName"
              className={`pl-6 bg-gray-50 text-gray-600 border sm:text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-1 ${
                errors.fullNameError
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
              placeholder="Full Name"
              autocomplete="off"
              value={state.fullName}
              onChange={inputHandle}
              onBlur={validate}
            />
            {errors.fullNameError && (
              <span className="text-sm text-red-500">
                {errors.fullNameError}
              </span>
            )}
          </div>
        </div>
        <div class="pb-2">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-[#111827]"
          >
            Email
          </label>
          <div class="relative text-gray-400">
            <input
              type="email"
              name="email"
              id="email"
              className={`pl-6 bg-gray-50 text-gray-600 border sm:text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-1 ${
                errors.emailError
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
              placeholder="name@company.com"
              autocomplete="off"
              value={state.email}
              onChange={inputHandle}
              onBlur={validate}
            />
            {errors.emailError && (
              <span className="text-sm text-red-500">{errors.emailError}</span>
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
                errors.passwordError
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
              autocomplete="new-password"
              aria-autocomplete="list"
              value={state.password}
              onChange={inputHandle}
              onBlur={validate}
            />
            {errors.passwordError && (
              <span className="text-sm text-red-500">
                {errors.passwordError}
              </span>
            )}
          </div>
        </div>
        <div class="pb-6">
          <label
            for="address"
            class="block mb-2 text-sm font-medium text-[#111827]"
          >
            Address
          </label>
          <div class="relative text-gray-400">
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Your Address"
              className={`pl-6 bg-gray-50 text-gray-600 border sm:text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-1 ${
                errors.addressError
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
              autocomplete="off"
              aria-autocomplete="list"
              value={state.address}
              onChange={inputHandle}
              onBlur={validate}
            />
            {errors.addressError && (
              <span className="text-sm text-red-500">
                {errors.addressError}
              </span>
            )}
          </div>
        </div>
        <div class="pb-6">
          <label
            for="phone"
            class="block mb-2 text-sm font-medium text-[#111827]"
          >
            Phone
          </label>
          <div class="relative text-gray-400">
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Your Phone Number"
              className={`pl-6 bg-gray-50 text-gray-600 border sm:text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-1 ${
                errors.phoneError
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
              autocomplete="off"
              aria-autocomplete="list"
              value={state.phone}
              onChange={inputHandle}
              onBlur={validate}
            />
            {errors.phoneError && (
              <span className="text-sm text-red-500">{errors.phoneError}</span>
            )}
          </div>
        </div>

        <div class="pb-2">
          <label
            for="dateOfBirth"
            class="block mb-2 text-sm font-medium text-[#111827]"
          >
            Date of Birth
          </label>
          <div class="relative text-gray-400">
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className={`pl-6 bg-gray-50 text-gray-600 border sm:text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-1 ${
                errors.dateOfBirthError
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
              value={state.dateOfBirth}
              onChange={inputHandle}
              onBlur={validate}
            />
            {errors.dateOfBirthError && (
              <span className="text-sm text-red-500">
                {errors.dateOfBirthError}
              </span>
            )}
          </div>
        </div>
        {/* New gender field */}
        <div class="pb-6">
          <label
            for="gender"
            class="block mb-2 text-sm font-medium text-[#111827]"
          >
            Gender
          </label>
          <div class="relative text-gray-400">
            <select
              name="gender"
              id="gender"
              className={`pl-6 bg-gray-50 text-gray-600 border sm:text-sm rounded-lg block w-full p-3 focus:outline-none focus:ring-1 ${
                errors.genderError
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-gray-400"
              }`}
              value={state.gender}
              onChange={inputHandle}
              onBlur={validate}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.genderError && (
              <span className="text-sm text-red-500">{errors.genderError}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          class="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
        >
          Sign Up
        </button>
        <div class="text-sm font-light text-[#6B7280] ">
          Already have an account?{" "}
          <a href="/login" class="font-medium text-[#4F46E5] hover:underline">
            Login
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

export default Register;
