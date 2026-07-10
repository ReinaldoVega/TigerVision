import { AtBat, Player } from "@/types/chart";

export function createEmptyAtBat(
  player?: Player,
  abNumber = 1,
  outs: "0" | "1" | "2" = "0"
): AtBat {
  return {
    batter: player?.name || "Player",
    batterHand: player?.bats || "R",

    abNumber,
    pitchNumber: 1,

    result: "",
    pitch: "",
    velo: "",

    zone: null,
    count: "",

    outs,
    runners: "Empty",

    contact: "",
    quality: "",
    direction: "",

    comment: "",
    inkNote: "",
    inkText: "",
  };
}