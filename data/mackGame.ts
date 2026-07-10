import { AtBat } from "@/types/chart";

export const lineup = [
  { spot: 1, name: "Rodriguez", pos: "SS", bats: "R" },
  { spot: 2, name: "Perez", pos: "CF", bats: "L" },
  { spot: 3, name: "Diaz", pos: "3B", bats: "R" },
  { spot: 4, name: "Medina", pos: "1B", bats: "R" },
  { spot: 5, name: "Santos", pos: "RF", bats: "L" },
];

export const currentAtBat: AtBat = {
  batter: "Rodriguez",
  result: "",
  pitch: "",
  velo: "",
  zone: null,
  batterHand: "R",
  abNumber: 1,
  pitchNumber: 0,
  outs: "0",
  runners: "",
  count: "",
  contact: "",
  direction: "",
  quality: "",
  comment: "",
  inkNote: "",
  inkText: "",
};

export const gameInfo = {
  team: "DSL Tigers",
  opponent: "DSL Yankees",
  inning: "Top 3",
  score: "2-1",
  coach: "Reinaldo Vega",
};