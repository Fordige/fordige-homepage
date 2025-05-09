import { forwardRef, useEffect, useRef, useState } from "react";

import animationMobile from "../../assets/aboutUs/tell-us.mp4";
import starter from "../../assets/aboutUs/starter.webm";

// text animation
import titleAnimation from "../../assets/aboutUs/title-animation.webm";

const AboutUsSection = forwardRef((props, ref) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const videoRef1 = useRef(null); // 用於 animation.mp4
  const videoRef2 = useRef(null); // 用於 animation2.mp4

  const videoRef = useRef(null);

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

  return (
    <div ref={ref}>
      {/* 手機 */}
      <section className="flex h-[90vh] w-full flex-col items-center justify-around bg-highlight dark:bg-shadow3 md:hidden">
        <video className="w-[60vw] self-start" muted autoPlay playsInline>
          <source src={titleAnimation} type="video/webm" />
        </video>
        <div className="relative h-[70vh] w-[85vw]">
          <video
            className={`absolute inset-0 z-20 h-full w-full object-fill`}
            src={animationMobile}
            muted
            playsInline
            autoPlay
            preload="auto"
          />
        </div>
      </section>
      {/* 桌面 */}
      <section className="relative hidden h-[90vh] w-full flex-col items-center justify-center gap-[1rem] bg-highlight dark:bg-shadow3 md:flex">
        <video className="w-[35rem] self-start" muted autoPlay playsInline>
          <source src={titleAnimation} type="video/webm" />
        </video>
        <div className="h-full w-full">
          <video ref={videoRef} muted playsInline autoPlay>
            <source src={starter} type="video/webm" />
          </video>
        </div>
      </section>
    </div>
  );
});
export default AboutUsSection;
