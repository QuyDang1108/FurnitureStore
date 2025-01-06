import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoute } from "./router/routes/index";
import { get_user_info, getRole, log_out } from "./store/Reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const route = getRoute();
    setAllRoutes([...allRoutes, route]);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const role = getRole(token);
      if (!role) {
        dispatch(log_out({ navigate }));
      } else {
        dispatch(get_user_info());
      }
    }
  }, [dispatch, navigate]);

  return <Router allRoutes={allRoutes} />;
}

export default App;
