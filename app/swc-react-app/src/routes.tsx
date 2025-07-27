import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import QueryList from "./pages/QueryList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "query-list", element: <QueryList /> },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
