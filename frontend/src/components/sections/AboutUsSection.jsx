import { forwardRef, useEffect, useRef, useState } from "react";

import rightButton from "../../assets/aboutUs/right-button.svg";
import leftButton from "../../assets/aboutUs/left-button.svg";
import bg from "../../assets/aboutUs/bg.webp";
import bg2 from "../../assets/aboutUs/bg2.webp";
import bgMobile from "../../assets/aboutUs/bg-mobile.webp";
import animation from "../../assets/aboutUs/animation.mp4";
import animation2 from "../../assets/aboutUs/animation2.mp4";
import chicken from "../../assets/aboutUs/chicken.gif";
import animationMobile from "../../assets/aboutUs/tell-us.mp4";

const AboutUsSection = forwardRef(({ scrollToSection }, ref) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showVideo, setShowVideo] = useState(false);
  const videoRef1 = useRef(null); // 用於 animation.mp4
  const videoRef2 = useRef(null); // 用於 animation2.mp4

  const sectionRef = useRef(null);
  const videoRefMobileRef = useRef(null);

  // 當 showVideo 或 currentPage 改變時，播放對應的影片
  useEffect(() => {
    if (showVideo) {
      if (currentPage === 0 && videoRef2.current) {
        videoRef2.current.currentTime = 0; // 重置到開頭
        videoRef2.current.play().catch((error) => {
          console.error("Video play failed for animation2:", error);
        });
      } else if (currentPage === 1 && videoRef1.current) {
        videoRef1.current.currentTime = 0; // 重置到開頭
        videoRef1.current.play().catch((error) => {
          console.error("Video play failed for animation:", error);
        });
      }
    }
  }, [showVideo, currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // 當 section 進入視野，播放影片
          videoRefMobileRef.current.play();
        } else {
          // 當 section 離開視野，暫停影片
          videoRefMobileRef.current.pause();
          videoRefMobileRef.current.currentTime = 0;
        }
      },
      {
        threshold: 0.7,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 清理 observer
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    setCurrentPage((prevIndex) => prevIndex + 1);
    setShowVideo(true);
  };

  const handlePrev = () => {
    setCurrentPage((prevIndex) => prevIndex - 1);
    setShowVideo(true);
  };

  const handleMouseEnter = (e) => {
    setShowButton(true);
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  const handleContactClick = (e) => {
    e.stopPropagation();
    scrollToSection(4);
  };

  const handleVideoEnded = () => {
    setShowVideo(false); // 動畫播放結束後隱藏
  };

  return (
    <div ref={ref}>
      {/* 手機 */}
      <section
        className="flex h-[90vh] w-full items-center justify-center bg-highlight dark:bg-shadow3 md:hidden"
        ref={sectionRef}
      >
        <div className="relative h-[85vh] w-[85vw]">
          <video
            ref={videoRefMobileRef}
            className={`absolute inset-0 z-20 h-full w-full object-fill`}
            src={animationMobile}
            muted
            playsInline
            preload="auto"
          />
        </div>
      </section>
      {/* 桌面 */}
      <section
        className="relative hidden h-[80vh] w-full flex-col items-center justify-center bg-highlight dark:bg-shadow3 md:flex"
        style={{
          cursor: showButton ? "none" : "auto",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 隱藏按鈕，覆蓋整個 section */}
        {showButton && (
          <button
            className="absolute left-0 top-0 z-10 h-full w-full opacity-0"
            onClick={handleContactClick}
          />
        )}

        {/* 自訂游標：文字方塊 */}
        {showButton && (
          <div
            className="fixed z-40 hidden h-[4rem] w-[8.25rem] md:block"
            style={{
              left: `calc(${cursorPos.x}px - 4.625rem)`, // 9.25rem / 2
              top: `calc(${cursorPos.y}px - 2.5rem)`, // 8.5rem / 2
              pointerEvents: "none",
            }}
          >
            <div className="relative h-full w-full">
              <img
                className="absolute inset-0 h-full w-full object-fill"
                src={chicken}
                alt="chicken"
              />
            </div>
          </div>
        )}

        <div className="relative h-full w-full overflow-hidden">
          {showVideo && (
            <>
              <video
                ref={videoRef1}
                className={`absolute inset-0 z-20 h-full w-full object-fill transition-opacity duration-500 ${
                  currentPage === 1 ? "opacity-100" : "opacity-0"
                }`}
                src={animation}
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnded}
              />
              <video
                ref={videoRef2}
                className={`absolute inset-0 z-20 h-full w-full object-fill transition-opacity duration-500 ${
                  currentPage === 0 ? "opacity-100" : "opacity-0"
                }`}
                src={animation2}
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnded}
              />
            </>
          )}
          <div className="h-full w-full">
            <img
              className="h-full w-full object-fill"
              src={currentPage === 0 ? bg : bg2}
              alt="bg"
            />
          </div>
        </div>

        {currentPage === 0 ? (
          <button
            className="absolute right-[1rem] top-1/2 z-50 -translate-y-1/2 opacity-25 hover:opacity-100"
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
            className="absolute left-[1rem] top-1/2 z-50 -translate-y-1/2 opacity-25 hover:opacity-100"
            onClick={handlePrev}
          >
            <img
              className="h-[5rem] w-[5rem]"
              src={leftButton}
              alt="leftButton"
            />
          </button>
        )}
        <div className="absolute bottom-[1rem] left-1/2 z-20 flex h-[1.5rem] w-[3rem] -translate-x-1/2 items-center justify-evenly rounded-[1rem] bg-white">
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
    </div>
  );
});

export default AboutUsSection;
