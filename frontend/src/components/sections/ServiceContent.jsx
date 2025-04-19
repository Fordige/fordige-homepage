import { forwardRef, useState } from "react";

import imageIcon from "../../assets/serviceContent/icon-image.svg";
import ServiceButton from "../ui/serviceButton";
import showImage from "../../assets/serviceContent/show-image.webp";
import showBusiness from "../../assets/serviceContent/show-business.webp";
import showSpa from "../../assets/serviceContent/show-spa.webp";
import showOther from "../../assets/serviceContent/show-other.webp";

const ServiceContent = forwardRef((props, ref) => {
  const [currentPage, setCurrentPage] = useState(0);

  const services = [
    {
      title: "形象官網",
      description:
        "打造專業且具吸引力的形象網頁，展示您的品牌價值與獨特風格，立即提升客戶信任感！透過精心設計的視覺與內容，吸引更多潛在客戶，讓您的品牌在競爭中脫穎而出，轉化為實質商機，助您賺取更多利潤！",
      icon: showImage,
    },
    {
      title: "商務網站",
      description:
        "功能強大的商務網站，整合線上購物、金流系統與客戶管理，簡化您的業務流程！提供順暢的用戶體驗，增加客戶留存率與回購率，讓您的電商事業快速成長，輕鬆將流量轉化為穩定收入！！",
      icon: showBusiness,
    },
    {
      title: "一頁式網站",
      description:
        "簡潔高效的一頁式網站，專為快速轉換設計，完美呈現產品或服務優勢！透過清晰的引導與強烈的行動號召，讓訪客迅速下單或聯繫您，縮短銷售路徑，快速提升您的業績與獲利！",
      icon: showSpa,
    },
    {
      title: "其他",
      description:
        "客製化解決方案，滿足您獨特的業務需求，無論是活動頁面、會員系統或其他創新功能APP！我們為您量身打造專屬工具，幫助您優化運營效率，吸引更多客戶，創造更多收入來源！",
      icon: showOther,
    },
  ];
  return (
    <section
      className="flex h-[80vh] w-full flex-col items-center justify-around bg-highlight dark:bg-shadow3"
      ref={ref}
    >
      <div className="text-xlg flex h-[13.33%] flex-col items-start justify-center text-center font-sf font-semibold text-shadow3 dark:text-highlight">
        <div>從設計到智能</div>
        <div className="px-[5rem]">解決您的數位需求</div>
      </div>
      <div className="flex h-[75%] w-full justify-around">
        <div className="flex w-[32.22%] items-end justify-center">
          <ServiceButton
            className="w-[73.54%]"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          <div className="absolute right-[2rem] top-0">
            <img className="w-[3rem]" src={imageIcon} alt="imageIcon" />
          </div>
        </div>
        <div className="flex w-[60.31%] flex-col justify-around border border-shadow3 p-[1rem] dark:border-shadow2">
          <h1 className="font-sf text-[1.125rem] font-[620] text-shadow3 dark:text-highlight">
            {services[currentPage].title}
          </h1>
          <p className="font-sf text-xxs font-medium text-shadow3 dark:text-highlight">
            {services[currentPage].description}
          </p>
          <img src={services[currentPage].icon} alt={`${services[0].title}`} />
        </div>
      </div>
    </section>
  );
});

export default ServiceContent;
