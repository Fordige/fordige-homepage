import React, { forwardRef, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import payFlow1 from "../../assets/workProcess/pay-flow1.webp";
import payFlow2 from "../../assets/workProcess/pay-flow2.webp";
import payFlow3 from "../../assets/workProcess/pay-flow3.webp";
import payFlow4 from "../../assets/workProcess/pay-flow4.webp";
import payFlow5 from "../../assets/workProcess/pay-flow5.webp";
import payFlow6 from "../../assets/workProcess/pay-flow6.webp";

const carouselData = [
  {
    id: 1,
    image: payFlow1,
    text: "加入官方",
  },
  {
    id: 2,
    image: payFlow2,
    text: "初步討論&報價",
  },
  {
    id: 3,
    image: payFlow3,
    text: "確認合作意願&支付訂金",
  },
  {
    id: 4,
    image: payFlow4,
    text: "確認風格方向",
  },
  {
    id: 5,
    image: payFlow5,
    text: "初稿定案",
  },
  {
    id: 6,
    image: payFlow6,
    text: "支付尾款",
  },
];

const WorkProcess = forwardRef((props, ref) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [showHr, setShowHr] = useState(false);
  const sectionRef = useRef(null);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    dots: true,
    arrows: true,
    cssEase: "ease-out",
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    afterChange: (current) => {
      setCurrentSlide(current % carouselData.length);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          arrows: false,
        },
      },
    ],
  };

  const carouselTextVariants = {
    hidden: { opacity: 0, y: "2rem" },
    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: "-2rem",

      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // 當 section 進入視野，播放影片
          setIsTextVisible(true);
        } else {
          // 當 section 離開視野，暫停影片
          setIsTextVisible(false);
          setShowHr(false);
        }
      },
      {
        threshold: 0.3,
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

  // 定義文字動畫變體
  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: [0.8, 2, 1], // 從 0.8 放大到 2，然後縮回到 1
      transition: {
        delay: i * 0.15, // 每個字元延遲 0.15 秒
        duration: 0.6, // 整體動畫持續 0.6 秒
        ease: easeInOut,
      },
    }),
  };

  // 定義 <hr /> 動畫變體
  const hrVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",

      transition: {
        duration: 0.5, // hr 延伸動畫持續 0.5 秒
        ease: easeInOut,
      },
    },
  };

  // 將文字分割成單個字元
  const text = "專案流程";
  const characters = text.split("");

  // 檢查所有字元動畫完成
  const handleTextAnimationComplete = () => {
    setShowHr(true); // 文字動畫完成後觸發 <hr /> 動畫
  };

  return (
    <div className="h-full w-full" ref={ref}>
      {/* 手機版 */}
      <section
        className="flex h-[90vh] w-full flex-col items-center justify-around bg-highlight dark:bg-shadow3 md:hidden"
        ref={sectionRef}
      >
        <div className="w-full">
          <motion.div
            className="text-center font-sf text-[7.5vw] font-semibold text-shadow3 dark:text-highlight"
            initial="hidden"
            animate={isTextVisible ? "visible" : "hidden"}
          >
            {characters.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                custom={index}
                variants={textVariants}
                style={{ display: "inline-block", transformOrigin: "center" }}
                onAnimationComplete={
                  index === characters.length - 1
                    ? handleTextAnimationComplete
                    : undefined
                } // 僅最後一個字元觸發 <hr />
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          <motion.hr
            className="mt-[0.57vh] border-t-2 border-shadow3 dark:border-highlight"
            initial="hidden"
            animate={showHr ? "visible" : "hidden"}
            variants={hrVariants}
          />
        </div>
        <div className="w-full">
          <Slider {...settings} className="h-full w-full">
            {carouselData.map((item, index) => (
              <div key={item.id}>
                <div className="flex h-full w-[100vw] flex-col justify-evenly transition-all duration-500">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="h-[60vh] w-full rounded-lg object-fill"
                    loading="lazy"
                  />
                  <AnimatePresence mode="wait">
                    {currentSlide === index && (
                      <motion.div
                        key={item.id}
                        variants={carouselTextVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex items-center justify-center gap-[2.5vw] text-center font-han text-[5vw] font-normal text-shadow3 dark:text-highlight"
                      >
                        <p className="font-sf text-[7.5vw] font-[274]">
                          {index + 1}
                        </p>
                        {item.text}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      {/* 桌面版 */}
      <section className="hidden h-[80vh] w-full flex-col items-center justify-center gap-[1rem] bg-highlight dark:bg-shadow3 md:flex">
        <div className="text-center font-sf text-xlg font-semibold text-shadow3 dark:text-highlight">
          專案流程
        </div>
        <div className="w-full">
          <Slider {...settings} className="h-full w-full">
            {carouselData.map((item, index) => (
              <div key={item.id}>
                <div className="flex h-full w-[40rem] flex-col justify-evenly transition-all duration-500">
                  <img
                    src={item.image}
                    alt={item.text}
                    className="h-[60vh] w-full rounded-lg object-fill"
                    loading="lazy"
                  />
                  <AnimatePresence mode="wait">
                    {currentSlide === index && (
                      <motion.div
                        key={item.id}
                        variants={carouselTextVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex items-center justify-center gap-[1rem] text-center font-han text-[2rem] font-normal text-shadow3 dark:text-highlight"
                      >
                        <p className="font-sf text-[3rem] font-[274]">
                          {index + 1}
                        </p>
                        {item.text}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
});

export default WorkProcess;
