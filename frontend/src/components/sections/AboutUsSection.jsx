import { forwardRef, useState } from "react";

import ContactUsButton from "../ui/ContactUsButton";
import rightButton from "../../assets/aboutUs/right-button.svg";
import leftButton from "../../assets/aboutUs/left-button.svg";

import bg from "../../assets/aboutUs/bg.webp";
import bg2 from "../../assets/aboutUs/bg2.webp";

const AboutUsSection = forwardRef((props, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  return (
    <>
      {currentIndex === 0 ? (
        <section
          className="relative mb-[5rem] mt-[5rem] flex min-h-[calc(100vh-10rem)] w-full flex-col items-center justify-center overflow-hidden bg-highlight dark:bg-shadow3"
          ref={ref}
        >
          <img
            className="absolute h-full w-full object-fill"
            src={bg}
            alt="bg"
          />
          <button
            className="absolute right-[1rem] top-1/2 -translate-y-1/2 opacity-25 hover:opacity-100"
            onClick={handleNext}
          >
            <img
              className="h-[5rem] w-[5rem]"
              src={rightButton}
              alt="rightButton"
            />
          </button>
          <div className="absolute bottom-[1rem] left-1/2 flex h-[1.5rem] w-[3rem] -translate-x-1/2 items-center justify-evenly rounded-[1rem] bg-white">
            <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-shadow3"></div>
            <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-shadow2"></div>
          </div>
        </section>
      ) : (
        <section
          className="relative mb-[5rem] mt-[5rem] flex min-h-[calc(100vh-10rem)] w-full flex-col items-center justify-center overflow-hidden bg-highlight dark:bg-shadow3"
          ref={ref}
        >
          <img
            className="absolute h-full w-full object-fill"
            src={bg2}
            alt="bg2"
          />
          <button
            className="absolute left-[1rem] top-1/2 -translate-y-1/2 opacity-25 hover:opacity-100"
            onClick={handlePrev}
          >
            <img
              className="h-[5rem] w-[5rem]"
              src={leftButton}
              alt="leftButton"
            />
          </button>
          <div className="absolute bottom-[1rem] left-1/2 flex h-[1.5rem] w-[3rem] -translate-x-1/2 items-center justify-evenly rounded-[1rem] bg-white">
            <div
              className={`h-[0.5rem] w-[0.5rem] rounded-full ${currentIndex === 0 ? "bg-shadow3" : "bg-shadow2"}`}
            ></div>
            <div
              className={`h-[0.5rem] w-[0.5rem] rounded-full ${currentIndex === 1 ? "bg-shadow3" : "bg-shadow2"}`}
            ></div>
          </div>
        </section>
      )}
    </>
  );
});

export default AboutUsSection;
