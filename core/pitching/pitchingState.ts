import {
  CurrentPitch,
  PitchEvent,
  PitchingPlateAppearance,
  Player,
} from "@/types/chart";

export function createEmptyPitch(): CurrentPitch {
  return {
    pitchType: "",
    velocity: "",
    zone: null,
    call: "",

    contact: "",
    quality: "",
    direction: "",

    comment: "",
  };
}

export function createPitchingPlateAppearance({
  pitcher,
  batter,
  batterHand,
  paNumber,
  inning,
  outsBefore,
  runnersBefore,
}: {
  pitcher: string;
  batter?: Player;
  batterHand?: "R" | "L" | "S";
  paNumber: number;
  inning: string;
  outsBefore: "0" | "1" | "2";
  runnersBefore: string;
}): PitchingPlateAppearance {
  return {
    id: crypto.randomUUID(),

    pitcher,
    batter: batter?.name || "Opponent Batter",
    batterHand: batter?.bats || batterHand || "R",

    paNumber,

    inning,
    outsBefore,
    runnersBefore,

    pitches: [],

    result: "",
    outsRecorded: 0,

    comment: "",
    inkNote: "",
    inkText: "",
  };
}

export function createPitchEvent({
  currentPitch,
  pitchNumber,
  countBefore,
  countAfter,
}: {
  currentPitch: CurrentPitch;
  pitchNumber: number;
  countBefore: string;
  countAfter: string;
}): PitchEvent {
  return {
    id: crypto.randomUUID(),
    pitchNumber,

    pitchType: currentPitch.pitchType,
    velocity: currentPitch.velocity,
    zone: currentPitch.zone,
    call: currentPitch.call,

    countBefore,
    countAfter,

    contact: currentPitch.contact,
    quality: currentPitch.quality,
    direction: currentPitch.direction,

    comment: currentPitch.comment,
  };
}