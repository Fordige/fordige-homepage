import useModalStore from "../../store/modalStore";
import lineIcon from "../../assets/icons8-line.svg";
import instagrameIcon from "../../assets/icons8-instagram.svg";
import scrollDownNormalIcon from "../../assets/scroll_down_normal.svg";
import scrollDownBoldIcon from "../../assets/scroll_down_bold.svg";
import lineQrCode from "../../assets/line_qrcode.svg";
import igQrCode from "../../assets/ig_qrcode.svg";
import bannerDark from "../../assets/banner-dark-1-1.svg";
import scrollIcon from "../../assets/scroll.svg";

function Footer() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <footer className="from-shadow2 fixed bottom-0 z-10 flex h-[5rem] w-full items-center justify-center bg-gradient-to-r to-highlight">
      <div className="flex h-[4rem] w-[31.06rem] items-center justify-start">
        <img className="h-full w-[19rem]" src={bannerDark} alt="bannerDark" />
      </div>
      <div className="flex h-[4rem] w-[13.875rem] flex-col items-center justify-center">
        <img
          className="h-[3.125rem] w-[3.75rem]"
          src={scrollIcon}
          alt="scrollIcon"
        />
        <p className="text-xxxs font-sf text-shadow3 font-normal">
          Copyright © 2025 Fordige. All rights reserved.
        </p>
      </div>
      <div className="flex h-[4rem] w-[31.06rem] items-center justify-end">
        <img
          className="h-full w-[4rem]"
          src={lineIcon}
          alt="lineIcon"
          onClick={() => openModal(lineQrCode)}
        />
        <img
          className="h-full w-[4rem]"
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
  /* <div className="animate-svg1 botton-0 z-15 fixed w-screen">
        <img
          src={scrollDownNormalIcon}
          alt="scroll"
          className="mx-auto h-[6rem] w-[7rem]"
        ></img>
      </div>
      <div className="animate-svg2 botton-0 z-15 fixed w-screen">
        <img
          src={scrollDownBoldIcon}
          alt="scroll"
          className="mx-auto h-[6rem] w-[7rem]"
        ></img>
      </div>
      <div className="relative flex h-[6.25rem] items-center">
        <div className="flex-1 self-end pl-5 font-inter text-xs text-black">
          Copyright © 2025 Fordige. All rights reserved.
        </div>
        <div className="absolute right-0 pr-5">
          <div className="flex">
            <img
              src={lineIcon}
              alt="line-icon"
              className="z-15 h-[4rem] w-[4rem] cursor-pointer"
              onClick={() => openModal(lineQrCode)}
            />
            <img
              src={instagrameIcon}
              alt="ig-icon"
              className="z-15 h-[4rem] w-[4rem] cursor-pointer"
              onClick={() => openModal(igQrCode)}
            />
          </div>
        </div>
      </div> */
}
