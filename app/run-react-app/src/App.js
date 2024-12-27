import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { routes } from "./router/index";

function App() {
  return (
    <div className="App">
      {routes.map((route, index) => (
        <Link to={route.path} key={index}>
          {route.title}
        </Link>
      ))}
      <Routes>
        {routes.map((route, index) => (
          <Route path={route.path} element={<route.component />} key={index} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
