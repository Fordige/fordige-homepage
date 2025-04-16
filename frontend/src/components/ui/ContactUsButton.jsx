import useLanguageStore from "../../store/languageStore";
import quickContact from "../../assets/quick_contact.svg";

const ContactUsButton = ({ onClick }) => {
  const { content } = useLanguageStore();
  return (
    <button
      className="flex w-[10rem] items-center justify-center rounded-[2.5rem] bg-accent p-1 font-sf text-xs font-medium text-shadow3 shadow-lg shadow-midtone dark:shadow-shadow3"
      onClick={onClick}
    >
      {content.homepage_button}
      <img
        className="h-[1.219rem] w-[1.219rem]"
        src={quickContact}
        alt="quickContact"
      />
    </button>
  );
};

export default ContactUsButton;
