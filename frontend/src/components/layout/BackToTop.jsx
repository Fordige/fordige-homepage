import { GoTriangleUp } from "react-icons/go";

const BackToTop = ({ scrollToSection }) => {
  return (
    <div
      className="fixed bottom-[5rem] right-[2rem] z-20 flex h-[1.88rem] w-[8.63rem] cursor-pointer items-center justify-center rounded-[1rem] bg-highlight dark:bg-shadow3"
      onClick={() => scrollToSection(0)}
    >
      <p className="bg-[radial-gradient(circle_at_center,#1A8C16,#20591E)] bg-clip-text font-sf text-xxs font-medium text-transparent dark:text-highlight">
        back to top
      </p>
      <GoTriangleUp className="fill-[url(#myGradient)] text-highlight dark:fill-highlight" />
    </div>
  );
};

export default BackToTop;
