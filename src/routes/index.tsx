import { Flex } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

const KAKAO_LOGIN_URL = `https://dev-api.holdy.kr/login/kakao?redirect_uri=${window.location.origin}/oauth2/redirect`;

function Home() {
  return (
    <Flex direction="column" gap="5" className="h-full px-10 py-4">
      <Flex direction="column" align="center" gap="4px" className="mt-[160px]">
        <img
          src="/images/logo.png"
          alt="홀디 로고"
          className="w-[198px] h-[198px] rounded-full bg-neutral-300"
        />
        <h2 className="t-p-22-sb pt-6">홀디에 오신 걸 환영해요 :)</h2>
        <p className="t-p-14-m">내 페이스에 맞춰 하나씩 올라가 볼까요?</p>
      </Flex>
      <a
        className="h-[52px] flex-center bg-[#FEE500] rounded-full gap-1 mt-auto"
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
