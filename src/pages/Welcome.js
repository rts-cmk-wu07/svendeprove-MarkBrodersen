import { useNavigate } from "react-router-dom";
import backgroundImage from "../mockups/splash-image.jpg";
export default function Welcome() {
  const navigate = useNavigate();
  sessionStorage.setItem("key", "false");
  function handleClick() {
    sessionStorage.setItem("key", "true");
    navigate(0);
  }

  return (
    <>
      <img
        className="fixed top-0 left-0 w-screen h-screen object-cover"
        src={backgroundImage}
        alt=""
      />

      <div className="absolute bottom-1/3 -translate-y-12 left-8 z-30 leading-[3rem]">
        <h1 className="textStroke">LANDRUP</h1>
        <p className="pinkWelcomeText">DANS</p>
        <div className="w-72 h-4 translate-y-5 -ml-12 bg-extra-300"></div>
      </div>
      <button
        onClick={handleClick}
        className="absolute  z-30 bottom-16 left-1/2 -ml-[7.5rem] w-60 py-4 shadow-lg text-white rounded-xl bg-primary-200"
      >
        Kom i gang
      </button>
    </>
  );
}
