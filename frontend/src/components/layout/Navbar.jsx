import { useState, useEffect, cloneElement } from "react";
import { RiServiceFill } from "react-icons/ri";
import { MdContactMail, MdLanguage } from "react-icons/md";
import { BsFillPersonLinesFill, BsLamp, BsFillLampFill } from "react-icons/bs";
import { GoProjectRoadmap } from "react-icons/go";

import smallLogo from "../../assets/navbar/small-logo.svg";
import lightToggle from "../../assets/navbar/light-toggle.svg";
import darkToggle from "../../assets/navbar/dark-toggle.svg";
import useLanguageStore from "../../store/languageStore";
import useModeStore from "../../store/modeStore";

function Navbar({ scrollToSection, currentSection }) {
  const { isDarkMode, setIsDarkMode } = useModeStore();
  const { setLanguage, content, language } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);

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

  // 導航選項數據
  const navItems = [
    {
      name: content.head_about_us,
      icon: <BsFillPersonLinesFill />,
    },
    {
      name: content.head_service_content,
      icon: <RiServiceFill />,
    },
    {
      name: content.head_cooperate_flow,
      icon: <GoProjectRoadmap />,
    },
    {
      name: content.head_contact_us,
      icon: <MdContactMail />,
    },
  ];

  return (
    <nav className="fixed top-0 z-10 flex h-[5rem] w-full items-center justify-around bg-highlight px-8 py-2 dark:bg-gradient-to-b dark:from-highlight dark:to-shadow2">
      {/* Logo */}
      <div className="h-[4.25rem] w-[5.4075rem]">
        <img
          className="h-full w-full cursor-pointer"
          src={smallLogo}
          alt="smallLogo"
          onClick={() => scrollToSection(0)}
        />
      </div>

      {/* 桌面版導航選項 */}
      <div className="hidden h-[4rem] w-[55.8425rem] items-end justify-around font-sf text-xxs font-medium md:flex">
        {navItems.map((item) => (
          <button
            key={item.name}
            className="flex items-end justify-center gap-1"
            onClick={() => scrollToSection(navItems.indexOf(item) + 1)}
          >
            {cloneElement(item.icon, {
              className: `fill-[url(#myGradient)] dark:fill-shadow ${
                currentSection === navItems.indexOf(item) + 1
                  ? "h-[2.5rem] w-[2.5rem]"
                  : "h-[2rem] w-[2rem]"
              }`,
            })}
            <span
              className={`bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text text-transparent dark:text-shadow ${currentSection === navItems.indexOf(item) + 1 ? "text-sm" : ""} `}
            >
              {item.name}
            </span>
          </button>
        ))}
      </div>

      {/* 手機版漢堡選單按鈕 */}
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <svg
            className="h-8 w-8 text-[url(#myGradient)] dark:text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* 右側語言與模式切換（桌面版始終顯示） */}
      <div className="hidden h-[4rem] w-[14.75rem] items-start justify-end gap-[1rem] md:flex">
        <div className="flex h-[1.5rem] w-[8.25rem] items-center justify-between">
          <MdLanguage className="h-full w-[1.5rem] fill-[url(#myGradient)] dark:fill-shadow" />
          <select
            className="w-[6.25rem] cursor-pointer rounded-[0.5rem] border-[0.125rem] border-midtone bg-highlight text-shadow dark:border-shadow dark:bg-shadow2"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="zh">繁體中文</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="flex h-[1.5rem] w-[5.5rem] items-center gap-[0.5rem]">
          {isDarkMode ? (
            <BsFillLampFill className="h-[1.5rem] w-[1.5rem] fill-shadow" />
          ) : (
            <BsLamp className="h-[1.5rem] w-[1.5rem] fill-[url(#myGradient)]" />
          )}
          <button onClick={handleToggle}>
            <img
              className="h-full w-[3.5rem]"
              src={isDarkMode ? darkToggle : lightToggle}
              alt="lightToggle"
            />
          </button>
        </div>
      </div>

      {/* 手機版下拉選單 */}
      {isOpen && (
        <div className="absolute left-0 top-[5rem] flex w-full flex-col items-center gap-4 bg-highlight px-8 py-4 dark:bg-gradient-to-b dark:from-highlight dark:to-shadow2 md:hidden">
          {navItems.map((item) => (
            <button
              key={item.name}
              className="flex items-center justify-start gap-2"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span className="bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text text-transparent dark:text-shadow">
                {item.name}
              </span>
            </button>
          ))}
          {/* 手機版語言與模式切換 */}
          <div className="mt-8 flex items-center justify-center gap-10">
            <div className="flex items-center gap-2">
              <MdLanguage className="h-[1.5rem] w-[1.5rem] fill-[url(#myGradient)] dark:fill-black" />
              <select
                className="w-[6.25rem] cursor-pointer rounded-[0.5rem] border-[0.125rem] border-midtone bg-highlight dark:border-black dark:bg-shadow2"
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
              >
                <option value="zh">繁體中文</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              {isDarkMode ? (
                <BsFillLampFill className="h-[1.5rem] w-[1.5rem]" />
              ) : (
                <BsLamp className="h-[1.5rem] w-[1.5rem] fill-[url(#myGradient)]" />
              )}
              <button onClick={handleToggle}>
                <img
                  className="h-[1.5rem] w-[3.5rem]"
                  src={isDarkMode ? darkToggle : lightToggle}
                  alt="lightToggle"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 漸變定義 */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <radialGradient id="myGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A8C16" />
            <stop offset="100%" stopColor="#20591E" />
          </radialGradient>
        </defs>
      </svg>
    </nav>
  );
}

export default Navbar;
