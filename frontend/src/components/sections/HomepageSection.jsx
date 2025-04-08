import { forwardRef } from "react";

import homepageVideo from "../../assets/homepage-video.mp4";
import bigLogo from "../../assets/big-logo-1-1.svg";
import quickContact from "../../assets/quick_contact.svg";
import bigLogoLight from "../../assets/big-logo-light-1-1.svg";
import useLanguageStore from "../../store/languageStore";
import useModeStore from "../../store/modeStore";

const HomepageSection = forwardRef((props, ref) => {
  const { content } = useLanguageStore();
  const { isDarkMode } = useModeStore();
  return (
    <section
      className="flex h-screen w-screen items-center justify-center gap-[4rem] bg-highlight pb-[5rem] pt-[5rem] dark:bg-black"
      ref={ref}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
        <video
          className="absolute left-0 top-0 h-full w-full object-cover opacity-25 dark:opacity-100"
          autoPlay
          loop
          muted
        >
          <source src={homepageVideo} type="video/mp4"></source>
        </video>

        <div className="justfy-center absolute flex h-full w-full flex-col items-center">
          <div className="flex h-[25rem] w-[25rem] items-center justify-center">
            <img
              className="h-[18.09remrem] w-[16.28rem]"
              src={isDarkMode ? bigLogo : bigLogoLight}
              alt="bigLogo"
            />
          </div>
          <div className="w-full text-center font-sf text-lg font-bold text-midtone dark:bg-[radial-gradient(ellipse_at_center,#20591E,#000000)] dark:text-highlight">
            {content.homepage_content}
          </div>
          <button className="flex w-[8.25rem] items-center justify-center rounded-[2.5rem] bg-accent p-1 font-sf text-xs text-shadow3 shadow-lg shadow-midtone dark:shadow-shadow3">
            {content.homepage_button}
            <img
              className="h-[1.219rem] w-[1.219rem]"
              src={quickContact}
              alt="quickContact"
            />
          </button>
        </div>
      </div>
    </section>
  );
});

export default HomepageSection;
