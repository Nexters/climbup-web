import { useNavigate } from "@tanstack/react-router";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export const DriverExample = () => {
  const navigate = useNavigate();

  const onboardingDriver = driver({
    showProgress: true,
    showButtons: ["previous", "next", "close"],
    steps: [
      {
        element: "#step1",
        popover: {
          align: "center",
          side: "bottom",
          title: "첫 번째 단계",
          description: "이것은 첫 번째 단계입니다.",
          onNextClick: async () => {
            onboardingDriver.moveNext();
          },
        },
      },
      {
        element: "#step2",
        popover: {
          align: "center",
          side: "bottom",
          title: "두 번째 단계",
          description: "이것은 두 번째 단계입니다.",
          onNextClick: async () => {
            onboardingDriver.moveNext();
          },
        },
      },
      {
        element: "#step3",
        popover: {
          align: "center",
          side: "bottom",
          title: "세 번째 단계",
          description: "이것은 세 번째 단계입니다.",
          onNextClick: async () => {
            navigate({ to: "/gym" });
            setTimeout(() => {
              onboardingDriver.destroy();
            }, 0);
          },
        },
      },
    ],
  });

  const start = () => {
    onboardingDriver.drive();
  };

  const stop = () => {
    onboardingDriver.destroy();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Driver.js 예시</h1>
      {/* 컨트롤 버튼들 */}
      <div className="mb-8 space-x-4">
        <button
          type="button"
          onClick={start}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          가이드 시작
        </button>
        <button
          type="button"
          onClick={stop}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
        >
          가이드 정지
        </button>
      </div>

      <div className="mb-8 p-4 bg-gray-100 rounded">
        <p className="text-sm"></p>
      </div>

      <div className="space-y-8">
        <div
          id="step1"
          className="p-6 bg-blue-100 border-2 border-blue-300 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">첫 번째 단계</h2>
          <p className="text-gray-700">
            이 요소는 가이드의 첫 번째 단계입니다.
          </p>
        </div>

        <div
          id="step2"
          className="p-6 bg-green-100 border-2 border-green-300 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">두 번째 단계</h2>
          <p className="text-gray-700">
            이 요소는 가이드의 두 번째 단계입니다.
          </p>
        </div>

        <div
          id="step3"
          className="p-6 bg-purple-100 border-2 border-purple-300 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">세 번째 단계</h2>
          <p className="text-gray-700">
            이 요소는 가이드의 마지막 단계입니다. 가이드가 완료되었습니다!
          </p>
        </div>
      </div>
    </div>
  );
};
