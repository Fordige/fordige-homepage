import useModalStore from "../../store/modalStore";
import lineContact from "../../assets/line_contact_us.svg";
import lineContactChicken from "../../assets/line_contact_chicken.svg";
import lineQrcode from "../../assets/line_qrcode.svg";

function Modal() {
  const isModalOpen = useModalStore((state) => state.isModalOpen);

  const closeModal = useModalStore((state) => state.closeModal);
  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div
            className="relative flex h-[25rem] w-[32.75rem] rounded-[1.75rem] bg-highlight"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-[2rem] top-[0.1rem] font-sf text-[1.167rem]"
              onClick={closeModal}
            >
              x
            </button>
            <div className="flex h-full w-[19rem] flex-col items-center justify-between py-[1.75rem]">
              <h1 className="font-sf text-lg font-semibold text-shadow3">
                加入官方
              </h1>
              <div className="h-[3.3125rem] w-[16.125rem] rounded-[1rem] bg-shadow3 text-center font-sf text-lg font-semibold text-highlight">
                ＠102xangi
              </div>
              <img
                className="h-[13.75rem] w-[14.125rem]"
                src={lineQrcode}
                alt="lineQrcode"
              />
            </div>

            <div className="flex h-full w-[13.75rem] flex-col justify-between py-[1.75rem]">
              <img
                className="h-[10.75rem] w-[10.75rem]"
                src={lineContact}
                alt="lineContact"
              />
              <img
                className="h-[10.75rem] w-[10.75rem]"
                src={lineContactChicken}
                alt="lineContactChicken"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
