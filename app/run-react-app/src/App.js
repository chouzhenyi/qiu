import "./App.css";
import "antd/dist/reset.css";
import { Link, Route, Routes } from "react-router-dom";
import { routes } from "./router/index";
import { Menu } from "antd";

function App() {
  const routesMenuItems = routes.map((route, index) => ({
    key: index,
    label: (
      <Link to={route.path} key={index}>
        {route.title}
      </Link>
    ),
    title: route.title,
  }));
  return (
    <div className="App">
      <Menu items={routesMenuItems} mode="horizontal" />
      <Routes>
        {routes.map((route, index) => (
          <Route path={route.path} element={<route.component />} key={index} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
