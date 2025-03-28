import useModalStore from "../../store/modalStore";
import lineIcon from "../../assets/icons8-line.svg";
import instagrameIcon from "../../assets/icons8-instagram.svg";
import scrollDownNormalIcon from "../../assets/scroll_down_normal.svg";
import scrollDownBoldIcon from "../../assets/scroll_down_bold.svg";
import lineQrCode from "../../assets/line_qrcode.svg";
import igQrCode from "../../assets/ig_qrcode.svg";

function Footer() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <footer className="fixed bottom-0 z-10 h-[7rem] w-full bg-gradient-to-r from-accent to-highlight">
      <div className="animate-svg1 botton-0 z-15 fixed w-screen">
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
      </div>
    </footer>
  );
}

export default Footer;
