import { motion } from "framer-motion";
import useLanguageStore from "../../store/languageStore";
import quickContact from "../../assets/quick_contact.svg";

const ContactUsButton = ({ onClick }) => {
  const { content } = useLanguageStore();
  return (
    <motion.button
      className="flex w-[13.75rem] items-center justify-center rounded-[2.5rem] bg-accent p-1 font-sf text-[2rem] font-medium text-shadow3 shadow-lg shadow-midtone dark:shadow-shadow3 md:w-[10rem] md:text-xs"
      onClick={onClick}
      animate={{
        scale: 1.5,
        y: "50%",
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {content.homepage_button}
      <img
        className="h-[1.219rem] w-[1.219rem]"
        src={quickContact}
        alt="quickContact"
      />
    </motion.button>
  );
};

export default ContactUsButton;
