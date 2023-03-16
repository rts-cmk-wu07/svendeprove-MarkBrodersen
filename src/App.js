import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./templates/Layout";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Welcome from "./pages/Welcome";
import SearchPage from "./pages/SearchPage";
import AktiverterDetails from "./pages/AktiverterDetails";
import TokenContext from "./context/TokenContext";
import UserDataContext from "./context/UserDataContext";
import { getCookie } from "react-use-cookie";

export default function App() {
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState("");
  const cookieToken = getCookie("token");
  useEffect(() => {
    if (cookieToken) {
      const cookieJson = JSON.parse(cookieToken);
      setToken(cookieJson.token);
      setUserData(cookieJson.userId);
    } else return;
  }, []);

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
          element: <SearchPage />,
        },
      ],
    },
  ]);
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <UserDataContext.Provider value={{ userData, setUserData }}>
        <RouterProvider router={router} />
      </UserDataContext.Provider>
    </TokenContext.Provider>
  );
}
