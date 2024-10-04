import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { getRoute } from './router/routes/index';

function App() {
  
  const [allRoutes, setAllRoutes] = useState([...publicRoutes])

  useEffect(() => {
    const route = getRoute()
    setAllRoutes([...allRoutes, route])
  }, [])

  return <Router allRoutes={allRoutes} />
}

export default App;
