import axios from "axios";
import { useState, useContext } from "react";
import TokenContext from "../context/TokenContext.js";
import { motion } from "framer-motion";
import useCookie from "react-use-cookie";
import ButtonLoading from "../components/animations/ButtonLoading.js";
import Input from "../components/sub-components/Input.js";
import backgroundImage from "../mockups/splash-image.jpg";
import { X } from "lucide-react";
import UserDataContext from "../context/UserDataContext.js";

export default function LogInd({ modal, setModal, nav }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(UserDataContext);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(TokenContext);
  const [cookie, setCookie] = useCookie("token", 0);
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/auth/token", {
        username: username,
        password: password,
      })
      .then(function (response) {
        setLoading(true);
        if (checked) {
          setCookie(JSON.stringify(response.data));
        }
        setToken(response.data.token);
        setUserData(response.data.userId);
        setLoading(false);
        setModal(!modal);
        setError(false);
      })
      .catch(function () {
        setError(true);
        setLoading(false);
      });
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          ease: "easeInOut",
        },
      }}
      exit={{ translateX: "-100%" }}
      className="fixed inset-0 -translate-y-8"
    >
      {nav ? (
        <div className="bg-black/20 h-screen ">
          <div className="relative">
            <div className="flex bg-opacity-40 w-12 h-12 mt-8 ml-8  relative">
              <div
                onClick={() => {
                  setModal(!modal);
                }}
                className="z-[60] flex -translate-x-8 items-center bg-opacity-40 w-12 h-12 px-4 mt-8 ml-8 bg-primary-200 text-white rounded-full"
              >
                <X className="w-12 h-12" />
              </div>

              <div className="backgroundGradient -translate-x-8 h-screen w-screen z-50 absolute top-0 left-0"></div>
              <img
                className="w-screen h-screen object-cover translate-y-8 fixed top-0 left-0 overflow-hidden z-40"
                src={backgroundImage}
              />
              <form
                onSubmit={handleSubmit}
                className={
                  error
                    ? "z-50 w-[20rem] translate-y-[50%] flex flex-col absolute top-1/2 left-1/2"
                    : "z-50 w-[20rem] translate-y-[100%] flex flex-col absolute top-1/2 left-1/2"
                }
              >
                <h1 className="text-5xl text-white">Log ind</h1>
                <Input
                  placeholder="brugernavn"
                  type="text"
                  text="Username"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Input
                  placeholder="adgangskode"
                  type="password"
                  text="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <div className="flex gap-4 mb-4">
                  <input
                    value={checked}
                    onChange={() => {
                      setChecked(!checked);
                    }}
                    type="checkbox"
                    name="remeber"
                    id="remeber"
                  />

                  <label className="text-white" htmlFor="remeber">
                    Husk mig
                  </label>
                </div>
                {error ? (
                  <p className=" text-white mb-8">
                    Der er en fejl ved inden brugnavn eller adgangskode.
                  </p>
                ) : null}
                {loading ? (
                  <button
                    className="px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
                    type="submit"
                  >
                    <ButtonLoading />
                  </button>
                ) : (
                  <button
                    className="px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
                    type="submit"
                  >
                    Log ind
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            onClick={() => {
              setModal(!modal);
            }}
            className="z-[60] bg-opacity-40 w-12 h-12 mt-8 ml-8 flex justify-center items-center bg-primary-200 text-white rounded-full relative"
          >
            <X className="w-8 h-8" />
          </div>
          <div className="backgroundGradient h-screen w-screen z-50 absolute top-0 left-0"></div>
          <img
            className="w-screen h-screen object-cover fixed top-0 overflow-hidden z-40"
            src={backgroundImage}
            alt=""
          />
          <form
            onSubmit={handleSubmit}
            className={
              error
                ? "z-50 w-[80%] -mt-12 -translate-x-1/2 -translate-y-2/3 flex flex-col absolute top-1/2 left-1/2"
                : "z-50 w-[80%] -mt-12 -translate-x-1/2 -translate-y-1/2 flex flex-col absolute top-1/2 left-1/2"
            }
          >
            <h1 className="text-5xl text-white">Log ind</h1>
            <Input
              placeholder="brugernavn"
              type="text"
              text="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              placeholder="adgangskode"
              type="password"
              text="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="flex gap-2 mb-4">
              <input
                value={checked}
                onChange={() => {
                  setChecked(!checked);
                }}
                type="checkbox"
                name="remeber"
                id="remeber"
              />
              <label className="text-white" htmlFor="remeber">
                Husk mig
              </label>
            </div>
            {error ? (
              <p className="text-white mb-8">
                Der er en fejl ved inden brugnavn eller adgangskode.
              </p>
            ) : null}
            {loading ? (
              <button
                className="px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
                type="submit"
              >
                <ButtonLoading />
              </button>
            ) : (
              <button
                className="px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
                type="submit"
              >
                Log ind
              </button>
            )}
          </form>
        </>
      )}
    </motion.div>
  );
}
