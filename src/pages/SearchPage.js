import { Search } from "lucide-react";
import { useState } from "react";
import AktiverterList from "../components/AktiverterList";
import useAxios from "../hooks/useAxios";
export default function SearchPage() {
  const { data, loading } = useAxios({
    url: "http://localhost:4000/api/v1/activities",
    headers: {
      accept: "application/json",
    },
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filter = data?.filter((e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let results = searchQuery !== "" && filter?.length > 0;
  return (
    <div className="w-[90%] h-auto m-auto pb-24">
      <h1 className="text-white text-4xl my pt-12">Søg</h1>
      <form className="flex w-full relative my-4">
        <input
          type="text"
          className="bg-primary-100 opacity-20 w-full px-3 py-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="text-white absolute right-2 top-3" />
      </form>
      {searchQuery === "" || results === false ? (
        <div className="text-center">
          <p className="text-white text-2xl">
            Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget
            andet.
          </p>
        </div>
      ) : null}
      {results && (
        <div className="flex flex-col  gap-8 mt-12">
          {filter.map((item) => {
            return <AktiverterList key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
}
