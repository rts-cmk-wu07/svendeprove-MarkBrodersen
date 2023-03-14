import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./templates/Layout";
import Home from "./pages/Home";
import TokenContext from "./context/TokenContext";
import { useState } from "react";
import Calendar from "./pages/Calendar";
import Search from "./pages/Search";
import AktiverterDetails from "./pages/AktiverterDetails";
import Welcome from "./pages/Welcome";

export default function App() {
  const [token, setToken] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        sessionStorage.getItem("key") !== "true" ? <Welcome /> : <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/aktiverterDetails/:id",
          element: <AktiverterDetails />,
        },
        {
          path: "/calendar",
          element: <Calendar />,
        },
        {
          path: "/search",
          element: <Search />,
        },
      ],
    },
  ]);
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <RouterProvider router={router} />
    </TokenContext.Provider>
  );
}
