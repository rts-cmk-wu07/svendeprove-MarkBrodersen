import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AktiverterList from "../components/AktiverterList";
import useAxios from "../hooks/useAxios";
export default function Home() {
  const { data, loading } = useAxios({
    url: "http://localhost:4000/api/v1/activities",
    headers: {
      accept: "application/json",
    },
  });
  const [height, setHeight] = useState(0);
  const slider = useRef();

  useEffect(() => {
    setHeight(slider.current.scrollHeight - slider.current.offsetHeight);
  }, []);

  // console.log(height);

  return (
    <motion.div className="w-[22rem] m-auto">
      <motion.div
        ref={slider}
        className="flex flex-col gap-4 pb-24"
        drag="y"
        dragConstraints={{ right: 0, left: -height }}
      >
        <h1 className="my-8 text-4xl text-white">Aktiviteter</h1>
        {data &&
          data.map((item) => {
            return <AktiverterList key={item.id} item={item} />;
          })}
      </motion.div>
    </motion.div>
  );
}
