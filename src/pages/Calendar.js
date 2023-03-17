import { useContext } from "react";
import TokenContext from "../context/TokenContext";
import UserDataContext from "../context/UserDataContext";
import useAxios from "../hooks/useAxios";
import DefaultCalendar from "../templates/DefaultCalendar";

export default function Calendar() {
  const { userData } = useContext(UserDataContext);
  const { token } = useContext(TokenContext);

  const { data } = useAxios({
    url: `http://localhost:4000/api/v1/users/${userData}`,

    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return (
    <div className="w-[90%] m-auto">
      <DefaultCalendar users={data} />
    </div>
  );
}
