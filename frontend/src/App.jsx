import { useEffect, useRef, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Modal from "./components/ui/Modal";
import HomepageSection from "./components/sections/HomepageSection";
import BackToTop from "./components/layout/BackToTop";
import AboutUsSection from "./components/sections/AboutUsSection";

function App() {
  const sectionRefs = [useRef(null), useRef(null)];
  const totalSections = sectionRefs.length;
  const [currentSection, setCurrentSection] = useState(0);
  const isScrollingRef = useRef(false);
  const touchStartYRef = useRef(null);

  useEffect(() => {
    // 處理滑鼠滾動事件
    const handleWheel = (e) => {
      // 防止瀏覽器滾動事件的預設行為
      e.preventDefault();
      if (isScrollingRef.current) return; // 如果正在滾動，忽略新的事件

      const delta = e.deltaY > 0 ? 1 : -1;
      // 確保新的節點在範圍內
      const newSection = Math.min(
        Math.max(currentSection + delta, 0),
        totalSections - 1,
      );

      if (newSection !== currentSection) {
        isScrollingRef.current = true; // 標記為正在滾動
        setCurrentSection(newSection);
        scrollToSection(newSection);

        // 在滾動完成後重置標記
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500); // 與 smooth 行為的持續時間匹配
      }
    };

    // 處理觸控滾動事件
    // const handleTouchStart = (e) => {
    //   touchStartYRef.current = e.touches[0].clientY;
    // };

    // const handleTouchMove = (e) => {
    //   if (isScrollingRef.current) return;

    //   const touchEndY = e.touches[0].clientY;
    //   const deltaY = touchStartYRef.current - touchEndY;

    //   // 設置一個閾值，避免過於靈敏
    //   if (Math.abs(deltaY) < 50) return;

    //   const delta = deltaY > 0 ? 1 : -1;
    //   const newSection = Math.min(
    //     Math.max(currentSection + delta, 0),
    //     totalSections - 1,
    //   );

    //   if (newSection !== currentSection) {
    //     isScrollingRef.current = true;
    //     setCurrentSection(newSection);
    //     scrollToSection(newSection);

    //     setTimeout(() => {
    //       isScrollingRef.current = false;
    //     }, 500);
    //   }
    // };

    window.addEventListener("wheel", handleWheel, { passive: false }); // 設置 passive 為 false 以防止瀏覽器滾動事件的預設行為
    // window.addEventListener("touchstart", handleTouchStart, { passive: false });
    // window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      // window.addEventListener("touchstart", handleTouchStart, {
      //   passive: false,
      // });
      // window.addEventListener("touchmove", handleTouchMove, { passive: false });
    };
  }, [currentSection, totalSections]);

  const scrollToSection = (index) => {
    if (index === 0) {
      // 對於第一個 section，滾動到頁面頂部
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // 對於其他 section，滾動到 section 上緣
      sectionRefs[index].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setCurrentSection(index);
  };

  return (
    <div className="flex min-h-screen w-screen flex-col bg-highlight dark:bg-shadow3">
      <Navbar
        scrollToSection={scrollToSection}
        currentSection={currentSection}
      />
      {currentSection !== 0 && <BackToTop scrollToSection={scrollToSection} />}
      <HomepageSection ref={sectionRefs[0]} />
      <AboutUsSection ref={sectionRefs[1]} />
      <Footer />
      <Modal />
    </div>
  );
}

export default App;
