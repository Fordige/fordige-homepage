import useModalStore from "../../store/modalStore";

function Footer() {
  const openModal = useModalStore((state) => state.openModal);

  return (
    <footer className="fixed bottom-0 z-10 h-[7rem] w-full bg-gradient-to-r from-accent to-highlight font-inter text-black">
      <div className="animate-svg1 botton-0 z-15 fixed w-screen">
        <img
          src="/assets/scroll_down_normal.svg"
          alt="scroll"
          className="mx-auto h-[6rem] w-[7rem]"
        ></img>
      </div>
      <div className="animate-svg2 botton-0 z-15 fixed w-screen">
        <img
          src="/assets/scroll_down_bold.svg"
          alt="scroll"
          className="mx-auto h-[6rem] w-[7rem]"
        ></img>
      </div>
      <div className="relative flex h-[6.25rem] items-center">
        <div className="flex-1 self-end pl-5 text-[1.25rem]">
          Copyright © 2025 Fordige. All rights reserved.
        </div>
        <div className="absolute right-0 pr-5">
          <div className="flex">
            <img
              src="/assets/icons8-line.svg"
              alt="line-icon"
              className="z-15 h-[4rem] w-[4rem] cursor-pointer"
              onClick={() => openModal("/assets/line_qrcode.svg")}
            />
            <img
              src="/assets/icons8-instagram.svg"
              alt="ig-icon"
              className="z-15 h-[4rem] w-[4rem] cursor-pointer"
              onClick={() => openModal("/assets/ig_qrcode.svg")}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
