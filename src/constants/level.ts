export const LEVEL_SCORE_STANDARD: Record<
  string,
  {
    min: number;
    max: number | null;
    displayLevel: number;
  }
> = {
  ORANGE: {
    min: 600,
    max: 649,
    displayLevel: 1,
  },
  GREEN: {
    min: 650,
    max: 999,
    displayLevel: 2,
  },
  BLUE: {
    min: 1000,
    max: 1999,
    displayLevel: 3,
  },
  RED: {
    min: 2000,
    max: 2999,
    displayLevel: 4,
  },
  PURPLE: {
    min: 3000,
    max: null,
    displayLevel: 5,
  },
};
