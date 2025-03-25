import { useState } from "react";
import DarkLightToggle from "../ui/DarkLightToggle";
import FormControlLabel from "@mui/material/FormControlLabel";

function Navbar() {
  const [isDark, setIsDark] = useState(false);

  const hangleDarkToggle = () => {
    setIsDark(!isDark);
  };

  return (
    <nav className="fixed top-0 flex h-24 w-full items-center justify-start bg-accent px-8 py-2">
      <div className="flex w-56 items-center justify-between self-stretch bg-midtone px-[1.426rem] py-[1.755rem]">
        <div className="text-[4.36rem] font-normal text-black">logo</div>
      </div>
      <div className="flex w-[67.75rem] items-center justify-between self-stretch px-24 font-inter text-[2rem] font-semibold text-black">
        <button>About</button>
        <button>Services</button>
        <button>Contact Us</button>
      </div>
      <div className="flex w-[34.25rem] justify-end gap-5 self-stretch">
        <div className="flex gap-2">
          <label
            htmlFor="language"
            className="w-[7.19rem] justify-start self-stretch text-right font-inter text-2xl font-semibold text-black"
          >
            Language
          </label>
          <select
            id="language"
            className="font-600 h-8 w-44 rounded-lg bg-white pr-5 text-center text-2xl text-black outline outline-1 outline-black"
          >
            <option className="font-noto">English</option>
            <option className="font-noto">繁體中文</option>
          </select>
        </div>
        <div className="flex gap-2">
          <div className="font-inter text-2xl font-semibold text-black">
            Mode
          </div>
          <div>
            <FormControlLabel
              className="mt-[-0.55rem]"
              control={
                <DarkLightToggle
                  sx={{ m: 1 }}
                  checked={isDark}
                  onChange={hangleDarkToggle}
                />
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
