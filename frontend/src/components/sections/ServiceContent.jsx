import { forwardRef } from "react";

const ServiceContent = forwardRef((props, ref) => {
  return (
    <section
      className="relative mb-[5rem] mt-[5rem] flex h-[calc(100vh-10rem)] max-w-full flex-col items-center justify-center overflow-hidden bg-highlight dark:bg-shadow3"
      ref={ref}
    >
      <div className="flex h-full w-full items-center justify-center bg-highlight text-[5rem] text-shadow3 dark:bg-shadow3 dark:text-highlight">
        Service Content
      </div>
    </section>
  );
});

export default ServiceContent;
