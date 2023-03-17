import axios from "axios";
import UserDataContext from "../context/UserDataContext";
import { useContext, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import TokenContext from "../context/TokenContext";

export default function InstructorCalendar() {
  // ? Brug for data, userData, token, axios, useState, useEffect, useContext,

  // ! UserData = user id
  // ! token = token
  const { userData } = useContext(UserDataContext);
  const { token } = useContext(TokenContext);
  const [rosterData, setRosterData] = useState(null);
  const { data, loading } = useAxios({
    url: `http://localhost:4000/api/v1/activities`,
    headers: {
      accept: "application/json",
    },
  });
  useEffect(() => {
    (async function () {
      const activities = data ? data.map((item) => item.id) : "";
      const userId =
        activities && activities.filter((activity) => activity === userData);
      if (userId.length >= 0) {
        const response = await axios.get(
          `http://localhost:4000/api/v1/users/${userData}/roster/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setRosterData(response);
      }
    })();
  }, [data]);
  return (
    <section className="w-[90%] m-auto text-white">
      <h1></h1>
      {rosterData &&
        rosterData.data.map((name) => (
          <p>
            {name.firstname} {name.lastname}
          </p>
        ))}
    </section>
  );
}
