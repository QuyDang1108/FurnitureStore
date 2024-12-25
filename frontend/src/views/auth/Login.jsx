import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { user_login, messageClear } from "../../store/Reducers/authReducer";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

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
    dispatch(user_login(state));
  };

  const overrideStyle = {
    dislay: "flex",
    margin: "0 auto",
    height: "50%",
    justifyContent: "center",
    alignItem: "center",
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
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <h2 className="text-xl mb-3 font-bold">Welcome to FurniStyle</h2>

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
              className="bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Sign In"
              )}
            </button>

            <p className="mt-4 text-center text-sm text-white">
              Don't have account?
              <a
                href="/register"
                className="font-bold leading-6 text-indigo-100 
                            hover:text-green-400"
              >
                {" "}
                Sign Up Now
              </a>
            </p>

            <p className="mt-4 text-center text-sm text-white">
              Forgot your password?
              <a
                href="/forgot-password"
                className="font-bold leading-6 text-indigo-100 
                            hover:text-green-400"
              >
                {" "}
                Forgot password
              </a>
            </p>

            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <div
                className="w-[135px] h-[35px] flex rounded-md 
                                bg-orange-700 shadow-lg hover:bg-orange-700/50 
                                justify-center cursor-pointer items-center overflow-hidden"
              >
                <span>
                  <FaGoogle />
                </span>
              </div>

              <div
                className="w-[135px] h-[35px] flex rounded-md 
                                bg-blue-700 shadow-lg hover:bg-blue-700/50 
                                justify-center cursor-pointer items-center overflow-hidden"
              >
                <span>
                  <FaFacebook />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
