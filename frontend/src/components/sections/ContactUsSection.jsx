import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { createCase } from "../../utils/api";
import useModalStore from "../../store/modalStore";

const ContactUsSection = forwardRef((props, ref) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const openRegisterModal = useModalStore((state) => state.openRegisterModal);

  const onSubmit = async (data) => {
    const res = await createCase(data);
    if (res.data) {
      reset();
      openRegisterModal();
    } else {
      alert("Oops, something went wrong. Please try again later.");
    }
  };

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen justify-center gap-[4rem] pb-[7rem] pt-[6rem]"
    >
      <div className="flex items-center justify-center gap-[4rem]">
        <form
          className="flex h-[42.5rem] w-[52rem] flex-col justify-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex h-[11.146rem] w-full flex-col justify-start">
            <label>
              <div className="flex items-center gap-[1rem]">
                <div className="font-regualar text-base">Name</div>
                {errors.user_id && (
                  <div className="font-inter text-sm text-accent">
                    {errors.user_id.message}
                  </div>
                )}
              </div>
              <input
                {...register("user_id", {
                  required: "＊Oops, input info error—gotcha! (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
                })}
                type="text"
                placeholder="請輸入稱呼"
                className="font-regualar mt-[1rem] h-[6.95rem] w-full rounded-[1rem] border-[0.17rem] py-[2.09rem] pl-[2.78rem] text-base"
              />
            </label>
          </div>
          <div className="mt-[1.5rem] flex h-[11.146rem] w-full flex-col justify-start">
            <label>
              <div className="flex items-center gap-[1rem]">
                <div className="font-regualar text-base">Email</div>
                {errors.email && (
                  <div className="font-inter text-sm text-accent">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <input
                {...register("email", {
                  required: "＊Oops, mail format error—whaaat?! (⊙_⊙)",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "＊Oops, mail format error—whaaat?! (⊙_⊙)",
                  },
                })}
                type="text"
                placeholder="請輸入信箱"
                className="font-regualar mt-[1rem] h-[6.95rem] w-full rounded-[1rem] border-[0.17rem] py-[2.09rem] pl-[2.78rem] text-base"
              />
            </label>
          </div>
          <div className="mt-[1.5rem] flex h-[11.146rem] w-full flex-col justify-start">
            <label>
              <div className="flex items-center gap-[1rem]">
                <div className="font-regualar text-base">Line ID</div>
                {errors.user_line_id && (
                  <div className="font-inter text-sm text-accent">
                    {errors.user_line_id.message}
                  </div>
                )}
              </div>
              <input
                {...register("user_line_id", {
                  required: "＊Oops, ID seems error (´･ω･`)",
                })}
                type="text"
                placeholder="請輸入帳號"
                className="font-regualar mt-[1rem] h-[6.95rem] w-full rounded-[1rem] border-[0.17rem] py-[2.09rem] pl-[2.78rem] text-base"
              />
            </label>
          </div>
          <div className="mt-[2rem] flex h-[4.06rem] w-full justify-between">
            <button
              type="submit"
              className="h-full w-[19.69rem] rounded-[1.875rem] bg-[#A8A8A8] font-inter text-lg font-extrabold text-highlight"
            >
              Submit
            </button>
            <button
              type="reset"
              className="h-full w-[19.69rem] rounded-[1.875rem] bg-[#A8A8A8] font-inter text-lg font-[900] text-midtone"
            >
              Clear
            </button>
          </div>
        </form>
        <div className="flex h-[42.5rem] w-[52rem] items-center justify-center bg-midtone">
          <div className="font-noto text-[3rem] font-[900]">LOGO</div>
        </div>
      </div>
    </section>
  );
});

export default ContactUsSection;
