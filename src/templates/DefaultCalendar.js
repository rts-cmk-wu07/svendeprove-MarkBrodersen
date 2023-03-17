import { useContext } from "react";
import UserDataContext from "../context/UserDataContext";
import useAxios from "../hooks/useAxios";
import CalendarList from "../components/CalendarList";
import { useEffect, useState } from "react";

export default function DefaultCalendar({ users }) {
  const { userData } = useContext(UserDataContext);
  const [rosterData, setRosterData] = useState(null);
  const { data, loading } = useAxios({
    url: `http://localhost:4000/api/v1/activities`,
    headers: {
      accept: "application/json",
    },
  });
  useEffect(() => {
    (async function () {
      const rosterActivities =
        data && data.filter((ids) => ids.instructorId === userData);
      setRosterData(rosterActivities);
    })();
  }, [data]);

  return (
    <>
      {users && users.role === "instructor" ? (
        <section className="w-[90%] m-auto">
          <h1 className="text-white text-4xl pt-12 mb-6">Kalender</h1>
          <div className="flex flex-col gap-4">
            {rosterData &&
              rosterData.map((item) => (
                <CalendarList key={item.id} item={item} data={users} />
              ))}
          </div>
        </section>
      ) : (
        <section className="w-[90%] m-auto">
          <h1 className="text-white text-4xl pt-12 mb-6">Kalender</h1>
          <div className="flex flex-col gap-4">
            {users &&
              users.activities.map((item) => (
                <CalendarList key={item.id} item={item} data={users} />
              ))}
          </div>
        </section>
      )}
    </>
  );
}
