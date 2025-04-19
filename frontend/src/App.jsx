import { useRef, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Modal from "./components/ui/Modal";
import HomepageSection from "./components/sections/HomepageSection";
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

  const [currentSection, setCurrentSection] = useState(0);

  // 動態計算 Navbar 高度
  const getNavbarHeight = () => {
    if (navbarRef.current) {
      return navbarRef.current.getBoundingClientRect().height;
    }
    return 80; // 備用值（若 Navbar 未渲染）
  };

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
    <div className="flex w-screen flex-col items-center gap-[1rem] bg-highlight dark:bg-shadow3">
      <Navbar
        ref={navbarRef} // 傳遞 ref 給 Navbar
        scrollToSection={scrollToSection}
        currentSection={currentSection}
      />
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
