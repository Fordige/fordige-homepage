import useModalStore from "../../store/modalStore";
import lineIcon from "../../assets/icons8-line.svg";
import instagrameIcon from "../../assets/icons8-instagram.svg";
import lineQrCode from "../../assets/line_qrcode.svg";
import igQrCode from "../../assets/ig_qrcode.svg";
import bannerDark from "../../assets/banner-dark-1-1.svg";
import bannerWhite from "../../assets/banner-white-1-1.svg";
import scrollIcon from "../../assets/scroll.svg";
import scrollLightIcon from "../../assets/scroll_light.svg";
import useModeStore from "../../store/modeStore";

function Footer() {
  const openModal = useModalStore((state) => state.openModal);
  const { isDarkMode } = useModeStore();

  return (
    <footer className="fixed bottom-0 z-10 flex h-[5rem] w-full items-center justify-between bg-highlight px-8 py-2 dark:bg-gradient-to-b dark:from-shadow2 dark:to-highlight">
      <div className="flex h-[4rem] w-[31.06rem] items-center justify-start">
        <img
          className="h-full w-[19rem]"
          src={isDarkMode ? bannerDark : bannerWhite}
          alt="bannerDark"
        />
      </div>
      <div className="flex h-[4rem] w-[13.875rem] flex-col items-center justify-center">
        <img
          className="h-[3.125rem] w-[3.75rem] fill-[url(#myGradient)] dark:fill-black"
          src={isDarkMode ? scrollIcon : scrollLightIcon}
          alt="scrollIcon"
        />

        <p className="bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text font-sf text-xxxs font-normal text-transparent dark:text-shadow3">
          Copyright © 2025 Fordige. All rights reserved.
        </p>
      </div>
      <div className="flex h-[4rem] w-[31.06rem] items-center justify-end">
        <img
          className="h-full w-[4rem] cursor-pointer"
          src={lineIcon}
          alt="lineIcon"
          onClick={() => openModal(lineQrCode)}
        />
        <img
          className="h-full w-[4rem] cursor-pointer"
          src={instagrameIcon}
          alt="igIcon"
          onClick={() => openModal(igQrCode)}
        />
      </div>
    </footer>
  );
}

export default Footer;

{
}
