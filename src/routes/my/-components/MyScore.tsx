import { useQuery } from "@tanstack/react-query";

import { MotionNumberFlow } from "@/components/motion-number-flow/MotionNumberFlow";
import { getCurrentUserStatus } from "@/generated/user/user";
import { getHeaderToken } from "@/utils/cookie";

export const MyScore = () => {
  const { data: userStatus, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUserStatus({ headers: getHeaderToken() }),
    select: (data) => data.data,
  });

  const totalAttempts = userStatus?.totalAttempts ?? 0;
  const successCount = userStatus?.successCount ?? 0;
  const failureCount = userStatus?.failureCount ?? 0;

  if (isLoading) {
    return (
      <div className="flex gap-1.5 p-4 bg-neutral-100 rounded-[24px] mx-4">
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="bg-neutral-200 rounded h-7 w-8 animate-pulse" />
          <span className="t-p-12-m text-neutral-500">도전</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 border-x-[1px] border-solid border-x-neutral-200">
          <div className="bg-neutral-200 rounded h-7 w-8 animate-pulse" />
          <span className="t-p-12-m text-neutral-500">성공</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="bg-neutral-200 rounded h-7 w-8 animate-pulse" />
          <span className="t-p-12-m text-neutral-500">실패</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-1.5 p-4 bg-neutral-100 rounded-[24px] mx-4">
      <div className="flex flex-1 flex-col items-center gap-2">
        <MotionNumberFlow
          value={totalAttempts}
          className="t-m-24-b text-neutral-900"
        />
        <span className="t-p-12-m text-neutral-500">도전</span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 border-x-[1px] border-solid border-x-neutral-200">
        <MotionNumberFlow
          value={successCount}
          className="t-m-24-b text-neutral-900"
        />
        <span className="t-p-12-m text-neutral-500">성공</span>
      </div>
      <div className="flex flex-1 flex-col items-center gap-2">
        <MotionNumberFlow
          value={failureCount}
          className="t-m-24-b text-neutral-900"
        />
        <span className="t-p-12-m text-neutral-500">실패</span>
      </div>
    </div>
  );
};
