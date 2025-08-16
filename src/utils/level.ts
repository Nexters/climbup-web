import { LEVEL_SCORE_STANDARD } from "@/constants/level";

/**
 * 총 점수를 기반으로 현재 레벨 정보를 반환하는 함수
 */
export function getLevelInfo(totalScore: number) {
  // 600점 미만은 레벨 0으로 처리 (아직 레벨이 없는 상태)
  if (totalScore < 600) {
    return {
      level: 0,
      levelName: "NOVICE",
      displayLevel: 0,
      currentExp: totalScore,
      levelExp: 600,
      nextLevelScore: 600,
      isMaxLevel: false,
    };
  }

  // LEVEL_SCORE_STANDARD에서 현재 점수에 맞는 레벨 찾기
  for (const [levelName, config] of Object.entries(LEVEL_SCORE_STANDARD)) {
    const { min, max, displayLevel } = config;

    if (max === null) {
      // 최고 레벨인 경우 (PURPLE)
      if (totalScore >= min) {
        return {
          level: displayLevel,
          levelName,
          displayLevel,
          currentExp: totalScore - min,
          levelExp: 1000, // 최고 레벨은 임의로 1000점 단위로 표시
          nextLevelScore: null,
          isMaxLevel: true,
        };
      }
    } else {
      // 일반 레벨인 경우
      if (totalScore >= min && totalScore <= max) {
        const levelExp = max - min + 1;
        const currentExp = totalScore - min;
        const nextLevelScore = max + 1;

        return {
          level: displayLevel,
          levelName,
          displayLevel,
          currentExp,
          levelExp,
          nextLevelScore,
          isMaxLevel: false,
        };
      }
    }
  }

  // 예외 상황 (여기에 도달하면 안됨)
  return {
    level: 0,
    levelName: "UNKNOWN",
    displayLevel: 0,
    currentExp: 0,
    levelExp: 600,
    nextLevelScore: 600,
    isMaxLevel: false,
  };
}

/**
 * 다음 레벨까지 필요한 점수를 계산하는 함수
 */
export function getPointsToNextLevel(totalScore: number): number | null {
  const levelInfo = getLevelInfo(totalScore);

  if (levelInfo.isMaxLevel || levelInfo.nextLevelScore === null) {
    return null; // 최고 레벨인 경우
  }

  return levelInfo.nextLevelScore - totalScore;
}

/**
 * 레벨 표시용 텍스트를 생성하는 함수
 */
export function getLevelDisplayText(totalScore: number): string {
  const levelInfo = getLevelInfo(totalScore);

  if (levelInfo.isMaxLevel) {
    return `최고 레벨 LV.${levelInfo.displayLevel} 달성!`;
  }

  if (levelInfo.level === 0) {
    const pointsNeeded = getPointsToNextLevel(totalScore);
    return `LV.1까지 ${pointsNeeded}점 필요!`;
  }

  const pointsNeeded = getPointsToNextLevel(totalScore);
  const nextLevel = levelInfo.displayLevel + 1;

  return `LV.${nextLevel}까지 남은 점수 ${pointsNeeded}점 !`;
}
