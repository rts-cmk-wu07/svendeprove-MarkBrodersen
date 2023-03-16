import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import TokenContext from "../context/TokenContext";
import LogInd from "./LogInd";
import { AnimatePresence } from "framer-motion";
import UserDataContext from "../context/UserDataContext";
import axios from "axios";

export default function AktiverterDetails() {
  const { token } = useContext(TokenContext);
  const { userData } = useContext(UserDataContext);
  const [modal, setModal] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const id = useParams().id;
  const { data, loading } = useAxios({
    url: `http://localhost:4000/api/v1/activities/${id}`,
    headers: {
      accept: "application/json",
    },
  });
  const userId = data && data.users.map((user) => user.id);
  const userIdIndex = userId && userId.shift();
  function HandleClick() {
    if (userId && userId.includes(userData) === true) {
      setSignUp(true);
    } else {
      setSignUp(false);
    }
  }
  console.log(signUp);
  console.log(data && data.users);
  console.log(userId && userId);
  console.log(userData);
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

      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(token);
  // console.log(userData);
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
              onClick={() => {
                setModal(!modal);
              }}
              className="absolute top-1/2 -translate-y-6 right-8 px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
            >
              Log Ind
            </button>
          ) : null}
          {signUp ? (
            <button
              onClick={() => handleSubmit}
              className="absolute top-1/2 -translate-y-6 right-8 px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
            >
              Tilmeld
            </button>
          ) : null}
          {signUp === false ? (
            <button
              onClick={() => handleDelete}
              className="absolute top-1/2 -translate-y-6 right-8 px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
            >
              Forlad
            </button>
          ) : null}

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
