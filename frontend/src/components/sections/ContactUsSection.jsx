import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { showRegisterSuccessToast } from "../../utils/showToast";
import { Toaster } from "react-hot-toast";
import useCsrfStore from "../../store/csrfStore";

import fIcon from "../../assets/contactUs/f-icon.webp";
import dIcon from "../../assets/contactUs/d-icon.webp";
import submitBtn from "../../assets/contactUs/btn-submit.svg";
import imageBtn from "../../assets/contactUs/btn-image.svg";
import businessBtn from "../../assets/contactUs/btn-business.svg";
import spaBtn from "../../assets/contactUs/btn-spa.svg";
import otherBtn from "../../assets/contactUs/btn-other.svg";

const ContactUsSection = forwardRef((props, ref) => {
  const { createCase, getCsrfToken, csrfToken } = useCsrfStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service: "image",
      budget: "under_30000",
    },
  });

  const services = [
    {
      id: "service1",
      value: "image",
      image: imageBtn,
      alt: "形象官網",
    },
    {
      id: "service2",
      value: "business",
      image: businessBtn,
      alt: "商務網站",
    },
    {
      id: "service3",
      value: "spa",
      image: spaBtn,
      alt: "一頁式網站",
    },
    {
      id: "service4",
      value: "other",
      image: otherBtn,
      alt: "其他",
    },
  ];

  const budgets = [
    {
      id: "budget1",
      value: "under_30000",
      text: "3萬元以下",
    },
    {
      id: "budget2",
      value: "between_30000_150000",
      text: "3-15萬元",
    },
    {
      id: "budget3",
      value: "over_150000",
      text: "15萬元以上",
    },
    {
      id: "budget4",
      value: "unknown",
      text: "未設定預算",
    },
  ];

  const onSubmit = async (data) => {
    // const res = await createCase(data);
    // console.log(csrfToken);
    // if (res.data) {
    //   showRegisterSuccessToast();
    //   reset();
    // } else {
    //   // alert("Oops, something went wrong. Please try again later.");
    //   console.log(res);
    // }
    console.log(data);
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
      className="relative flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-highlight dark:bg-shadow3"
    >
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="h-full w-full">
        <div className="grid h-full w-full grid-rows-[23.57fr_69.29fr_7.14fr]">
          <div className="grid h-full w-full grid-cols-[16.7fr_66.6fr_16.7fr] justify-around px-[2rem]">
            <img className="h-full w-full" src={fIcon} alt="fIcon" />
            <div className="justfy-center flex flex-col gap-[1rem] pt-[0.5rem] dark:text-highlight">
              <h1 className="text-xlg text-center font-sf font-semibold">
                您的故事，化為數位傑作
              </h1>
              <p className="px-[2rem] font-sf text-xxs font-medium">
                每個人心中都有一個獨一無二的故事，分享您的故事，讓我們以數位魔法將其轉化為令人驚嘆的產品——從互動網站到專屬應用程式，讓您的故事在數位世界中閃耀！
              </p>
            </div>
            <img
              className="h-full w-full opacity-[0.7]"
              src={dIcon}
              alt="fIcon"
            />
          </div>
          <div className="grid h-full w-full grid-cols-[1fr_1fr] gap-[2rem] px-[2rem]">
            <div className="flex flex-col justify-start gap-[1rem]">
              <div className="text-xlg font-sf font-semibold text-highlight">
                聯絡方式
              </div>
              <div className="flex flex-col justify-center gap-[1rem]">
                <div>
                  <label className="flex flex-col gap-[0.25rem]">
                    <div className="flex items-center gap-[1rem]">
                      <div className="font-sf text-xs font-normal text-highlight">
                        姓名
                      </div>
                      {errors.name && (
                        <div className="font-sf text-xs font-normal text-[#999999]">
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                    <input
                      {...register("name", {
                        required: "＊噢不～輸入有誤 (⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)",
                      })}
                      type="text"
                      placeholder="請輸入稱呼"
                      className="w-full rounded-[1rem] border-[0.17rem] py-[0.25rem] pl-[2rem] font-sf text-sm font-medium"
                    />
                  </label>
                </div>
                <div>
                  <label className="flex flex-col gap-[0.25rem]">
                    <div className="flex items-center gap-[1rem]">
                      <div className="font-sf text-xs font-normal text-highlight">
                        信箱
                      </div>
                      {errors.email && (
                        <div className="font-sf text-xs font-normal text-[#999999]">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                    <input
                      {...register("email", {
                        required: "＊噢不～信箱格式錯誤 (⊙_⊙)",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "＊噢不～信箱格式錯誤 (⊙_⊙)",
                        },
                      })}
                      type="text"
                      placeholder="請輸入信箱"
                      className="w-full rounded-[1rem] border-[0.17rem] py-[0.25rem] pl-[2rem] font-sf text-sm font-medium"
                    />
                  </label>
                </div>
                <div>
                  <label className="flex flex-col gap-[0.25rem]">
                    <div className="flex items-center gap-[1rem]">
                      <div className="font-sf text-xs font-normal text-highlight">
                        LINE ID
                      </div>
                      {errors.line_id && (
                        <div className="font-sf text-xs font-normal text-[#999999]">
                          {errors.line_id.message}
                        </div>
                      )}
                    </div>
                    <input
                      {...register("line_id", {
                        required: "＊噢不～ID看起來有誤(´･ω･`)",
                      })}
                      type="text"
                      placeholder="請輸入稱呼"
                      className="w-full rounded-[1rem] border-[0.17rem] py-[0.25rem] pl-[2rem] font-sf text-sm font-medium"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-start gap-[1rem]">
              <div className="text-xlg font-sf font-semibold text-highlight">
                需要的服務類型
              </div>

              <div className="flex justify-around">
                {services.map((service) => (
                  <label key={service.id} className="radio-image">
                    <input
                      {...register("service")}
                      type="radio"
                      id={service.id}
                      value={service.value}
                      className="hidden"
                      defaultChecked={service.value === "image"}
                    />
                    <div className="flex flex-col items-center justify-center gap-[0.25rem]">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="h-[5rem] w-[5rem]"
                      />
                      <p className="font-sf text-[1.125rem] font-[620] text-highlight">
                        {service.alt}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="text-xlg font-sf font-semibold text-highlight">
                大約預算是
              </div>
              <div className="flex justify-around">
                {budgets.map((budget) => (
                  <label key={budget.id} className="radio-image">
                    <input
                      {...register("budget")}
                      type="radio"
                      id={budget.id}
                      value={budget.value}
                      className="hidden"
                      defaultChecked={budget.value === "under_30000"}
                    />
                    <div className="flex flex-col items-center justify-center">
                      <button className="rounded-[0.5rem] border px-[0.5rem] py-[0.25rem] font-sf text-[1.125rem] font-[620] text-highlight">
                        {budget.text}
                      </button>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex h-full w-full items-center justify-center">
            <button>
              <img src={submitBtn} alt="submitBtn" />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
});

export default ContactUsSection;

{
  /* <form
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
        </div> */
}
