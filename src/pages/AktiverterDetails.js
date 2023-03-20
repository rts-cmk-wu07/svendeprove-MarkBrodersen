import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import TokenContext from "../context/TokenContext";
import LogInd from "./LogInd";
import { AnimatePresence, motion } from "framer-motion";
import UserDataContext from "../context/UserDataContext";
import axios from "axios";
import Loading from "../components/animations/Loading";
import ButtonLoading from "../components/animations/ButtonLoading";
import ModalContext from "../context/ModalContext";

export default function AktiverterDetails() {
  const { token } = useContext(TokenContext);
  const { userData } = useContext(UserDataContext);
  const [tilmeldLoading, setTilmeldLoading] = useState(false);
  const { modal, setModal } = useContext(ModalContext);
  const [checker, setChecker] = useState(null);
  const id = useParams().id;
  const [error, setError] = useState(null);
  const { data, loading } = useAxios({
    url: `http://localhost:4000/api/v1/activities/${id}`,
    headers: {
      accept: "application/json",
    },
  });

  const { data: users } = useAxios({
    url: `http://localhost:4000/api/v1/users/${userData}`,

    headers: {
      Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    const userId = data && data?.users.map((user) => user.id);
    if (userId && userId.includes(userData) === false) {
      setChecker(false);
    } else {
      setChecker(true);
    }
  }, [data]);

  async function handleTilmeld(event) {
    setTilmeldLoading(true);
    event.preventDefault();
    if (checker === false) {
      await handleSubmit();
    }
    if (checker === true) {
      await handleDelete();
    }
    setTilmeldLoading(false);
  }
  async function handleSubmit() {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/users/${userData}/activities/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setError(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setChecker(true);
  }
  async function handleDelete() {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/users/${userData}/activities/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setError(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setChecker(false);
  }

  function ageCals() {
    if (users?.age > data?.maxAge) {
      return true;
    }
    if (users?.age <= data?.minAge) {
      return true;
    }
    return false;
  }
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        data && (
          <>
            <img
              className="h-[31rem] w-full object-cover"
              src={data.asset.url}
              alt={data.name}
            />
            {token === "" ? (
              <button
                onClick={() => {
                  setModal(!modal);
                }}
                className="absolute top-1/2 -translate-y-6 right-8 px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
              >
                Log Ind
              </button>
            ) : tilmeldLoading ? (
              <button className="absolute top-1/2 -translate-y-6 right-8 px-20 py-4 max-h-14 shadow-lg text-white rounded-xl bg-primary-200">
                <ButtonLoading />
              </button>
            ) : ageCals() ? (
              <input
                type="submit"
                value="Alders begrænset"
                className="absolute top-1/2 -translate-y-6 right-8 px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
              />
            ) : checker === false ? (
              <input
                type="submit"
                value="Tilmeld"
                onClick={handleTilmeld}
                className="absolute top-1/2 -translate-y-6 right-8 px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
              />
            ) : checker === true ? (
              <input
                type="submit"
                value="Forlad"
                onClick={handleTilmeld}
                className="absolute top-1/2 -translate-y-6 right-8 px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
              />
            ) : null}

            <AnimatePresence>
              {modal ? <LogInd modal={modal} setModal={setModal} /> : null}
              {error ? (
                <motion.h2
                  initial={{ translateY: "-100%" }}
                  animate={{ translateY: "0%" }}
                  exit={{ translateX: "-100%" }}
                  className="absolute top-0 left-0 text-white text-4xl py-8 w-full mb-4 px-4 bg-red-600/50"
                >
                  Der er sket en fejl prøv igen senere.
                </motion.h2>
              ) : null}
            </AnimatePresence>
            <div className="text-white p-8">
              <h2 className="text-2xl">{data.name}</h2>
              <span className="text-[18px]">
                {data.minAge} - {data.maxAge}
              </span>
              <p className="text-[18px]">{data.description}</p>
            </div>
          </>
        )
      )}
    </div>
  );
}
