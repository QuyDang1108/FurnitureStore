import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoute } from "./router/routes/index";
import { get_user_info, log_out } from "./store/Reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const route = getRoute();
    setAllRoutes([...allRoutes, route]);
  }, []);

  const get_role = (token) => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirateTime = new Date(decodedToken.exp * 1000);
      if (expirateTime < new Date()) {
        localStorage.removeItem("accessToken");
        return "";
      } else {
        return decodedToken.sub;
      }
    } else {
      return "";
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const role = get_role(token);
      if (!role) {
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else {
        dispatch(get_user_info());
      }
    }
  }, [dispatch, navigate]);

  return <Router allRoutes={allRoutes} />;
}

export default App;
