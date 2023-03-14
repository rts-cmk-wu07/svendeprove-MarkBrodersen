import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/sub-components/Input.js";
import TokenContext from "../context/TokenContext.js";
import { motion } from "framer-motion";
import backgroundImage from "../mockups/splash-image.jpg";
import { X } from "lucide-react";

export default function LogInd({ modal, setModal }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token, setToken } = useContext(TokenContext);
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:4000/auth/token", {
        username: username,
        password: password,
      })
      .then(function (response) {
        setToken(response.data.token, {
          days: 10,
        });
        setModal(!modal);
      })
      .catch(function (error) {});
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
      className="w-screen h-screen absolute top-0 left-0"
    >
      <div
        onClick={() => {
          setModal(!modal);
        }}
        className="z-[60] w-12 h-12 mt-8 ml-8 flex justify-center items-center bg-primary-200 text-white rounded-full relative"
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
        <button
          className="px-24 py-4 shadow-lg text-white rounded-xl bg-primary-200"
          type="submit"
        >
          Log ind
        </button>
      </form>
    </motion.div>
  );
}
