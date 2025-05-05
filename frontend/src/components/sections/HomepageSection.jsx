import { forwardRef } from "react";

import homepageVideo from "../../assets/homepage-video.mp4";
import bigLogo from "../../assets/big-logo-1-1.svg";
import bigLogoLight from "../../assets/big-logo-light-1-1.svg";
import useLanguageStore from "../../store/languageStore";
import useModeStore from "../../store/modeStore";
import ContactUsButton from "../ui/ContactUsButton";

const HomepageSection = forwardRef(({ scrollToSection }, ref) => {
  const { content } = useLanguageStore();
  const { isDarkMode } = useModeStore();
  return (
    <section
      className="relative flex h-[100vh] w-full bg-highlight dark:bg-shadow3"
      ref={ref}
    >
      <video
        className="absolute h-full w-full object-fill opacity-25 dark:opacity-100"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={homepageVideo} type="video/mp4"></source>
      </video>

      <div className="absolute flex h-full w-full flex-col items-center justify-evenly md:justify-center">
        <div className="flex h-[28.905vh] w-[51.25vw] items-center justify-center md:h-[25rem] md:w-[25rem]">
          <img
            className="h-full w-full object-contain"
            src={isDarkMode ? bigLogo : bigLogoLight}
            alt="bigLogo"
          />
        </div>
        <div className="w-full text-center font-sf text-[7.5vw] font-bold text-midtone dark:bg-[radial-gradient(ellipse_at_center,#20591E,#000000)] dark:text-highlight md:text-lg">
          {content.homepage_content}
        </div>
        <ContactUsButton onClick={() => scrollToSection(4)} />
      </div>
    </section>
  );
});

export default HomepageSection;
