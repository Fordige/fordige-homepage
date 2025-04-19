import useModalStore from "../../store/modalStore";
import lineIcon from "../../assets/footer/line-icon.svg";

import lineQrCode from "../../assets/line_qrcode.svg";
import bannerDark from "../../assets/footer/banner-dark.svg";
import bannerWhite from "../../assets/footer/banner-white.svg";
import scrollIcon from "../../assets/footer/scroll.svg";
import scrollLightIcon from "../../assets/footer/scroll-light.svg";
import useModeStore from "../../store/modeStore";

function Footer() {
  const openModal = useModalStore((state) => state.openModal);
  const { isDarkMode } = useModeStore();

  return (
    <footer className="flex h-[5rem] w-full items-center justify-between bg-highlight px-8 py-2 dark:bg-gradient-to-b dark:from-shadow2 dark:to-highlight">
      <div className="hidden h-[4rem] w-[31.0625rem] items-center justify-start md:flex">
        <img
          className="h-full w-[18.321rem]"
          src={isDarkMode ? bannerDark : bannerWhite}
          alt="bannerDark"
        />
      </div>
      <div className="hidden h-[4rem] w-[13.875rem] flex-col items-center justify-end md:flex">
        <p className="bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text font-sf text-xxxs font-normal text-transparent dark:text-shadow">
          Copyright © 2025 Fordige. All rights reserved.
        </p>
      </div>
      <div className="flex h-[4rem] w-[20rem] items-center justify-end gap-[1.5rem] md:w-[31.0625rem]">
        <img
          className="h-full w-[4rem] cursor-pointer"
          src={lineIcon}
          alt="lineIcon"
          onClick={() => openModal(lineQrCode)}
        />
      </div>
      <div className="md:hidden">
        <p className="bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text font-sf text-xxxs font-normal text-transparent dark:text-shadow">
          Copyright © 2025 Fordige. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
