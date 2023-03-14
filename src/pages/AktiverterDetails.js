import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import TokenContext from "../context/TokenContext";
import LogInd from "./LogInd";
import { AnimatePresence } from "framer-motion";

export default function AktiverterDetails() {
  const { token } = useContext(TokenContext);
  const [modal, setModal] = useState(false);
  const id = useParams().id;
  const { data, loading } = useAxios({
    url: `http://localhost:4000/api/v1/activities/${id}`,
    headers: {
      accept: "application/json",
    },
  });
  function handleModal() {
    setModal(!modal);
  }
  return (
    <div>
      {data && (
        <>
          <img
            className="h-[31rem] w-full object-cover"
            src={data.asset.url}
            alt={data.name}
          />
          {token === "" ? (
            <button
              onClick={handleModal}
              className="absolute top-1/2 -translate-y-6 right-8 px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
            >
              Log Ind
            </button>
          ) : (
            <button className="absolute top-1/2 right-8 px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200">
              Tilmeld
            </button>
          )}
          <AnimatePresence>
            {modal ? <LogInd modal={modal} setModal={setModal} /> : null}
          </AnimatePresence>
          <div className="text-white p-8">
            <h2 className="text-2xl">{data.name}</h2>
            <span className="text-[18px]">
              {data.minAge} - {data.maxAge}
            </span>
            <p className="text-[18px]">{data.description}</p>
          </div>
        </>
      )}
    </div>
  );
}
