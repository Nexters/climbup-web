import { Flex } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { renderToString } from "react-dom/server";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { PaginationOptions } from "swiper/types";
import assetOnboarding1 from "@/assets/images/ic_onboarding_1.png";
import assetOnboarding2 from "@/assets/images/ic_onboarding_2.png";
import assetOnboarding3 from "@/assets/images/ic_onboarding_3.png";
import { cn } from "@/utils/cn";

export const Route = createFileRoute("/")({
  component: Home,
});

const KAKAO_LOGIN_URL = `https://dev-api.holdy.kr/login/kakao?redirect_uri=${window.location.origin}/oauth2/redirect`;

function Home() {
  const pagination: PaginationOptions = {
    clickable: true,
    renderBullet(_, className) {
      return renderToString(
        <motion.div
          className={cn(
            className,
            "w-2 h-2 rounded-full bg-neutral-700 transition-[width] duration-200 [&.swiper-pagination-bullet-active]:w-4"
          )}
        />
      );
    },
  };
  return (
    <Flex direction="column" gap="5" className="h-dvh px-10 py-4">
      <header className="h-[52px] w-full flex-center t-m-24-b select-none">
        Holdy
      </header>
      <Flex direction="column" align="center" gap="4px" className="h-full pt-2">
        <Swiper
          modules={[Pagination]}
          loop
          slidesPerView={1}
          pagination={pagination}
          className="w-full overflow-hidden"
          aria-label="메인 프로모션 슬라이더"
        >
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center gap-5 h-full pb-10">
              <div className="w-full flex-1 flex justify-center items-end">
                <img
                  src={assetOnboarding1}
                  alt="미션 시작 가이드"
                  className="w-[180px] h-[193px] object-cover"
                  draggable={false}
                />
              </div>
              <p className="t-p-22-sb text-neutral-900 whitespace-pre-line text-center">
                {`실력에 꼭 맞는\n루트 미션을 준비했어요`}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center gap-5 h-full pb-10">
              <div className="w-full flex-1 flex justify-center items-end">
                <img
                  src={assetOnboarding2}
                  alt="미션 시작 가이드"
                  className="w-[140px] h-[157px] object-cover"
                  draggable={false}
                />
              </div>
              <p className="t-p-22-sb text-neutral-900 whitespace-pre-line text-center ">
                {`어려웠던 미션은\n해설 영상으로 배워보세요`}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center gap-5 h-full pb-10">
              <div className="w-full flex-1 flex justify-center items-end">
                <img
                  src={assetOnboarding3}
                  alt="미션 시작 가이드"
                  className="w-[240px] h-[294px] object-cover"
                  draggable={false}
                />
              </div>
              <p className="t-p-22-sb text-neutral-900 whitespace-pre-line text-center">
                {`미션을 성공하고\n성취감을 느껴보세요`}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </Flex>
      <a
        className="h-[52px] flex-center bg-[#FEE500] rounded-full gap-1 mt-auto shrink-0"
        href={KAKAO_LOGIN_URL}
      >
        <svg
          aria-label="카카오 로고"
          role="img"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.4953 4C6.89972 4 4 6.31659 4 9.12896C4 10.9545 5.20628 12.5529 7.01571 13.4656L6.40328 15.7499C6.39174 15.7841 6.38997 15.8209 6.39816 15.856C6.40636 15.8912 6.42419 15.9235 6.44969 15.9491C6.48685 15.9818 6.53468 15.9999 6.58423 16C6.62532 15.9968 6.6643 15.9805 6.69557 15.9537L9.33084 14.1792C9.71984 14.2328 10.112 14.2606 10.5047 14.2626C14.0957 14.2626 17 11.946 17 9.12896C17 6.31196 14.0863 4 10.4953 4Z"
            fill="#392020"
          />
        </svg>
        <span className="t-p-16-m text-[#391C1A]">
          카카오로 3초만에 시작하기
        </span>
      </a>
    </Flex>
  );
}
