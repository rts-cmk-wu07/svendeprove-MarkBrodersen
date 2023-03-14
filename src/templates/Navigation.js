import { Home, Search, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="z-30 flex justify-between items-center fixed bottom-0 bg-primary-100 w-screen h-16 px-12">
      <Link to="/" className="border border-black rounded-full p-2">
        <Home />
      </Link>
      <Link to="/search" className="border border-black rounded-full p-2">
        <Search />
      </Link>
      <Link to="/calendar" className="border border-black rounded-full p-2">
        <Calendar />
      </Link>
    </div>
  );
}
