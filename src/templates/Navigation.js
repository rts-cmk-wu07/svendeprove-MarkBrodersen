import { Home, Search, Calendar, User } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import TokenContext from "../context/TokenContext";
import LogInd from "../pages/LogInd";
import { AnimatePresence } from "framer-motion";
import ModalContext from "../context/ModalContext";

export default function Navigation() {
  const { token } = useContext(TokenContext);
  const { modal, setModal } = useContext(ModalContext);
  return (
    <div className="z-30 flex justify-between items-center fixed bottom-0 bg-primary-100 w-screen h-16 px-12">
      <AnimatePresence>
        {modal ? <LogInd modal={modal} setModal={setModal} nav /> : null}
      </AnimatePresence>
      <Link to="/" className="border border-black rounded-full p-2">
        <Home />
      </Link>
      <Link to="/search" className="border border-black rounded-full p-2">
        <Search />
      </Link>
      {token === "" ? (
        <button
          onClick={() => setModal(!modal)}
          className="border border-black rounded-full p-2"
        >
          <User />
        </button>
      ) : (
        <Link to="/calendar" className="border border-black rounded-full p-2">
          <Calendar />
        </Link>
      )}
    </div>
  );
}
