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
import ChatIcon from "./components/ui/ChatIcon";

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
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);

  const getNavbarHeight = () => {
    if (navbarRef.current) {
      return navbarRef.current.getBoundingClientRect().height;
    }
    return 80;
  };

  const scrollToSection = (index) => {
    setIsProgrammaticScroll(true);
    setCurrentSection(index);
  };

  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
    console.log(`App 渲染次數: ${renderCount.current}`);
  });

  useEffect(() => {
    if (!isProgrammaticScroll) return;

    const navbarHeight = getNavbarHeight();
    const section = sectionRefs[currentSection].current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: sectionTop - navbarHeight,
      behavior: "smooth",
    });

    const timeout = setTimeout(() => {
      setIsProgrammaticScroll(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentSection, isProgrammaticScroll]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (isProgrammaticScroll) return;

      const navbarHeight = getNavbarHeight();
      const scrollPosition = window.scrollY + navbarHeight;

      if (window.scrollY > 0) {
        navbarRef.current.style.opacity = "0.4";
      } else {
        navbarRef.current.style.opacity = "0";
      }

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
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [isProgrammaticScroll]);

  return (
    <div className="flex w-screen flex-col items-center gap-[12vh] bg-highlight dark:bg-shadow3 md:gap-[15rem]">
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
      <ChatIcon />
    </div>
  );
}

export default App;
