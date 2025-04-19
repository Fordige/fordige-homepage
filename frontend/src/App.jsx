import { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
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
  const navbarRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(0);

  // 動態計算 Navbar 高度
  const getNavbarHeight = () => {
    if (navbarRef.current) {
      return navbarRef.current.getBoundingClientRect().height;
    }
    return 80;
  };

  // 點擊導航時滾動到指定 section
  const scrollToSection = (index) => {
    const navbarHeight = getNavbarHeight();
    const sectionTop =
      sectionRefs[index].current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionTop - navbarHeight,
      behavior: "smooth",
    });
    setCurrentSection(index);
  };

  // 監聽滾動事件，動態更新 currentSection
  useEffect(() => {
    const handleScroll = throttle(() => {
      const navbarHeight = getNavbarHeight();
      const scrollPosition = window.scrollY + navbarHeight;

      for (let i = 0; i < sectionRefs.length; i++) {
        const section = sectionRefs[i].current;
        if (!section) continue;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
          scrollPosition >= sectionTop - 50 &&
          scrollPosition < sectionBottom
        ) {
          setCurrentSection(i);
          break;
        }
      }
    }, 1000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // 清理節流
    };
  }, [sectionRefs]);

  return (
    <div className="flex w-screen flex-col items-center gap-[5rem] bg-highlight dark:bg-shadow3">
      <Navbar
        ref={navbarRef}
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
