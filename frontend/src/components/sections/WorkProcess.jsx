import React, { forwardRef, useRef, useState } from "react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
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
          centerMode: false,
          arrows: false,
        },
      },
    ],
  };

  const textVariants = {
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

  return (
    <div
      className="relative mb-[5rem] mt-[5rem] flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center bg-highlight dark:bg-shadow3"
      ref={ref}
    >
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
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="font-han flex items-center justify-center gap-[1rem] text-center text-[2rem] font-normal text-shadow3 dark:text-highlight"
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
    </div>
  );
});

export default WorkProcess;
