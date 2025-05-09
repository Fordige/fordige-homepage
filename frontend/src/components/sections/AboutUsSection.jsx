import { forwardRef, useRef } from "react";
import starter from "../../assets/aboutUs/starter.webm";

// text animation
import titleAnimation from "../../assets/aboutUs/title-animation.webm";

const AboutUsSection = forwardRef((props, ref) => {
  const videoRef = useRef(null);

  return (
    <div ref={ref}>
      {/* 手機 */}
      <section className="flex h-[60vh] w-[130vw] flex-col items-center justify-around bg-highlight dark:bg-shadow3 md:hidden">
        <video className="w-[60vw] self-start" muted autoPlay playsInline>
          <source src={titleAnimation} type="video/webm" />
        </video>

        <video
          className="w-full overflow-hidden"
          ref={videoRef}
          muted
          playsInline
          autoPlay
        >
          <source src={starter} type="video/webm" />
        </video>
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
