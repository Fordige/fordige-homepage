import useModalStore from "../../store/modalStore";
import lineIcon from "../../assets/footer/line-icon.svg";

import bannerDark from "../../assets/footer/banner-dark.svg";
import bannerWhite from "../../assets/footer/banner-white.svg";

import useModeStore from "../../store/modeStore";
import chicken from "../../assets/aboutUs/chicken.gif";

function Footer() {
  const openModal = useModalStore((state) => state.openModal);
  const { isDarkMode } = useModeStore();

  return (
    <footer className="relative flex h-[8.46vh] w-full items-center justify-between border-t-[2px] border-t-black bg-highlight px-2 dark:bg-gradient-to-b dark:from-shadow2 dark:to-highlight md:h-[5rem] md:px-8 md:py-4">
      <img
        className="h-[4.56vh] md:h-full"
        src={isDarkMode ? bannerDark : bannerWhite}
        alt="bannerDark"
      />

      <div
        className="absolute left-1/2 top-[-2.5vh] bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text font-sf text-[1.875vw] font-normal text-transparent dark:text-shadow md:hidden"
        style={{ transform: "translateX(-50%)" }}
      >
        Copyright © 2025 Fordige. All rights reserved.
      </div>
      <div
        className="absolute left-1/2 top-1/2 hidden bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text font-sf text-xxxs font-normal text-transparent dark:text-shadow md:block"
        style={{ transform: "translateX(-50%)" }}
      >
        Copyright © 2025 Fordige. All rights reserved.
      </div>
      <div className="flex">
        <img className="h-[4.56vh] md:hidden" src={chicken} alt="chicken" />
        <img
          className="h-[4.56vh] w-[10vw] cursor-pointer md:h-[4rem] md:w-[4rem]"
          src={lineIcon}
          alt="lineIcon"
          onClick={() => openModal()}
        />
      </div>
    </footer>
  );
}

export default Footer;
