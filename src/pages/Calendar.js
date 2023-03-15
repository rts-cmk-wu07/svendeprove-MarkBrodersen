import { useContext } from "react";
import UserDataContext from "../context/UserDataContext";
import DefaultCalendar from "../templates/DefaultCalendar";
import InstructorCalendar from "../templates/InstructorCalendar";

export default function Calendar() {
  const { userData } = useContext(UserDataContext);
  return (
    <div>
      {userData.role === "Instructor" ? (
        <InstructorCalendar />
      ) : (
        <DefaultCalendar />
      )}
    </div>
  );
}
