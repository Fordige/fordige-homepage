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
      className="relative mb-[5rem] mt-[5rem] flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center overflow-hidden bg-highlight dark:bg-shadow3"
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

      <div className="absolute flex h-full w-full flex-col items-center justify-center">
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
        <ContactUsButton onClick={() => scrollToSection(4)} />
      </div>
    </section>
  );
});

export default HomepageSection;
