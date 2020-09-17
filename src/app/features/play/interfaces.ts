export interface ILevelSchema {
  level: number;
  speed: INumRange;
  delay: INumRange;
  maxScore: number;
  time: number;
}

export interface INumRange {
  min: number;
  max: number;
}
