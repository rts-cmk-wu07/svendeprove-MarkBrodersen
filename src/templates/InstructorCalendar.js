import axios from "axios";
import UserDataContext from "../context/UserDataContext";
import { useContext, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import TokenContext from "../context/TokenContext";
import { useNavigate } from "react-router-dom";

export default function InstructorCalendar() {
  const { userData } = useContext(UserDataContext);
  const { token } = useContext(TokenContext);
  const [rosterData, setRosterData] = useState(null);
  const [heading, setHeading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, []);

  const { data } = useAxios({
    url: `http://localhost:4000/api/v1/activities`,
    headers: {
      accept: "application/json",
    },
  });
  useEffect(() => {
    (async function () {
      const rosterActivities =
        data && data.filter((ids) => ids.instructorId === userData);
      setHeading(rosterActivities);
    })();
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
  let singleHeading = heading && heading[0];
  return (
    <section className="w-[90%] m-auto text-white">
      <h1 className="text-4xl pt-8 pb-4">{singleHeading?.name}</h1>
      {rosterData &&
        rosterData.data.map((name) => (
          <p key={name.firstname}>
            {name.firstname} {name.lastname}
          </p>
        ))}
    </section>
  );
}
