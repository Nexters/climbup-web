import { HttpResponse, http } from "msw";
import type {
  ApiResultCreateAttemptResponse,
  ApiResultListGymLevelResponse,
  ApiResultListRouteMissionRecommendationResponse,
  ApiResultUserStatusResponse,
} from "@/generated/model";

/**
 * 모의 서버 핸들러
 * - 하위에 리스트 형태로 추가
 */
export const handlers = [
  http.get("https://dev-api.holdy.kr/recommendations", () => {
    return HttpResponse.json<ApiResultListRouteMissionRecommendationResponse>({
      message: "추천 루트미션을 성공적으로 조회했습니다.",
      data: [
        {
          missionId: 1,
          gymId: 1,
          attempts: [],
          sector: {
            id: 1,
            name: "섹터 1·2",
            imageUrl:
              "https://placehold.co/88x46/4D5761/FCFCFD.png?text=Sector+2",
          },
          difficulty: "6A",
          score: 30,
          imageUrl:
            "https://placehold.co/400x600/4D5761/FCFCFD.png?text=Mission+1",
          videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
          removedAt: "2024-04-20T00:00:00Z",
          postedAt: "2024-03-20T00:00:00Z",
          recommendedOrder: 1,
        },
        {
          missionId: 2,
          gymId: 1,
          attempts: [
            {
              missionAttemptId: 1,
              success: true,
              videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
              createdAt: "2024-03-15T10:30:00Z",
            },
          ],
          sector: {
            id: 2,
            name: "섹터 3·4",
            imageUrl:
              "https://placehold.co/88x46/4D5761/FCFCFD.png?text=Sector+2",
          },
          difficulty: "6B",
          score: 40,
          imageUrl:
            "https://placehold.co/400x600/4D5761/FCFCFD.png?text=Mission+2",
          videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
          removedAt: "2024-04-25T00:00:00Z",
          postedAt: "2024-03-25T00:00:00Z",
          recommendedOrder: 2,
        },
        {
          missionId: 3,
          gymId: 1,
          attempts: [
            {
              missionAttemptId: 2,
              success: false,
              videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
              createdAt: "2024-03-10T14:20:00Z",
            },
          ],
          sector: {
            id: 3,
            name: "섹터 5·6",
            imageUrl:
              "https://placehold.co/88x46/4D5761/FCFCFD.png?text=Sector+2",
          },
          difficulty: "6C",
          score: 50,
          imageUrl:
            "https://placehold.co/400x600/4D5761/FCFCFD.png?text=Mission+3",
          videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
          removedAt: "2024-04-30T00:00:00Z",
          postedAt: "2024-03-30T00:00:00Z",
          recommendedOrder: 3,
        },
      ],
    });
  }),
  http.post("https://dev-api.holdy.kr/attempts", async ({ request }) => {
    const body = (await request.json()) as {
      missionId: number;
      success: boolean;
    };
    return HttpResponse.json<ApiResultCreateAttemptResponse>({
      message: "도전기록이 성공적으로 등록되었습니다.",
      data: {
        missionAttemptId: 1,
        success: body.success,
        videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
        createdAt: new Date().toISOString(),
        srGained: body.success ? 30 : 0,
        currentSr: body.success ? 1530 : 1500,
      },
    });
  }),
  http.get(
    "https://dev-api.holdy.kr/attempts/:attemptId/recommendations",
    () => {
      return HttpResponse.json<ApiResultListRouteMissionRecommendationResponse>(
        {
          message: "비슷한 난이도의 루트미션을 성공적으로 조회했습니다.",
          data: [
            {
              missionId: 4,
              gymId: 1,
              attempts: [],
              sector: {
                id: 4,
                name: "섹터 7·8",
                imageUrl:
                  "https://placehold.co/88x46/4D5761/FCFCFD.png?text=Sector+4",
              },
              difficulty: "6A",
              score: 35,
              imageUrl:
                "https://placehold.co/400x600/4D5761/FCFCFD.png?text=Mission+4",
              videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
              removedAt: "2024-05-01T00:00:00Z",
              postedAt: "2024-04-01T00:00:00Z",
              recommendedOrder: 1,
            },
            {
              missionId: 5,
              gymId: 1,
              attempts: [],
              sector: {
                id: 5,
                name: "섹터 9·10",
                imageUrl:
                  "https://placehold.co/88x46/4D5761/FCFCFD.png?text=Sector+5",
              },
              difficulty: "6B",
              score: 40,
              imageUrl:
                "https://placehold.co/400x600/4D5761/FCFCFD.png?text=Mission+5",
              videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
              removedAt: "2024-05-05T00:00:00Z",
              postedAt: "2024-04-05T00:00:00Z",
              recommendedOrder: 2,
            },
          ],
        }
      );
    }
  ),
  http.post(
    "https://dev-api.holdy.kr/api/onboarding/gym",
    async ({ request }) => {
      const body = (await request.json()) as { gymId: number };
      return HttpResponse.json<ApiResultUserStatusResponse>({
        message: "암장이 성공적으로 설정되었습니다.",
        data: {
          id: 1,
          name: "홍길동",
          nickname: "클라이머",
          imageUrl: "https://example.com/profile.jpg",
          sr: 1500,
          onboardingCompleted: true,
          gymLevel: {
            id: 3,
            brandName: "더클라임",
            gymLevelName: "BLUE",
            levelName: "도전의 재미가 시작되는 단계",
            srMin: 1000,
            srMax: 1999,
            sortOrder: 3,
          },
          gym: {
            id: body.gymId,
            brandId: 1,
            brandName: "더클라임",
            branchName: body.gymId === 1 ? "강남점" : "논현점",
            fullName: body.gymId === 1 ? "더클라임 강남점" : "더클라임 논현점",
            address:
              body.gymId === 1
                ? "서울특별시 강남구 강남대로 123"
                : "서울특별시 강남구 논현로 123",
            imageUrl: "https://example.com/gym.jpg",
          },
        },
      });
    }
  ),
  http.get("https://dev-api.holdy.kr/api/users/me", () => {
    return HttpResponse.json<ApiResultUserStatusResponse>({
      message: "성공적으로 조회되었습니다.",
      data: {
        id: 1,
        name: "홍길동",
        nickname: "클라이머",
        imageUrl: "https://example.com/profile.jpg",
        sr: 1500,
        onboardingCompleted: true,
        gymLevel: {
          id: 3,
          brandName: "더클라임",
          gymLevelName: "BLUE",
          levelName: "도전의 재미가 시작되는 단계",
          srMin: 1000,
          srMax: 1999,
          sortOrder: 3,
        },
        gym: {
          id: 1,
          brandId: 1,
          brandName: "더클라임",
          branchName: "강남점",
          fullName: "더클라임 강남점",
          address: "서울특별시 강남구 강남대로 123",
          imageUrl: "https://example.com/gym.jpg",
        },
      },
    });
  }),
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
