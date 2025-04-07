import { forwardRef } from "react";

import homepageVideo from "../../assets/homepage-video.mp4";
import bigLogo from "../../assets/big-logo-1-1.svg";

const HomepageSection = forwardRef((props, ref) => {
  return (
    <section
      className="bg-red flex h-screen w-screen items-center justify-center gap-[4rem] bg-black pb-[5rem] pt-[5rem]"
      ref={ref}
    >
      <div className="relative flex h-[31rem] w-[76rem] flex-col items-center justify-center overflow-hidden">
        <video
          className="absolute left-0 top-0 object-cover"
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
              src={bigLogo}
              alt="bigLogo"
            />
          </div>
          <div className="font-sf h-[3.5rem] w-full bg-[radial-gradient(circle_at_center,#20591E,#000000)] text-center text-lg font-bold text-highlight">
            從形象網頁到智能應用，協助您的業務只需 25,000 起
          </div>
          <button className="text-shadow3 font-sf h-[2rem] w-[8.25rem] rounded-[2.5rem] bg-accent text-xs shadow-shadow">
            立即聯絡
          </button>
        </div>
        {/* 
        <head>從形象網頁到智能應用，協助您的業務只需 25,000 起</head>
        <button>聯絡我們</button> */}
      </div>
    </section>
  );
});

export default HomepageSection;
