import { motion } from "framer-motion";
import AktiverterList from "../components/AktiverterList";
import useAxios from "../hooks/useAxios";
import Loading from "../components/animations/Loading";

export default function Home() {
  const { data, loading } = useAxios({
    url: "http://localhost:4000/api/v1/activities",
    headers: {
      accept: "application/json",
    },
  });
  return (
    <div className="pt-8 w-[90%] pb-24 m-auto flex flex-col gap-8">
      <h1 className="my-4 text-4xl text-white">Aktiviteter</h1>
      {loading ? (
        <div className="w-full m-auto">
          <Loading />
        </div>
      ) : (
        data &&
        data.map((item) => {
          return <AktiverterList key={item.id} item={item} />;
        })
      )}
    </div>
  );
}
