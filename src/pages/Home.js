import AktiverterList from "../components/AktiverterList";
import useAxios from "../hooks/useAxios";
export default function Home() {
  const { data, loading } = useAxios({
    url: "http://localhost:4000/api/v1/activities",
    headers: {
      accept: "application/json",
    },
  });

  return (
    <div className="w-[22rem] flex flex-col gap-4 m-auto">
      <h1 className="my-8 text-4xl text-white">Aktiviteter</h1>
      {data &&
        data.map((item) => {
          return <AktiverterList key={item.id} item={item} />;
        })}
    </div>
  );
}
