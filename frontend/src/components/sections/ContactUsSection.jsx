import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { showRegisterSuccessToast } from "../../utils/showToast";
import { Toaster } from "react-hot-toast";
import useCsrfStore from "../../store/csrfStore";

const ContactUsSection = forwardRef((props, ref) => {
  const { createCase, getCsrfToken, csrfToken } = useCsrfStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await createCase(data);
    console.log(csrfToken);
    if (res.data) {
      showRegisterSuccessToast();
      reset();
    } else {
      // alert("Oops, something went wrong. Please try again later.");
      console.log(res);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getCsrfToken();
    }
    fetchData();
  }, []);

  return (
    <section
      ref={ref}
      className="relative mb-[5rem] mt-[5rem] flex h-[calc(100vh-10rem)] max-w-full flex-col items-center justify-center overflow-hidden bg-highlight dark:bg-shadow3"
    >
      <Toaster />
      <div className="flex items-center justify-center gap-[4rem]">
        <form
          className="flex h-[42.5rem] w-[52rem] flex-col justify-start"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex h-[11.146rem] w-full flex-col justify-start">
            <label>
              <div className="flex items-center gap-[1rem]">
                <div className="text-base font-regualar">Name</div>
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
                className="mt-[1rem] h-[6.95rem] w-full rounded-[1rem] border-[0.17rem] py-[2.09rem] pl-[2.78rem] text-base font-regualar"
              />
            </label>
          </div>
          <div className="mt-[1.5rem] flex h-[11.146rem] w-full flex-col justify-start">
            <label>
              <div className="flex items-center gap-[1rem]">
                <div className="text-base font-regualar">Email</div>
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
                className="mt-[1rem] h-[6.95rem] w-full rounded-[1rem] border-[0.17rem] py-[2.09rem] pl-[2.78rem] text-base font-regualar"
              />
            </label>
          </div>
          <div className="mt-[1.5rem] flex h-[11.146rem] w-full flex-col justify-start">
            <label>
              <div className="flex items-center gap-[1rem]">
                <div className="text-base font-regualar">Line ID</div>
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
                className="mt-[1rem] h-[6.95rem] w-full rounded-[1rem] border-[0.17rem] py-[2.09rem] pl-[2.78rem] text-base font-regualar"
              />
            </label>
          </div>
          <div className="mt-[2rem] flex h-[4.06rem] w-full justify-between">
            <button
              type="submit"
              className="font-inter h-full w-[19.69rem] rounded-[1.875rem] bg-[#A8A8A8] text-lg font-extrabold text-highlight"
            >
              Submit
            </button>
            <button
              type="reset"
              className="font-inter h-full w-[19.69rem] rounded-[1.875rem] bg-[#A8A8A8] text-lg font-[900] text-midtone"
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
