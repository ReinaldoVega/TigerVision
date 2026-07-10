export type ChartMode = "offense" | "pitching";

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
  chartMode: ChartMode;
};

export type ResultType =
  | "1B"
  | "2B"
  | "3B"
  | "HR"
  | "BB"
  | "HBP"
  | "K"
  | "GO"
  | "FO"
  | "LO"
  | "PO"
  | "FC"
  | "GDP"
  | "SAC"
  | "SF"
  | "Other"
  | "";

export type PitchType =
  | "FB"
  | "SI"
  | "CT"
  | "SL"
  | "SW"
  | "CH"
  | "SP"
  | "CU"
  | "KN"
  | "Other"
  | "";

export type PitchCall =
  | "Ball"
  | "Called Strike"
  | "Swinging Strike"
  | "Foul"
  | "In Play"
  | "HBP"
  | "";

export type ContactType = "GB" | "LD" | "FB" | "PU" | "";

export type ContactQuality =
  | "Soft"
  | "Medium"
  | "Hard"
  | "Barrel"
  | "";

export type FieldDirection =
  | "LF"
  | "CF"
  | "RF"
  | "3B"
  | "SS"
  | "2B"
  | "1B"
  | "P"
  | "C"
  | "";

export type ZoneType =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | "UP"
  | "IN"
  | "AWAY"
  | "DOWN"
  | null;

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
  inkNote: string;
  inkText: string;
};

export type PitchEvent = {
  id: string;
  pitchNumber: number;

  pitchType: PitchType;
  velocity: string;
  zone: ZoneType;
  call: PitchCall;

  countBefore: string;
  countAfter: string;

  contact: ContactType;
  quality: ContactQuality;
  direction: FieldDirection;

  comment: string;
};

export type PitchingPlateAppearance = {
  id: string;

  pitcher: string;
  batter: string;
  batterHand: "R" | "L" | "S";

  paNumber: number;

  inning: string;
  outsBefore: "0" | "1" | "2";
  runnersBefore: string;

  pitches: PitchEvent[];

  result: ResultType;
  outsRecorded: number;

  comment: string;
  inkNote: string;
  inkText: string;
};

export type CurrentPitch = {
  pitchType: PitchType;
  velocity: string;
  zone: ZoneType;
  call: PitchCall;

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