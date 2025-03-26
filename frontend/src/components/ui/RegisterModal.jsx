import useModalStore from "../../store/modalStore";

function RegisterModal() {
  const isRegisterModalOpen = useModalStore(
    (state) => state.isRegisterModalOpen,
  );
  const closeRegisterModal = useModalStore((state) => state.closeRegisterModal);
  return (
    <>
      {isRegisterModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeRegisterModal}
        >
          <div
            className="relative flex h-[13rem] w-[19rem] flex-col items-center justify-center rounded-[1.75rem] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-[6.25rem] w-[17rem] items-center justify-evenly">
              <img
                className="h-[2.56rem] w-[2.56rem]"
                src="/assets/celebrate.svg"
                alt="celebrate"
              />
              <div className="font-noto text-lg font-medium">已登記成功</div>
            </div>
            <button
              className="flex h-[4.75rem] w-[15.44rem] items-center justify-center rounded-[1.875rem] bg-accent font-inter text-lg font-medium"
              onClick={closeRegisterModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterModal;
