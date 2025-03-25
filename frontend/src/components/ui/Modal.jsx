import useModalStore from "../../store/modalStore";

function Modal() {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const target = useModalStore((state) => state.target);
  const closeModal = useModalStore((state) => state.closeModal);
  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div
            className="relative flex h-[39rem] w-[75rem] items-center justify-center gap-2 rounded-[2rem] bg-white p-[1.5rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-[2rem] top-[0.1rem] font-orbitron text-[3rem]"
              onClick={closeModal}
            >
              x
            </button>
            <div className="flex h-[24rem] w-[36rem] justify-end">
              <div className="flex h-full w-[18.5rem] flex-col justify-between">
                <h1 className="text-center font-noto text-[3rem]">QR Code</h1>
                <img
                  src={target}
                  alt="QR Code"
                  className="h-[18.5rem] w-[18.5rem]"
                />
              </div>
            </div>
            <div className="flex h-[24rem] w-[36rem] justify-start">
              <div className="flex h-full w-[18.5rem] flex-col">
                <img
                  src={
                    target === "/assets/line_qrcode.svg"
                      ? "/assets/line_contact_us.svg"
                      : "/assets/ig_contact_us.svg"
                  }
                  alt="Media Icon"
                  className="h-[18.5rem] w-[18.5rem]"
                />
                <h1 className="text-center font-noto text-[3rem]">
                  Contact Us
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
