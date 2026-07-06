export type Player = {
  spot: number;
  name: string;
  position: string;
  bats: "R" | "L" | "S";
};

export type GameInfo = {
  team: string;
  opponent: string;
  inning: string;
  score: string;
  date: string;
};

export type ResultType =
  | "1B" | "2B" | "3B" | "HR" | "BB" | "HBP" | "K"
  | "GO" | "FO" | "LO" | "PO" | "FC" | "GDP" | "SAC" | "SF" | "Other" | "";

export type PitchType =
  | "FB" | "SI" | "CT" | "SL" | "CH" | "SP" | "CU" | "KN" | "Other" | "";

export type ContactType = "GB" | "LD" | "FB" | "PU" | "";
export type ContactQuality = "Soft" | "Medium" | "Hard" | "Barrel" | "";
export type FieldDirection = "LF" | "CF" | "RF" | "3B" | "SS" | "2B" | "1B" | "P" | "C" | "";

export type ZoneType =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
  | "UP" | "IN" | "AWAY" | "DOWN" | null;

export type AtBat = {
  batter: string;
  batterHand: "R" | "L" | "S";
  abNumber: number;
  pitchNumber: number;
  result: ResultType;
  pitch: PitchType;
  velo: string;
  zone: ZoneType;
  count: string;
  outs: "0" | "1" | "2" | "";
  runners: string;
  contact: ContactType;
  quality: ContactQuality;
  direction: FieldDirection;
  comment: string;
};

export type ChartStep =
  | "result"
  | "pitch"
  | "zone"
  | "count"
  | "contact"
  | "field"
  | "finish";