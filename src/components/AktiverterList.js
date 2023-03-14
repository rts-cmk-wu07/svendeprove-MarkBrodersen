import { Link } from "react-router-dom";

export default function AktiverterList({ item }) {
  return (
    <Link
      to={`/aktiverterDetails/${item.id}`}
      className="w-[22rem] h-[22rem] rounded-[3rem] relative"
    >
      <img
        src={item.asset.url}
        alt={item.name}
        className="h-full w-full rounded-[3rem] rounded-br-none"
      />
      <div className="bg-primary-300 bg-opacity-80 w-full h-24 rounded-tr-[3rem] rounded-bl-[3rem] absolute bottom-0 z-20">
        <div className="pt-5 pl-5">
          <p className="font-semibold">{item.name}</p>
          <p className="font-semibold">
            {item.minAge} - {item.maxAge}
          </p>
        </div>
      </div>
    </Link>
  );
}
