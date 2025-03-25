import { forwardRef } from "react";
import { useForm } from "react-hook-form";

const ContactUsSection = forwardRef((props, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("表單資料:", data);
  };

  return (
    <section
      ref={ref}
      className="flex h-full w-full flex-1 items-center justify-evenly bg-yellow-100"
    >
      <form
        className="flex h-[42.5rem] w-[52rem] flex-col justify-start bg-green-100"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex h-[11.146rem] w-full flex-col justify-start bg-blue-100">
          <label className="text-[2rem] font-[400]">
            Name
            <input
              {...register("name", { required: "請幫忙填寫此欄位" })}
              type="text"
              placeholder="請輸入稱呼"
              className="mt-[1rem] h-[6.95rem] w-full rounded-[1rem] border-[0.17rem] py-[2.09rem] pl-[2.78rem] text-[2rem] font-[400]"
            />
          </label>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mt-[1.5rem] flex h-[11.146rem] w-full flex-col justify-start bg-blue-100">
          <label className="text-[2rem] font-[400]">
            Email
            <input
              {...register("email", {
                required: "請幫忙填寫此欄位",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "請輸入有效的電子郵件",
                },
              })}
              type="text"
              placeholder="請輸入信箱"
              className="mt-[1rem] h-[6.95rem] w-full rounded-[1rem] border-[0.17rem] py-[2.09rem] pl-[2.78rem] text-[2rem] font-[400]"
            />
          </label>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-[1.5rem] flex h-[11.146rem] w-full flex-col justify-start bg-blue-100">
          <label className="text-[2rem] font-[400]">
            Line ID
            <input
              {...register("lineId", { required: "請幫忙填寫此欄位" })}
              type="text"
              placeholder="請輸入帳號"
              className="mt-[1rem] h-[6.95rem] w-full rounded-[1rem] border-[0.17rem] py-[2.09rem] pl-[2.78rem] text-[2rem] font-[400]"
            />
          </label>
          {errors.lineId && (
            <p className="text-red-500">{errors.lineId.message}</p>
          )}
        </div>
        <div className="mt-[2rem] flex h-[4.06rem] w-full justify-between bg-blue-100">
          <button
            type="submit"
            className="h-full w-[19.69rem] rounded-[1.875rem] bg-[#A8A8A8] font-noto text-[2.25rem] font-[900] text-highlight"
          >
            Submit
          </button>
          <button
            type="reset"
            className="h-full w-[19.69rem] rounded-[1.875rem] bg-[#A8A8A8] font-noto text-[2.25rem] font-[900] text-midtone"
          >
            Clear
          </button>
        </div>
      </form>
      <div className="flex h-[42.5rem] w-[52rem] items-center justify-center bg-midtone">
        <div className="font-noto text-[3rem] font-[900]">LOGO</div>
      </div>
    </section>
  );
});

export default ContactUsSection;
