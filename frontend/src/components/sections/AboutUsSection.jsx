import { forwardRef, useState } from "react";

import rightButton from "../../assets/aboutUs/right-button.svg";
import leftButton from "../../assets/aboutUs/left-button.svg";
import bg from "../../assets/aboutUs/bg.webp";
import bg2 from "../../assets/aboutUs/bg2.webp";

const AboutUsSection = forwardRef((props, ref) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setCurrentPage((prevIndex) => prevIndex + 1);
  };
  const handlePrev = () => {
    setCurrentPage((prevIndex) => prevIndex - 1);
  };

  return (
    <section
      className="relative mb-[5rem] mt-[5rem] flex min-h-[calc(100vh-10rem)] w-full flex-col items-center justify-center overflow-hidden bg-highlight dark:bg-shadow3"
      ref={ref}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="flex h-full w-[200%] transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 50}%)` }}
        >
          <div className="h-full w-[50%]">
            <img className="h-full w-full object-fill" src={bg} alt="bg" />
          </div>
          <div className="h-full w-[50%]">
            <img className="h-full w-full object-fill" src={bg2} alt="bg2" />
          </div>
        </div>
      </div>

      {currentPage === 0 ? (
        <button
          className="absolute right-[1rem] top-1/2 z-10 -translate-y-1/2 opacity-25 hover:opacity-100"
          onClick={handleNext}
        >
          <img
            className="h-[5rem] w-[5rem]"
            src={rightButton}
            alt="rightButton"
          />
        </button>
      ) : (
        <button
          className="absolute left-[1rem] top-1/2 z-10 -translate-y-1/2 opacity-25 hover:opacity-100"
          onClick={handlePrev}
        >
          <img
            className="h-[5rem] w-[5rem]"
            src={leftButton}
            alt="leftButton"
          />
        </button>
      )}
      <div className="absolute bottom-[1rem] left-1/2 z-10 flex h-[1.5rem] w-[3rem] -translate-x-1/2 items-center justify-evenly rounded-[1rem] bg-white">
        <div
          className={`h-[0.5rem] w-[0.5rem] rounded-full ${
            currentPage === 0 ? "bg-shadow3" : "bg-shadow2"
          }`}
        ></div>
        <div
          className={`h-[0.5rem] w-[0.5rem] rounded-full ${
            currentPage === 1 ? "bg-shadow3" : "bg-shadow2"
          }`}
        ></div>
      </div>
    </section>
  );
});

export default AboutUsSection;
