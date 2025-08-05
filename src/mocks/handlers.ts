import { HttpResponse, http } from "msw";
import type { ApiResultListGymLevelResponse } from "@/generated/model";

/**
 * 모의 서버 핸들러
 * - 하위에 리스트 형태로 추가
 */
export const handlers = [
  http.get("https://dev-api.holdy.kr/api/gyms", async () => {
    return HttpResponse.json({
      message: "Hello, world!",
      data: [
        {
          /** 암장 ID */
          id: 1,
          /** 브랜드 ID */
          brandId: 1,
          /** 브랜드명 */
          brandName: "더클라임",
          /** 지점명 */
          branchName: "강남점",
          /** 전체 이름 */
          fullName: "더클라임 강남점",
          /** 주소 */
          address: "서울특별시 강남구 강남대로 123",
          /** 섹터 정보 */
          sectorInfo: "A섹터: 볼더링, B섹터: 리드클라이밍",
          /** 이미지 URL */
          imageUrl: "...",
        },
        {
          id: 2,
          brandId: 1,
          brandName: "더클라임",
          branchName: "논현점",
          fullName: "더클라임 논현점",
          address: "서울특별시 강남구 논현로 123",
          sectorInfo: "A섹터: 볼더링, B섹터: 리드클라이밍",
          imageUrl: "...",
        },
      ],
    });
  }),
  http.get("https://dev-api.holdy.kr/api/brands/:brandId/levels", async () => {
    return HttpResponse.json<ApiResultListGymLevelResponse>({
      message: "요청이 성공적으로 처리되었습니다.",
      data: [
        {
          id: 1,
          brandId: 1,
          brandName: "더클라임",
          gymLevelName: "ORANGE",
          levelId: 1,
          levelName: "입문자 단계",
          description: "클라이밍이 처음이라면 가볍게 시작해보세요!",
          srMin: 600,
          srMax: 649,
          imageUrl: "https://example.com/level1",
          sortOrder: 1,
        },
        {
          id: 2,
          brandId: 1,
          brandName: "더클라임",
          gymLevelName: "GREEN",
          levelId: 2,
          levelName: "기본기를 익히는 단계",
          description: "규칙도 익히고, 슬슬 재미가 붙은 단계네요!",
          srMin: 650,
          srMax: 999,
          imageUrl: "https://example.com/level2",
          sortOrder: 2,
        },
        {
          id: 3,
          brandId: 1,
          brandName: "더클라임",
          gymLevelName: "BLUE",
          levelId: 4,
          levelName: "도전의 재미가 시작되는 단계",
          description: "도전의 재미가 본격적으로 느껴지실 거예요.",
          srMin: 1000,
          srMax: 1999,
          imageUrl: "https://example.com/level3",
          sortOrder: 3,
        },
        {
          id: 4,
          brandId: 1,
          brandName: "더클라임",
          gymLevelName: "RED",
          levelId: 5,
          levelName: "고난이도 루트에 도전하는 단계",
          description: "이제 다양한 루트도 거뜬하죠? 멋져요!",
          srMin: 2000,
          srMax: 2999,
          imageUrl: "https://example.com/level4",
          sortOrder: 4,
        },
        {
          id: 5,
          brandId: 1,
          brandName: "더클라임",
          gymLevelName: "PURPLE",
          levelId: 7,
          levelName: "어디서든 인정받는 단계",
          description: "누구나 인정할 실력자시군요. 정말 대단해요!",
          srMin: 3000,
          imageUrl: "https://example.com/level5",
          sortOrder: 5,
        },
      ],
    });
  }),
];
