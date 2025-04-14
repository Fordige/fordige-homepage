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
        }, 500);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, totalSections]);

  const scrollToSection = (index) => {
    if (index === 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      sectionRefs[index].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setCurrentSection(index);
  };

  return (
    <div className="flex min-h-screen w-screen flex-col overflow-hidden bg-highlight dark:bg-shadow3">
      <Navbar
        scrollToSection={scrollToSection}
        currentSection={currentSection}
      />
      {currentSection !== 0 && <BackToTop scrollToSection={scrollToSection} />}
      <HomepageSection ref={sectionRefs[0]} />
      <AboutUsSection ref={sectionRefs[1]} scrollToSection={scrollToSection} />
      <Footer />
      <Modal />
    </div>
  );
}

export default App;
