import { RiServiceFill } from "react-icons/ri";
import { MdContactMail, MdLanguage } from "react-icons/md";
import { BsFillPersonLinesFill, BsLamp } from "react-icons/bs";

import smallLogo from "../../assets/small_logo_1_1.svg";
import SmallLogoLight from "../../assets/small_logo_light_1_1.svg";
import lightToggle from "../../assets/light-toggle.svg";
import darkToggle from "../../assets/dark-toggle.svg";
import useLanguageStore from "../../store/languageStore";
import useModeStore from "../../store/modeStore";
import { useEffect } from "react";

function Navbar() {
  const { isDarkMode, setIsDarkMode } = useModeStore();
  const { setLanguage, content } = useLanguageStore();
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className="fixed top-0 z-10 flex h-[5rem] w-full items-center justify-between bg-highlight px-8 py-2 dark:bg-gradient-to-b dark:from-highlight dark:to-shadow2">
      <div className="h-[4.25rem] w-[4.25rem]">
        <img
          className="h-full w-full"
          src={isDarkMode ? smallLogo : SmallLogoLight}
          alt="smallLogo"
        />
      </div>
      <div className="font-xxs flex h-[4rem] w-[35.88rem] items-end justify-around font-sf font-medium">
        <button className="flex items-end justify-center gap-1">
          <BsFillPersonLinesFill className="h-[2rem] w-[2rem] fill-[url(#myGradient)] dark:fill-black" />
          <span className="bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text text-transparent dark:text-shadow3">
            {content.head_about_us}
          </span>
          <svg width="0" height="0" className="absolute">
            <defs>
              <radialGradient id="myGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1A8C16" />
                <stop offset="100%" stopColor="#20591E" />
              </radialGradient>
            </defs>
          </svg>
        </button>
        <button className="flex items-end justify-center gap-1">
          <RiServiceFill className="h-[2rem] w-[2rem] fill-[url(#myGradient)] dark:fill-black" />

          <span className="bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text text-transparent dark:text-shadow3">
            {content.head_service_content}
          </span>
        </button>
        <button className="flex items-end justify-center gap-1">
          <MdContactMail className="h-[2rem] w-[2rem] fill-[url(#myGradient)] dark:fill-black" />
          <span className="bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text text-transparent dark:text-shadow3">
            {content.head_contact_us}
          </span>
        </button>
      </div>
      <div className="flex h-[4rem] w-[35.88rem] items-start justify-end gap-[1rem]">
        <div className="flex h-[1.5rem] w-[8.25rem] items-center justify-between">
          <MdLanguage className="h-full w-[1.5rem] fill-[url(#myGradient)] dark:fill-black" />
          <select
            className="w-[6.25rem] cursor-pointer rounded-[0.5rem] border-[0.125rem] border-midtone dark:border-black"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="zh">繁體中文</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="flex h-[1.5rem] w-[5.5rem] items-center gap-[0.5rem]">
          <BsLamp className="h-full w-[1.5rem] fill-[url(#myGradient)] dark:fill-black" />
          <button onClick={handleToggle}>
            <img
              className="h-full w-[3.5rem]"
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
