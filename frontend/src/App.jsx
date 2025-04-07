import { useEffect, useRef, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Modal from "./components/ui/Modal";
import ContactUsSection from "./components/sections/ContactUsSection";
import HomepageSection from "./components/sections/HomepageSection";

// import AboutSection from "./sections/AboutSection";
// import ServiceSection from "./sections/ServiceSection";
// import Modal from "./components/ui/Modal";
// import HomeSection from "./sections/HomeSection";
// import BackToUp from "./components/layout/BackToUp";

function App() {
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const totalSections = sectionRefs.length;
  const [currentSection, setCurrentSection] = useState(0);
  const isScrollingRef = useRef(false);

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
        sectionRefs[newSection].current.scrollIntoView({ behavior: "smooth" });

        // 在滾動完成後重置標記
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500); // 與 smooth 行為的持續時間匹配
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false }); // 設置 passive 為 false 以防止瀏覽器滾動事件的預設行為
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, totalSections]);

  const scrollToSection = (index) => {
    sectionRefs[index].current.scrollIntoView({ behavior: "smooth" });
    setCurrentSection(index);
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar
        scrollToSection={scrollToSection}
        currentSection={currentSection}
      />
      {/* <HomeSection ref={sectionRefs[0]} />
      <AboutSection ref={sectionRefs[1]} />
      <ServiceSection ref={sectionRefs[2]} />
      <ContactUsSection ref={sectionRefs[3]} />
      <Footer />
      <Modal />
      {currentSection !== 0 && <BackToUp scrollToSection={scrollToSection} />} */}
      {/* <ContactUsSection ref={sectionRefs[3]} />
      
      <Modal /> */}
      <HomepageSection />
      <Footer />
      <Modal />
    </div>
  );
}

export default App;
