import { forwardRef, useState } from "react";

import aboutUsBg from "../../assets/aboutUs/bg.jpeg";
import aboutUsBg2 from "../../assets/aboutUs/bg_2.jpeg";
import aboutUsBgIn from "../../assets/aboutUs/bg-in.jpeg";
import ContactUsButton from "../ui/ContactUsButton";
import rightButton from "../../assets/aboutUs/right-button.svg";
import leftButton from "../../assets/aboutUs/left-button.svg";
import rightButtonDark from "../../assets/aboutUs/right-button-dark.svg";
import leftButtonDark from "../../assets/aboutUs/left-button-dark.svg";
import useModeStore from "../../store/modeStore";

const AboutUsSection = forwardRef((props, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDarkMode } = useModeStore();
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };
  return (
    <section
      className="relative hidden h-[100dvh] w-screen items-center justify-center bg-highlight dark:bg-shadow3 md:flex"
      ref={ref}
    >
      {currentIndex === 0 && (
        <div className="mb-[5rem] mt-[5rem]">
          <img
            className="absolute inset-0 h-full w-full object-fill opacity-50"
            src={aboutUsBg}
            alt="aboutUsBg"
          />
          <div className="relative flex h-[31rem] w-[76rem] flex-col items-center justify-center p-[1rem] dark:text-highlight">
            <img
              className="absolute inset-0 h-full w-full rounded-bl-[6.25rem] rounded-tr-[6.25rem] object-fill opacity-[0.8] dark:opacity-[0.2]"
              src={aboutUsBgIn}
              alt="aboutUsBgIn"
            />
            <div className="relative">
              <div className="flex h-[3.125rem] w-[74rem] items-center justify-start font-cy2 text-lgg font-medium">
                從我們開始...
              </div>
              <div className="justfy-start flex h-[8.625rem] w-[74rem] items-center gap-[1.5rem] leading-[2.5rem]">
                <div className="flex items-center justify-center font-cy2 text-[4.375rem] font-black">
                  We
                </div>
                <div className="font-cy text-xs font-thin">
                  <div>
                    <span className="text-base">我們</span>曾經是
                    <span className="text-base">科技大廠</span>的
                    <span className="text-base">資料阿宅</span>
                    ，整天與<span className="text-base">數據</span>共舞、和
                    <span className="text-base">程式碼</span>談戀愛。
                  </div>
                  <div>
                    如今，我們化身<span className="text-base">數位魔法師</span>
                    ，就是<span className="text-base">不能說的那個人</span>
                    的遠親的遠親...
                    <span className="text-base">佛地...雞 (Fordi...ge)</span>，
                  </div>
                  <div>
                    只為給您打造
                    <span className="text-base">
                      最棒的網站及數位應用體驗！
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex h-[8.625rem] w-[74rem] items-center justify-start gap-[1rem] leading-[2.5rem]">
                <div className="flex w-[15rem] items-center justify-end gap-[1rem] font-cy2 text-[4.375rem] font-black">
                  <span>Care</span>
                  <span className="rotate-[35deg] text-xl">for</span>
                </div>
                <div className="font-cy text-xs font-thin">
                  <div>
                    <span className="text-base">我們</span>
                    絕對不是什麼冷冰冰的科技怪人，
                  </div>
                  <div>
                    我們<span className="text-base">超感性，愛說冷笑話</span>{" "}
                    (保證比bug還難忘)，
                  </div>
                  <div>
                    從<span className="text-base">設計</span>到
                    <span className="text-base">部署</span>
                    ，您的專案就交由我們來呵護寵壞。
                  </div>
                </div>
              </div>

              <div className="flex h-[8.625rem] w-[74rem] items-center justify-start gap-[1rem] leading-[2.5rem]">
                <div className="font-cy2 text-[4.375rem] font-black">You</div>
                <div className="font-cy text-xs font-thin">
                  <div>
                    <span className="text-base">您</span>往後就
                    <span className="text-base">專心賺錢</span>吧！
                    剩下的那些關於...
                  </div>
                  <div>
                    雲山霧罩、盤根錯節、錯綜復雜、天雷滾滾、無字天書的
                    <span className="text-base">設計細節</span>與
                    <span className="text-base">技術活兒</span>就交給我們，
                  </div>
                  <div>
                    <span className="text-base">畢竟</span>誰不想要一個既
                    <span className="text-base">聰明</span>又
                    <span className="text-base">會說笑</span>的團隊，把想法變成
                    <span className="text-base">有故事的網站及應用</span>
                    呢？
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-2">
              <ContactUsButton />
            </div>
            <button className="absolute right-0 top-1/2 -translate-y-1/2">
              <img
                className="h-[4rem] w-[4rem]"
                src={isDarkMode ? rightButtonDark : rightButton}
                alt="rightButton"
                onClick={handleNext}
              />
            </button>
            <div className="absolute bottom-[-1rem] left-1/2 flex h-[1.5rem] w-[3rem] -translate-x-1/2 items-center justify-evenly rounded-[1rem] bg-white">
              <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-shadow3"></div>
              <div className="h-[0.5rem] w-[0.5rem] rounded-full bg-shadow2"></div>
            </div>
          </div>
        </div>
      )}
      {currentIndex === 1 && (
        <div>
          <img
            className="absolute inset-0 h-full w-full object-fill opacity-50"
            src={aboutUsBg2}
            alt="aboutUsBg2"
          />
          <div className="relative h-[31rem] w-[76rem] p-[1rem]">
            <img
              className="absolute inset-0 h-full w-full rounded-bl-[6.25rem] rounded-tr-[6.25rem] object-fill opacity-[0.8] dark:opacity-[0.2]"
              src={aboutUsBgIn}
              alt="aboutUsBgIn"
            />
            <div className="justfy relative flex flex-col dark:text-highlight">
              <div className="flex h-[3.125rem] w-[74rem] items-center justify-start font-cy2 text-lgg font-medium">
                一起旅行吧...
              </div>
              <div className="justfy-center flex h-[6.06rem] w-[74rem] items-center gap-[1rem] leading-[2.5rem]">
                <div className="font-cy2 text-[4.375rem] font-black">
                  Business Partner
                </div>
              </div>
              <div className="justfy-center flex h-[5.77rem] w-[74rem] items-center leading-[2.5rem]">
                <div className="flex flex-col justify-center pl-[4rem] font-cy text-xs font-thin">
                  <div>
                    想知道我們的魔法口袋裡藏了哪些寶貝，好一起開啟
                    <span className="text-base">合作冒險</span>嗎？
                  </div>
                  <div>
                    我們可是準備了一堆厲害的「魔法道具」：
                    <span className="text-base">
                      Brand
                      Design、Adobe、Figma、React.js、Next.js、Node.js、Django，
                    </span>
                  </div>
                  <div>
                    還有
                    <span className="text-base">
                      Brand Ｍaching learning
                    </span>{" "}
                    到<span className="text-base">Brand AI Agent</span>{" "}
                    的「高科技魔法棒」!
                  </div>
                </div>
              </div>

              <div className="justfy-center flex h-[5.77rem] w-[74rem] items-center leading-[2.5rem]">
                <div className="flex flex-col justify-center pl-[8rem] font-cy text-xs font-thin">
                  <div>
                    當然，最重要的還是我們那顆永遠停不下來、
                    <span className="text-base">熱衷學習</span>的心
                  </div>
                </div>
              </div>
              <div className="justfy-center flex h-[5.77rem] w-[74rem] items-center self-end leading-[2.5rem]">
                <div className="flex w-full justify-end pr-[4rem] font-cy text-xs font-thin">
                  <div className="text-base">
                    Stand with Us, Spark Magic Together
                  </div>
                </div>
              </div>
              <div className="justfy-center flex h-[2.5rem] w-[74rem] items-center self-end leading-[2.5rem]">
                <div className="flex w-full justify-end font-cy text-xs font-thin">
                  <div>... to be continue </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <ContactUsButton />
            </div>
            <button className="absolute left-0 top-1/2 -translate-y-1/2">
              <img
                className="h-[4rem] w-[4rem] cursor-pointer"
                src={isDarkMode ? leftButtonDark : leftButton}
                alt="leftButton"
                onClick={handlePrev}
              />
            </button>
            <div className="absolute bottom-[-1rem] left-1/2 flex h-[1.5rem] w-[3rem] -translate-x-1/2 items-center justify-evenly rounded-[1rem] bg-white">
              <div
                className={`h-[0.5rem] w-[0.5rem] rounded-full ${currentIndex === 0 ? "bg-shadow3" : "bg-shadow2"}`}
              ></div>
              <div
                className={`h-[0.5rem] w-[0.5rem] rounded-full ${currentIndex === 1 ? "bg-shadow3" : "bg-shadow2"}`}
              ></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default AboutUsSection;
