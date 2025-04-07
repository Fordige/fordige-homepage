import { RiServiceFill } from "react-icons/ri";
import { MdContactMail, MdLanguage } from "react-icons/md";
import { BsFillPersonLinesFill, BsLamp } from "react-icons/bs";
import { useState } from "react";

import smallLogo from "../../assets/small_logo_1_1.svg";
import lightToggle from "../../assets/light-toggle.svg";
import darkToggle from "../../assets/dark-toggle.svg";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="to-shadow2 fixed top-0 flex h-[5rem] w-full items-center justify-center bg-gradient-to-r from-highlight px-8 py-2">
      <div className="h-[4.25rem] w-[4.25rem]">
        <img className="h-full w-full" src={smallLogo} alt="smallLogo" />
      </div>
      <div className="font-xxs font-sf flex h-[4rem] w-[35.88rem] items-end justify-around font-medium">
        <button className="flex items-end justify-center gap-1">
          <BsFillPersonLinesFill className="h-[2rem] w-[2rem]" />
          <span>關於我們</span>
        </button>
        <button className="flex items-end justify-center gap-1">
          <RiServiceFill className="h-[2rem] w-[2rem]" />
          <span>服務內容</span>
        </button>
        <button className="flex items-end justify-center gap-1">
          <MdContactMail className="h-[2rem] w-[2rem]" />
          <span>聯絡我們</span>
        </button>
      </div>
      <div className="flex h-[4rem] w-[35.88rem] items-start justify-end gap-[1rem]">
        <div className="flex h-[1.5rem] w-[8.25rem] items-center justify-between">
          <MdLanguage className="h-[1.5rem] w-[1.5rem]" />
          <select
            className="w-[6.25rem] cursor-pointer rounded-[0.5rem] border-[0.125rem] border-black"
            name=""
            id=""
          >
            <option value="">繁體中文</option>
            <option value="">English</option>
          </select>
        </div>
        <div className="flex h-[1.5rem] w-[5.5rem] items-center justify-between">
          <BsLamp className="h-[1.5rem] w-[1.5rem]" />
          <button onClick={handleToggle}>
            <img
              src={isDarkMode ? darkToggle : lightToggle}
              alt="lightToggle"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
