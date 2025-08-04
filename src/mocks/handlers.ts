import { HttpResponse, http } from "msw";

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
];
