import { forwardRef, useRef, useState } from "react";
import starter4444 from "../../assets/aboutUs/starter.mov";
import starter from "../../assets/aboutUs/starter.webm";
import starter24444 from "../../assets/aboutUs/starter2.mov";
import starter2 from "../../assets/aboutUs/starter2.webm";
import titleAnimation4444 from "../../assets/aboutUs/title-animation.mov";
import titleAnimation from "../../assets/aboutUs/title-animation.webm";
import { MdOutlineTouchApp } from "react-icons/md";
import { motion } from "framer-motion";

const AboutUsSection = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const video2Ref = useRef(null);
  const [showEnded, setShowEnded] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const handleEnded = () => {
    if (videoRef.current) {
      setShowEnded(true);
    }
  };

  const handleClick = () => {
    setShowEnded(false);
    setShowNext((prev) => !prev);
    if (showNext) {
      videoRef.current.play();
    } else {
      video2Ref.current.play();
    }
  };

  return (
    <div className="h-full w-full" ref={ref}>
      {/* 手機 */}
      <section className="flex h-[60vh] w-[145vw] flex-col items-center justify-start gap-[4.56vh] bg-highlight dark:bg-shadow3 md:hidden">
        <video
          className="w-[60vw] self-start"
          muted
          autoPlay
          playsInline
          preload="auto"
        >
          <source src={titleAnimation4444} />
          <source src={titleAnimation} type="video/webm" />
        </video>
        <div className="ml-[-55vw] flex w-full flex-col items-center overflow-hidden">
          <video
            className={showNext ? "hidden" : "block"}
            ref={videoRef}
            muted
            playsInline
            autoPlay
            onEnded={handleEnded}
            preload="auto"
          >
            <source src={starter4444} />
            <source src={starter} type="video/webm" />
          </video>
          <video
            className={showNext ? "block" : "hidden"}
            ref={video2Ref}
            muted
            playsInline
            autoPlay
            preload="auto"
            onEnded={handleEnded}
          >
            <source src={starter24444} />
            <source src={starter2} type="video/webm" />
          </video>

          <div
            className={` ${showEnded ? "opacity-100" : "opacity-0"} relative flex w-full flex-col bg-shadow2/30 text-center font-sf text-[6.25vw] font-semibold text-black dark:text-white`}
          >
            <p>交給我們來吧</p>
            <p>讓想法變有故事的網站</p>
            <p>及數位應用</p>
            <motion.div
              className="absolute left-1/2 top-[-10vh] cursor-pointer"
              onClick={handleClick}
              animate={{
                scale: 1.5,
              }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <MdOutlineTouchApp className="z-50 h-[7.98vh] w-[17.5vw] rounded-full bg-shadow2 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* 桌面 */}
      <section className="hidden h-[90vh] w-full flex-col items-center justify-center gap-[1rem] bg-highlight dark:bg-shadow3 md:flex">
        <video
          className="w-[35rem] self-start"
          muted
          autoPlay
          playsInline
          preload="auto"
        >
          <source src={titleAnimation4444} />
          <source src={titleAnimation} type="video/webm" />
        </video>

        <div className="relative">
          <video
            className={showNext ? "hidden" : "block"}
            ref={videoRef}
            muted
            playsInline
            autoPlay
            onEnded={handleEnded}
            preload="auto"
          >
            <source src={starter4444} />
            <source src={starter} type="video/webm" />
          </video>
          <video
            className={showNext ? "block" : "hidden"}
            ref={video2Ref}
            muted
            playsInline
            preload="auto"
            onEnded={handleEnded}
          >
            <source src={starter24444} />
            <source src={starter2} type="video/webm" />
          </video>

          {showEnded && (
            <div className="absolute bottom-0 right-0 flex flex-col rounded-br-[3.75rem] rounded-tr-[3.75rem] bg-shadow2/30 font-sf text-[2.5rem] font-semibold text-black dark:text-white">
              <p>交給我們來吧</p>
              <p>讓想法變有故事的網站</p>
              <p>及數位應用</p>
            </div>
          )}
          {showEnded && (
            <motion.div
              className="absolute bottom-[3rem] left-1/2 z-20 cursor-pointer"
              onClick={handleClick}
              animate={{
                scale: 1.5,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              <MdOutlineTouchApp className="h-[7rem] w-[7rem] rounded-full bg-shadow2 opacity-50" />
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
});
export default AboutUsSection;
