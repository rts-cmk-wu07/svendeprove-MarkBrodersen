import axios from "axios";
import { useState, useContext } from "react";
import Input from "../components/sub-components/Input.js";
import TokenContext from "../context/TokenContext.js";
import { motion } from "framer-motion";
import backgroundImage from "../mockups/splash-image.jpg";
import { X } from "lucide-react";
import useCookie from "react-use-cookie";

export default function LogInd({ modal, setModal, nav }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [checked, setChecked] = useState(false);
  const { token, setToken } = useContext(TokenContext);
  const [cookie, setCookie] = useCookie("token", 0);
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/auth/token", {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (checked) {
          console.log(response.data);
          setCookie(JSON.stringify(response.data));
        }
        setToken(response.data.token);
        console.log(response.data);
        setUserId(response.data.userId);
        setModal(!modal);
      })
      .catch(function (error) {});
  }
  console.log(userId);
  // axios.get(
  //   `http://localhost:4000/api/v1/users/${userId}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );
  return (
    <>
      {nav ? (
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
                  className="z-50 w-[20rem] translate-y-[100%] flex flex-col absolute top-1/2 left-1/2"
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
                  <button
                    className="px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
                    type="submit"
                  >
                    Log ind
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              ease: "easeInOut",
            },
          }}
          exit={{ translateX: "-100%" }}
          className="w-screen h-screen absolute top-0 left-0"
        >
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
            className="z-50 w-[80%] -translate-x-1/2 -translate-y-1/2 flex flex-col absolute top-1/2 left-1/2"
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
            <button
              className="px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
              type="submit"
            >
              Log ind
            </button>
          </form>
        </motion.div>
      )}
    </>
  );
}
