import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { showRegisterSuccessToast } from "../../utils/showToast";
import { Toaster } from "react-hot-toast";
import useCsrfStore from "../../store/csrfStore";

import fIcon from "../../assets/contactUs/f-icon.webp";
import dIcon from "../../assets/contactUs/d-icon.webp";
import submitBtn from "../../assets/contactUs/btn-submit.svg";
import useModalStore from "../../store/modalStore";
import useServiceStore from "../../store/serviceStore";

// text animation
import titleAnimation from "../../assets/contactUs/title-animation.webm";
import titleAnimation4444 from "../../assets/contactUs/title-animation.mov";
import { motion, useInView } from "framer-motion";

const ContactUsSection = forwardRef((props, ref) => {
  const { createCase, getCsrfToken } = useCsrfStore();
  const openModal = useModalStore((state) => state.openModal);
  const { services } = useServiceStore();
  const isInView = useInView(ref, { once: true }, { threshold: 0.3 });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      line_id: "",
      service: "image",
      budget: "under_30000",
    },
    mode: "onChange",
    shouldUnregister: false,
  });
  const selectedService = watch("service", "image");
  const selectedBudget = watch("budget", "under_30000");

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
    const res = await createCase(data);
    if (res.data) {
      showRegisterSuccessToast();
      reset();
      openModal();
    } else {
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
    <div className="h-full w-full" ref={ref}>
      <Toaster />
      {/* 手機版 */}
      <section className="flex h-[190vh] w-full flex-col gap-[7vh] bg-highlight dark:bg-shadow3 md:hidden">
        <video
          className="w-[60vw] self-start"
          muted
          autoPlay
          playsInline
          loop={false}
          preload="auto"
        >
          <source src={titleAnimation4444} />
          <source src={titleAnimation} type="video/webm" />
        </video>
        <motion.div
          className="flex h-[50%] w-full flex-col items-center justify-around"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img className="h-[20.14vh] w-[80vw]" src={fIcon} alt="fIcon" />
          <div className="justfy-center flex flex-col items-center font-sf text-[7.5vw] font-semibold text-shadow3 dark:text-highlight">
            <div>您的故事，</div>
            <div className="px-[12.5vw]">化為數位傑作</div>
          </div>
          <div className="px-[5vw] font-sf text-[3.125vw] font-medium text-shadow3 dark:text-highlight">
            每個人心中都有一個獨一無二的故事，分享您的故事，讓我們以數位魔法將其轉化為令人驚嘆的產品——從互動網站到專屬應用程式，讓您的故事在數位世界中閃耀！
          </div>
          <img className="h-[20.14vh] w-[80vw]" src={dIcon} alt="dIcon" />
        </motion.div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-[50%] w-full flex-col items-center justify-around"
        >
          <div className="font-sf text-[7.5vw] font-semibold text-shadow3 dark:text-highlight">
            聯絡方式
          </div>
          <div className="flex flex-col gap-[2.5vw]">
            <label className="flex flex-col gap-[0.625vw]">
              <div className="flex items-center gap-[2.5vw]">
                <div className="font-sf text-[4.375vw] font-normal text-shadow3 dark:text-highlight">
                  姓名
                </div>
                {errors.name && (
                  <div className="font-sf text-[2.5vw] font-normal text-[#999999]">
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
                className="w-[80vw] rounded-[2.5vw] border-[0.425vw] py-[0.625vw] pl-[10vw] font-sf text-sm font-medium"
                onChange={(e) => {
                  setValue("name", e.target.value, { shouldValidate: true });
                }}
              />
            </label>

            <label className="flex flex-col gap-[0.625vw]">
              <div className="flex items-center gap-[2.5vw]">
                <div className="font-sf text-[4.375vw] font-normal text-shadow3 dark:text-highlight">
                  信箱
                </div>
                {errors.email && (
                  <div className="font-sf text-[2.5vw] font-normal text-[#999999]">
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
                className="w-[80vw] rounded-[2.5vw] border-[0.425vw] py-[0.625vw] pl-[10vw] font-sf text-sm font-medium"
                onChange={(e) => {
                  setValue("email", e.target.value, { shouldValidate: true });
                }}
              />
            </label>

            <label className="flex flex-col gap-[0.625vw]">
              <div className="flex items-center gap-[2.5vw]">
                <div className="font-sf text-[4.375vw] font-normal text-shadow3 dark:text-highlight">
                  LINE ID
                </div>
                {errors.line_id && (
                  <div className="font-sf text-[2.5vw] font-normal text-[#999999]">
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
                className="w-[80vw] rounded-[2.5vw] border-[0.425vw] py-[0.625vw] pl-[10vw] font-sf text-sm font-medium"
                onChange={(e) => {
                  setValue("line_id", e.target.value, { shouldValidate: true });
                }}
              />
            </label>
          </div>

          <div className="font-sf text-[7.5vw] font-semibold text-shadow3 dark:text-highlight">
            需要的服務類型
          </div>

          <div className="flex items-center justify-around">
            {services.map((service) => (
              <label
                key={service.id}
                className="radio-image cursor-pointer"
                htmlFor={service.id}
              >
                <input
                  {...register("service")}
                  type="radio"
                  name="service"
                  id={service.id}
                  value={service.value}
                  className="absolute h-0 w-0 opacity-0"
                  onChange={(e) => {
                    setValue("service", e.target.value, {
                      shouldValidate: true,
                      shouldDirty: false, // 明確設置 shouldDirty
                    });
                  }}
                />
                <div
                  className={`flex flex-col items-center justify-center gap-[0.625rem] p-[2.5vw] ${
                    selectedService === service.value
                      ? "border-[0.5vw] border-shadow bg-slate-200 dark:bg-shadow"
                      : "bg-transparent"
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="h-[5.7vh] w-[17.5vw] bg-shadow3 dark:bg-transparent"
                  />
                  <p className="font-sf text-[2.8125vw] font-[620] text-shadow3 dark:text-highlight">
                    {service.alt}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="font-sf text-[7.5vw] font-semibold text-shadow3 dark:text-highlight">
            大約預算是
          </div>
          <div className="bg-yellow flex items-center justify-center gap-[2.5vw]">
            {budgets.map((budget) => (
              <label
                key={budget.id}
                className="radio-image cursor-pointer"
                htmlFor={budget.id}
              >
                <input
                  {...register("budget")}
                  type="radio"
                  name="budget"
                  id={budget.id}
                  value={budget.value}
                  className="absolute h-0 w-0 opacity-0"
                  onChange={(e) => {
                    setValue("budget", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
                <div className="flex cursor-pointer flex-col items-center justify-center">
                  <div
                    className={`w-[19.0625vw] rounded-[1.25vw] px-[1.25vw] py-[0.625vw] text-center font-sf text-[4.375vw] font-[620] text-shadow3 dark:text-highlight ${
                      selectedBudget === budget.value
                        ? "border-[0.5vw] border-shadow bg-slate-200 dark:bg-shadow"
                        : "border border-shadow3 bg-transparent dark:border-highlight"
                    }`}
                  >
                    {budget.text}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <motion.button
            className="relative h-[4.56vh] w-[35.3125vw] rounded-[12.5vw]"
            type="submit"
            initial={{ scale: 1 }}
            animate={{ scale: 1.5 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <img
              className="absolute left-0 top-0 h-full w-full object-cover"
              src={submitBtn}
              alt="submitBtn"
            />
          </motion.button>
        </form>
      </section>
      {/* 桌面版 */}
      <section className="relative hidden h-[100vh] w-full flex-col items-center justify-center gap-[5rem] bg-highlight dark:bg-shadow3 md:flex">
        <video
          className="w-[35rem] self-start"
          muted
          autoPlay
          playsInline
          loop={false}
          preload="auto"
        >
          <source src={titleAnimation4444} />
          <source src={titleAnimation} type="video/webm" />
        </video>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col items-center justify-around"
        >
          <div className="grid h-full w-full grid-rows-[23.57fr_69.29fr_7.14fr] gap-[5rem]">
            <motion.div
              className="grid h-full w-full grid-cols-[16.7fr_66.6fr_16.7fr] justify-around px-[2rem]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
              }
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <img className="h-full w-full" src={fIcon} alt="fIcon" />
              <div className="justfy-center flex flex-col gap-[1rem] pt-[0.5rem] dark:text-highlight">
                <h1 className="text-center font-sf text-xlg font-semibold">
                  您的故事，化為數位傑作
                </h1>
                <p className="px-[2rem] font-sf text-xxs font-medium">
                  每個人心中都有一個獨一無二的故事，分享您的故事，讓我們以數位魔法將其轉化為令人驚嘆的產品——從互動網站到專屬應用程式，讓您的故事在數位世界中閃耀！
                </p>
              </div>
              <img
                className="h-full w-full opacity-[0.7]"
                src={dIcon}
                alt="dIcon"
              />
            </motion.div>
            <div className="grid h-full w-full grid-cols-[1fr_1fr] gap-[2rem] px-[2rem]">
              <div className="flex flex-col justify-between">
                <div className="font-sf text-xlg font-semibold text-shadow3 dark:text-highlight">
                  聯絡方式
                </div>

                <label className="flex flex-col gap-[0.25rem]">
                  <div className="flex items-center gap-[1rem]">
                    <div className="font-sf text-xs font-normal text-shadow3 dark:text-highlight">
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

                <label className="flex flex-col gap-[0.25rem]">
                  <div className="flex items-center gap-[1rem]">
                    <div className="font-sf text-xs font-normal text-shadow3 dark:text-highlight">
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

                <label className="flex flex-col gap-[0.25rem]">
                  <div className="flex items-center gap-[1rem]">
                    <div className="font-sf text-xs font-normal text-shadow3 dark:text-highlight">
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
              <div className="flex flex-col justify-between gap-[1rem]">
                <div className="flex flex-col gap-[1rem]">
                  <div className="font-sf text-xlg font-semibold text-shadow3 dark:text-highlight">
                    需要的服務類型
                  </div>

                  <div className="flex items-center justify-around">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className="radio-image cursor-pointer"
                        htmlFor={service.id}
                      >
                        <input
                          {...register("service")}
                          type="radio"
                          name="service"
                          id={service.id}
                          value={service.value}
                          className="absolute h-0 w-0 opacity-0"
                          onChange={(e) => {
                            setValue("service", e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        <div
                          className={`flex flex-col items-center justify-center gap-[0.25rem] p-[1rem] ${
                            selectedService === service.value
                              ? "border-[6px] border-shadow bg-blue-200 dark:bg-shadow"
                              : "bg-transparent"
                          }`}
                        >
                          <img
                            src={service.image}
                            alt={service.alt}
                            className="h-[5rem] w-[7rem] bg-shadow3 dark:bg-transparent"
                          />
                          <p className="font-sf text-[1.125rem] font-[620] text-shadow3 dark:text-highlight">
                            {service.alt}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <div className="font-sf text-xlg font-semibold text-shadow3 dark:text-highlight">
                    大約預算是
                  </div>
                  <div className="flex items-center justify-around">
                    {budgets.map((budget) => (
                      <label
                        key={budget.id}
                        className="radio-image cursor-pointer"
                        htmlFor={budget.id}
                      >
                        <input
                          {...register("budget")}
                          type="radio"
                          name="budget"
                          id={budget.id}
                          value={budget.value}
                          className="absolute h-0 w-0 opacity-0"
                          onChange={(e) => {
                            setValue("budget", e.target.value, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        <div className="flex cursor-pointer flex-col items-center justify-center">
                          <div
                            className={`rounded-[0.5rem] px-[0.5rem] py-[0.25rem] font-sf text-[1.125rem] font-[620] text-shadow3 dark:text-highlight ${
                              selectedBudget === budget.value
                                ? "border-[6px] border-shadow bg-blue-200 dark:bg-shadow"
                                : "border border-shadow3 bg-transparent dark:border-highlight"
                            }`}
                          >
                            {budget.text}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full w-full items-center justify-center">
              <motion.button
                initial={{ scale: 1 }}
                animate={{ scale: 1.5 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <img src={submitBtn} alt="submitBtn" />
              </motion.button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
});

export default ContactUsSection;
