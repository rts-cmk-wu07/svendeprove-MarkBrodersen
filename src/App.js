import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./templates/Layout";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Welcome from "./pages/Welcome";
import SearchPage from "./pages/SearchPage";
import InstructorCalendar from "./templates/InstructorCalendar";
import AktiverterDetails from "./pages/AktiverterDetails";
import TokenContext from "./context/TokenContext";
import UserDataContext from "./context/UserDataContext";
import ModalContext from "./context/ModalContext";
import { getCookie } from "react-use-cookie";

export default function App() {
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useState("");
  const [modal, setModal] = useState(false);
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
          path: "/holdOversigt/:id",
          element: <InstructorCalendar />,
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
        <ModalContext.Provider value={{ modal, setModal }}>
          <RouterProvider router={router} />
        </ModalContext.Provider>
      </UserDataContext.Provider>
    </TokenContext.Provider>
  );
}
