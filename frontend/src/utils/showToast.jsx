import toast from "react-hot-toast";
import celebrateIcon from "../assets/celebrate.svg";

export const showRegisterSuccessToast = () => {
  toast(
    <div className="flex h-[6.25rem] w-[17rem] items-center justify-evenly">
      <img
        className="h-[2.56rem] w-[2.56rem]"
        src={celebrateIcon}
        alt="celebrate"
      />
      <div className="font-noto text-lg font-medium">已登記成功</div>
    </div>,
    {
      duration: 2000,
      style: {
        borderRadius: "1.75rem",
      },
    },
  );
};
