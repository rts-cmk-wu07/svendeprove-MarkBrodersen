import { Link } from "react-router-dom";

export default function CalendarList({ item, data }) {
  return (
    <>
      <Link
        to={
          data.role === "default"
            ? `/aktiverterDetails/${item.id}`
            : `/holdOversigt/${item.id}`
        }
        className="bg-primary-100 px-6 py-4 whitespace-nowrap  rounded-lg w-full block"
      >
        <h2 className="text-4xl font-semibold truncate">{item.name}</h2>
        <p className="text-[18px] font-semibold">
          {item.weekday} {item.time}
        </p>
      </Link>
    </>
  );
}
