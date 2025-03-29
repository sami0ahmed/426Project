import { useState, useEffect } from "react";
import { Search, Moon, Sun, MapPlus } from "lucide-react";
import Loginpage from "./Loginpopup";
import "./dialogue.css";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [darkmode, setMode] = useState(false);

  //Darkmode change not implimented
  const changeMode = () => {
    setMode(!darkmode);
  };

  //Sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ModalDialog = ({ onClose }: { onClose: () => void }) => {
    return (
      <div className="modal relative"> 
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline text-white"
        >
          x
        </button>
        <div className="p-4"> 
          <Loginpage />
        </div>
      </div>
    );
  };
  const [showDialog, setShowDialog] = useState(false);

  return (
    <nav
      className={`sticky top-0 z-10 w-full flex-wrap items-center justify-between py-2 shadow-md transition-all duration-300 ${
        isSticky ? "bg-zinc-50 dark:bg-neutral-800" : "bg-transparent"
      } lg:py-4`}
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <span className="ms-2 text-xl font-semibold text-white dark:text-white">
          EventChamp
        </span>
        <div className="flex w-full md:w-[50%] lg:w-[30%] items-center justify-between mt-5 lg:mt-0">
          <button className="bg-black hover:bg-white hover:text-white font-bold py-2 px-2 rounded mr-2" onClick={() =>
              showDialog == false ? setShowDialog(true) : setShowDialog(false)
            }>
            Login
          </button>
          {showDialog && <ModalDialog onClose={() => setShowDialog(false)} />}
          <button className="bg-black hover:bg-white hover:text-white font-bold py-2 px-2 rounded mr-2">
            <MapPlus></MapPlus>
          </button>
          <button
            className="bg-black hover:bg-white hover:text-white font-bold py-2 px-2 rounded mr-2"
            onClick={changeMode}
          >
            {darkmode ? <Sun /> : <Moon />}
          </button>
          <form className="relative flex w-full">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for name, value, or category"
                required
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
