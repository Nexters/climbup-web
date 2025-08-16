import { HttpResponse, http } from "msw";
import type {
  ApiResultCreateAttemptResponse,
  ApiResultCreateUserSession,
  ApiResultFinishUserSession,
  ApiResultListGymLevelResponse,
  ApiResultListRouteMissionRecommendationResponse,
  ApiResultPageAttemptResponse,
  ApiResultRouteMissionUploadChunkResponse,
  ApiResultRouteMissionUploadSessionFinalizeResponse,
  ApiResultRouteMissionUploadSessionInitializeResponse,
  ApiResultRouteMissionUploadStatusResponse,
  ApiResultUserSessionState,
  ApiResultUserStatusResponse,
  ApiResultVoid,
  AttemptResponse,
} from "@/generated/model";

/**
 * 모의 서버 핸들러
 * - 하위에 리스트 형태로 추가
 */
// Mock 도전 기록 데이터
const mockAttempts: AttemptResponse[] = [
  // 강남점 (gymId: 1) 데이터
  {
    attemptId: 1,
    gymId: 1,
    brandName: "더클라임",
    branchName: "강남점",
    gymLevelName: "BLUE",
    gymLevelImageUrls: ["https://example.com/level3"],
    attemptedAt: "2024-01-15T14:30:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=1",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "섹터 1·2",
    routeScore: 45,
  },
  {
    attemptId: 2,
    gymId: 1,
    brandName: "더클라임",
    branchName: "강남점",
    gymLevelName: "RED",
    gymLevelImageUrls: ["https://example.com/level4"],
    attemptedAt: "2024-01-14T16:20:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=2",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "섹터 3·4",
    routeScore: 65,
  },
  {
    attemptId: 3,
    gymId: 1,
    brandName: "더클라임",
    branchName: "강남점",
    gymLevelName: "GREEN",
    gymLevelImageUrls: ["https://example.com/level2"],
    attemptedAt: "2024-01-13T18:45:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=3",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "섹터 5·6",
    routeScore: 35,
  },
  {
    attemptId: 4,
    gymId: 1,
    brandName: "더클라임",
    branchName: "강남점",
    gymLevelName: "PURPLE",
    gymLevelImageUrls: ["https://example.com/level5"],
    attemptedAt: "2024-01-12T12:15:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=4",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "섹터 7·8",
    routeScore: 85,
  },
  {
    attemptId: 5,
    gymId: 1,
    brandName: "더클라임",
    branchName: "강남점",
    gymLevelName: "ORANGE",
    gymLevelImageUrls: ["https://example.com/level1"],
    attemptedAt: "2024-01-11T19:30:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=5",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "섹터 9·10",
    routeScore: 25,
  },
  // 양재점 (gymId: 2) 데이터
  {
    attemptId: 6,
    gymId: 2,
    brandName: "더클라임",
    branchName: "양재점",
    gymLevelName: "BLUE",
    gymLevelImageUrls: ["https://example.com/level3"],
    attemptedAt: "2024-01-10T15:20:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=6",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "A섹터",
    routeScore: 50,
  },
  {
    attemptId: 7,
    gymId: 2,
    brandName: "더클라임",
    branchName: "양재점",
    gymLevelName: "GREEN",
    gymLevelImageUrls: ["https://example.com/level2"],
    attemptedAt: "2024-01-09T11:45:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=7",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "B섹터",
    routeScore: 40,
  },
  {
    attemptId: 8,
    gymId: 2,
    brandName: "더클라임",
    branchName: "양재점",
    gymLevelName: "RED",
    gymLevelImageUrls: ["https://example.com/level4"],
    attemptedAt: "2024-01-08T17:10:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=8",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "C섹터",
    routeScore: 70,
  },
  {
    attemptId: 9,
    gymId: 2,
    brandName: "더클라임",
    branchName: "양재점",
    gymLevelName: "PURPLE",
    gymLevelImageUrls: ["https://example.com/level5"],
    attemptedAt: "2024-01-07T13:25:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=9",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "D섹터",
    routeScore: 90,
  },
  {
    attemptId: 10,
    gymId: 2,
    brandName: "더클라임",
    branchName: "양재점",
    gymLevelName: "ORANGE",
    gymLevelImageUrls: ["https://example.com/level1"],
    attemptedAt: "2024-01-06T20:00:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=10",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "E섹터",
    routeScore: 30,
  },
  // 추가 데이터 (페이지네이션 테스트용)
  {
    attemptId: 11,
    gymId: 1,
    brandName: "더클라임",
    branchName: "강남점",
    gymLevelName: "BLUE",
    gymLevelImageUrls: ["https://example.com/level3"],
    attemptedAt: "2024-01-05T14:30:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=11",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "섹터 11·12",
    routeScore: 55,
  },
  {
    attemptId: 12,
    gymId: 1,
    brandName: "더클라임",
    branchName: "강남점",
    gymLevelName: "GREEN",
    gymLevelImageUrls: ["https://example.com/level2"],
    attemptedAt: "2024-01-04T16:45:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=12",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "섹터 13·14",
    routeScore: 40,
  },
  {
    attemptId: 13,
    gymId: 2,
    brandName: "더클라임",
    branchName: "양재점",
    gymLevelName: "RED",
    gymLevelImageUrls: ["https://example.com/level4"],
    attemptedAt: "2024-01-03T12:20:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=13",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "F섹터",
    routeScore: 75,
  },
  {
    attemptId: 14,
    gymId: 2,
    brandName: "더클라임",
    branchName: "양재점",
    gymLevelName: "BLUE",
    gymLevelImageUrls: ["https://example.com/level3"],
    attemptedAt: "2024-01-02T18:15:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=14",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "G섹터",
    routeScore: 45,
  },
  {
    attemptId: 15,
    gymId: 1,
    brandName: "더클라임",
    branchName: "강남점",
    gymLevelName: "PURPLE",
    gymLevelImageUrls: ["https://example.com/level5"],
    attemptedAt: "2024-01-01T15:30:00Z",
    success: true,
    thumbnailUrl: "https://picsum.photos/720/1280?random=15",
    videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
    sectorName: "섹터 15·16",
    routeScore: 95,
  },
];

