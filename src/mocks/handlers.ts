import { HttpResponse, http } from "msw";

/**
 * 모의 서버 핸들러
 * - 하위에 리스트 형태로 추가
 */
export const handlers = [
  http.get("https://api.holdy.kr/test", async () => {
    return HttpResponse.json({
      message: "Hello, world!",
    });
  }),
];
