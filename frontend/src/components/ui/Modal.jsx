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
            className="relative flex h-[39rem] w-[75rem] items-center justify-center gap-[4rem] rounded-[2rem] bg-white p-[1.5rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-[2rem] top-[0.1rem] font-orbitron text-[3rem]"
              onClick={closeModal}
            >
              x
            </button>
            <div className="flex h-[24rem] w-[36rem] justify-end">
              <div className="flex h-full w-[19.06rem] flex-col gap-[2rem]">
                <h1 className="text-center font-noto text-[4rem] font-[800]">
                  QR code
                </h1>
                <img
                  src={target}
                  alt="QR code"
                  className="h-[18.5rem] w-[19.06rem]"
                />
              </div>
            </div>
            <div className="flex h-[24rem] w-[36rem] justify-start">
              <div className="flex h-full w-[19.06rem] flex-col gap-[2rem]">
                <img
                  src={
                    target === "/assets/line_qrcode.svg"
                      ? "/assets/line_contact_us.svg"
                      : "/assets/ig_contact_us.svg"
                  }
                  alt="Media Icon"
                  className="h-[19.06rem] w-[19.06rem]"
                />
                <h1 className="w-[24rem] text-center font-noto text-[4rem] font-[800]">
                  Contact us
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