export const handlers = [
  // 성공한 도전 기록 조회 API
  http.get("https://dev-api.holdy.kr/api/attempts", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 0;
    const size = Number(url.searchParams.get("size")) || 10;
    const gymId = url.searchParams.get("gymId")
      ? Number(url.searchParams.get("gymId"))
      : undefined;
    const success = url.searchParams.get("success") !== "false";

    // 필터링: gymId가 있으면 해당 암장만, 없으면 전체
    let filteredAttempts = mockAttempts.filter(
      (attempt) => attempt.success === success
    );

    if (gymId) {
      filteredAttempts = filteredAttempts.filter(
        (attempt) => attempt.gymId === gymId
      );
    }

    // 페이지네이션
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedAttempts = filteredAttempts.slice(startIndex, endIndex);

    const totalElements = filteredAttempts.length;
    const totalPages = Math.ceil(totalElements / size);
    const isLast = page >= totalPages - 1;
    const isFirst = page === 0;

    return HttpResponse.json<ApiResultPageAttemptResponse>({
      message: "성공한 도전 기록을 성공적으로 조회했습니다.",
      data: {
        content: paginatedAttempts,
        totalElements,
        totalPages,
        number: page,
        size,
        numberOfElements: paginatedAttempts.length,
        first: isFirst,
        last: isLast,
        empty: paginatedAttempts.length === 0,
        pageable: {
          pageNumber: page,
          pageSize: size,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          offset: startIndex,
          paged: true,
          unpaged: false,
        },
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
      },
    });
  }),
  http.get("https://dev-api.holdy.kr/api/recommendations", () => {
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
          removedAt: "2025-08-25T00:00:00Z",
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
            {
              missionAttemptId: 2,
              success: false,
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
          removedAt: "2025-08-25T00:00:00Z",
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
          removedAt: "2025-08-25T00:00:00Z",
          postedAt: "2024-03-30T00:00:00Z",
          recommendedOrder: 3,
        },
        {
          missionId: 4,
          gymId: 1,
          attempts: [
            {
              missionAttemptId: 3,
              success: true,
              videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
              createdAt: "2024-03-05T16:45:00Z",
            },
          ],
          sector: {
            id: 4,
            name: "섹터 7·8",
            imageUrl:
              "https://placehold.co/88x46/4D5761/FCFCFD.png?text=Sector+4",
          },
          difficulty: "6D",
          score: 60,
          imageUrl:
            "https://placehold.co/400x600/4D5761/FCFCFD.png?text=Mission+4",
          videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
          removedAt: "2024-05-05T00:00:00Z",
          postedAt: "2024-04-05T00:00:00Z",
          recommendedOrder: 4,
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
          difficulty: "7A",
          score: 70,
          imageUrl:
            "https://placehold.co/400x600/4D5761/FCFCFD.png?text=Mission+5",
          videoUrl: "/src/assets/video/mock-mission-answer-video.mp4",
          removedAt: "2024-05-10T00:00:00Z",
          postedAt: "2024-04-10T00:00:00Z",
          recommendedOrder: 5,
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
        status: "COMPLETED",
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
  http.post("https://dev-api.holdy.kr/api/sessions", () => {
    return HttpResponse.json<ApiResultCreateUserSession>({
      message: "세션이 성공적으로 시작되었습니다.",
      data: {
        id: 1,
        startedAt: new Date().toISOString(),
      },
    });
  }),
  /**
   * 특정 세션 정보 조회 API
   * GET /api/sessions/:id
   *
   * 다양한 세션 시나리오를 제공:
   * - ID 1: 일반적인 성공적인 세션
   * - ID 2: 짧은 시간의 보통 세션
   * - ID 3: 높은 성과의 긴 세션
   * - ID 4: 현재 진행 중인 세션 (endedAt = undefined)
   * - ID 5: 실패가 많은 어려운 세션
   */
  http.get("https://dev-api.holdy.kr/api/sessions/:id", ({ params }) => {
    const sessionId = Number(params.id);

    // 세션 ID에 따른 다양한 mock 데이터 시나리오
    const mockSessionData = {
      1: {
        sessionDate: "2024-01-15",
        startedAt: "2024-01-15T10:30:00Z",
        endedAt: "2024-01-15T12:45:00Z",
        totalDuration: 8100, // 2시간 15분 (초 단위)
        srGained: 180,
        completedCount: 6,
        attemptedCount: 10,
      },
      2: {
        sessionDate: "2024-01-14",
        startedAt: "2024-01-14T14:20:00Z",
        endedAt: "2024-01-14T16:00:00Z",
        totalDuration: 6000, // 1시간 40분
        srGained: 1001,
        completedCount: 3,
        attemptedCount: 7,
      },
      3: {
        sessionDate: "2024-01-13",
        startedAt: "2024-01-13T09:15:00Z",
        endedAt: "2024-01-13T11:30:00Z",
        totalDuration: 8100, // 2시간 15분
        srGained: 250,
        completedCount: 8,
        attemptedCount: 12,
      },
      // 진행 중인 세션 (endedAt이 없음)
      4: {
        sessionDate: new Date().toISOString().split("T")[0],
        startedAt: new Date(Date.now() - 3600000).toISOString(), // 1시간 전 시작
        endedAt: undefined,
        totalDuration: 3600, // 1시간
        srGained: 45,
        completedCount: 2,
        attemptedCount: 4,
      },
      // 실패가 많은 어려운 세션
      5: {
        sessionDate: "2024-01-12",
        startedAt: "2024-01-12T19:00:00Z",
        endedAt: "2024-01-12T21:15:00Z",
        totalDuration: 8100, // 2시간 15분
        srGained: 30,
        completedCount: 1,
        attemptedCount: 8,
      },
    };

    // 기본값: ID 1 데이터 사용
    const sessionData =
      mockSessionData[sessionId as keyof typeof mockSessionData] ||
      mockSessionData[1];

    return HttpResponse.json<ApiResultUserSessionState>({
      message: "세션 정보를 성공적으로 조회했습니다.",
      data: sessionData,
    });
  }),
  http.post("https://dev-api.holdy.kr/api/sessions/:id", () => {
    return HttpResponse.json<ApiResultFinishUserSession>({
      message: "세션이 성공적으로 종료되었습니다.",
      data: {
        id: 1,
      },
    });
  }),
  http.post(
    "https://dev-api.holdy.kr/api/onboarding/gym",
    async ({ request }) => {
      // 요청 바디를 파싱하여 기본적인 유효성만 확인합니다.
      const body = (await request.json()) as { gymId?: number };
      if (typeof body.gymId !== "number" || body.gymId <= 0) {
        return HttpResponse.json<ApiResultVoid>(
          { message: "잘못된 요청입니다.", data: undefined },
          { status: 400 }
        );
      }
      return HttpResponse.json<ApiResultVoid>({
        message: "암장이 성공적으로 설정되었습니다.",
        data: undefined,
      });
    }
  ),

  http.post(
    "https://dev-api.holdy.kr/api/onboarding/gym-level",
    async ({ request }) => {
      // 요청 바디를 파싱하여 기본적인 유효성만 확인합니다.
      const body = (await request.json()) as { gymLevelId?: number };
      if (typeof body.gymLevelId !== "number" || body.gymLevelId <= 0) {
        return HttpResponse.json<ApiResultVoid>(
          { message: "잘못된 요청입니다.", data: undefined },
          { status: 400 }
        );
      }
      return HttpResponse.json<ApiResultVoid>({
        message: "레벨이 성공적으로 설정되었습니다.",
        data: undefined,
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
        onboardingCompleted: false,
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
          imageUrls: ["https://example.com/level1"],
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
          imageUrls: ["https://example.com/level2"],
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
          imageUrls: ["https://example.com/level3"],
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
          imageUrls: ["https://example.com/level4"],
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
          imageUrls: ["https://example.com/level5"],
          sortOrder: 5,
        },
      ],
    });
  }),

  http.get(
    "https://dev-api.holdy.kr/attempts/:attemptId/upload/status",
    async () => {
      return HttpResponse.json<ApiResultRouteMissionUploadStatusResponse>({
        message: "요청이 성공적으로 처리되었습니다.",
        data: {
          status: "IN_PROGRESS",
          uploadId: "8ded5806-87df-43b5-9c64-e4513eb33987",
          createdAt: "2025-07-31T14:20:00",
          chunks: {
            totalReceived: 505050,
            totalExpected: 10101010,
            completedChunks: [1, 2, 3, 4, 5, 6, 7, 10],
          },
        },
      });
    }
  ),

  http.post(
    "https://dev-api.holdy.kr/attempts/:attemptId/upload/initialize",
    async () => {
      return HttpResponse.json<ApiResultRouteMissionUploadSessionInitializeResponse>(
        {
          message: "요청이 성공적으로 처리되었습니다.",
          data: {
            uploadId: "8ded5806-87df-43b5-9c64-e4513eb33987",
          },
        }
      );
    }
  ),

  http.post(
    "https://dev-api.holdy.kr/attempts/:attemptId/upload/:uploadId/chunk",
    async ({ request }) => {
      const body = (await request.json()) as {
        index?: number;
        chunk?: string;
      };

      return HttpResponse.json<ApiResultRouteMissionUploadChunkResponse>({
        message: "청크가 성공적으로 업로드되었습니다.",
        data: {
          index: body.index,
          totalChunkReceived: (body.index || 0) + 1,
          totalChunkExpected: 5,
        },
      });
    }
  ),

  http.post(
    "https://dev-api.holdy.kr/attempts/:attemptId/upload/:uploadId/finalize",
    async () => {
      return HttpResponse.json<ApiResultRouteMissionUploadSessionFinalizeResponse>(
        {
          message: "업로드가 성공적으로 완료되었습니다.",
          data: {
            fileName: `mission_video_${Date.now()}.mp4`,
          },
        }
      );
    }
  ),
];
