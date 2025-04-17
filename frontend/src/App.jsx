import { useEffect, useRef, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Modal from "./components/ui/Modal";
import HomepageSection from "./components/sections/HomepageSection";
import BackToTop from "./components/layout/BackToTop";
import AboutUsSection from "./components/sections/AboutUsSection";
import WorkProcess from "./components/sections/WorkProcess";
import ServiceContent from "./components/sections/ServiceContent";
import ContactUsSection from "./components/sections/ContactUsSection";

function App() {
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const navbarRef = useRef(null); // 用於獲取 Navbar 高度
  const totalSections = sectionRefs.length;
  const [currentSection, setCurrentSection] = useState(0);
  const isScrollingRef = useRef(false);

  // 動態計算 Navbar 高度
  const getNavbarHeight = () => {
    if (navbarRef.current) {
      return navbarRef.current.getBoundingClientRect().height;
    }
    return 80; // 備用值（若 Navbar 未渲染）
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrollingRef.current) return;

      const delta = e.deltaY > 0 ? 1 : -1;
      const newSection = Math.min(
        Math.max(currentSection + delta, 0),
        totalSections - 1,
      );

      if (newSection !== currentSection) {
        isScrollingRef.current = true;
        setCurrentSection(newSection);
        scrollToSection(newSection);

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 1500);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, totalSections]);

  const scrollToSection = (index) => {
    const navbarHeight = getNavbarHeight(); // 動態獲取高度

    const sectionTop =
      sectionRefs[index].current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionTop - navbarHeight,
      behavior: "smooth",
    });

    setCurrentSection(index);
  };

  return (
    <div className="flex w-screen flex-col gap-10 bg-highlight dark:bg-shadow3">
      <Navbar
        ref={navbarRef} // 傳遞 ref 給 Navbar
        scrollToSection={scrollToSection}
        currentSection={currentSection}
      />
      {currentSection !== 0 && <BackToTop scrollToSection={scrollToSection} />}
      <HomepageSection ref={sectionRefs[0]} scrollToSection={scrollToSection} />
      <AboutUsSection ref={sectionRefs[1]} scrollToSection={scrollToSection} />
      <ServiceContent ref={sectionRefs[2]} />
      <WorkProcess ref={sectionRefs[3]} />
      <ContactUsSection ref={sectionRefs[4]} />
      <Footer />
      <Modal />
    </div>
  );
}

export default App;
