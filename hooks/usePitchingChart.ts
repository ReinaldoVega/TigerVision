"use client";

import { useState } from "react";
import {
  CurrentPitch,
  PitchEvent,
  PitchingPlateAppearance,
  ResultType,
} from "@/types/chart";
import {
  createEmptyPitch,
  createPitchEvent,
  createPitchingPlateAppearance,
} from "@/core/pitching/pitchingState";
import { calculateNextCount } from "@/core/pitching/countEngine";

export function usePitchingChart({
  initialPitcher = "Starting Pitcher",
  initialBatter = "Opponent Batter",
  initialBatterHand = "R",
  initialInning = "Top 1",
  initialOuts = "0",
  initialRunners = "Empty",
}: {
  initialPitcher?: string;
  initialBatter?: string;
  initialBatterHand?: "R" | "L" | "S";
  initialInning?: string;
  initialOuts?: "0" | "1" | "2";
  initialRunners?: string;
} = {}) {
  const [pitcher, setPitcher] = useState(initialPitcher);

  const [count, setCount] = useState("0-0");

  const [currentPitch, setCurrentPitch] =
    useState<CurrentPitch>(createEmptyPitch());

  const [currentPA, setCurrentPA] =
    useState<PitchingPlateAppearance>(
      createPitchingPlateAppearance({
        pitcher: initialPitcher,
        batterHand: initialBatterHand,
        paNumber: 1,
        inning: initialInning,
        outsBefore: initialOuts,
        runnersBefore: initialRunners,
      })
    );

  const [savedPAs, setSavedPAs] =
    useState<PitchingPlateAppearance[]>([]);

  function updateCurrentPitch<K extends keyof CurrentPitch>(
    key: K,
    value: CurrentPitch[K]
  ) {
    setCurrentPitch((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateCurrentPA<K extends keyof PitchingPlateAppearance>(
    key: K,
    value: PitchingPlateAppearance[K]
  ) {
    setCurrentPA((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function savePitch() {
    if (
      !currentPitch.pitchType ||
      !currentPitch.zone ||
      !currentPitch.call
    ) {
      return {
        success: false,
        message: "Select pitch type, location and pitch result.",
      };
    }

    const countResult = calculateNextCount(
      count,
      currentPitch.call
    );

    const event: PitchEvent = createPitchEvent({
      currentPitch,
      pitchNumber: currentPA.pitches.length + 1,
      countBefore: count,
      countAfter: countResult.count,
    });

    setCurrentPA((prev) => ({
      ...prev,
      pitches: [...prev.pitches, event],
      result:
        countResult.automaticResult || prev.result,
    }));

    setCount(countResult.count);
    setCurrentPitch(createEmptyPitch());

    return {
      success: true,
      plateAppearanceEnded:
        countResult.plateAppearanceEnded,
      automaticResult:
        countResult.automaticResult,
    };
  }

  function removeLastPitch() {
    if (!currentPA.pitches.length) return;

    const pitches = [...currentPA.pitches];
    pitches.pop();

    const previousCount =
      pitches.length > 0
        ? pitches[pitches.length - 1].countAfter
        : "0-0";

    setCurrentPA((prev) => ({
      ...prev,
      pitches,
      result: "",
    }));

    setCount(previousCount);
  }

  function finishPlateAppearance(result?: ResultType) {
    const completedPA: PitchingPlateAppearance = {
      ...currentPA,
      result: result || currentPA.result,
    };

    if (!completedPA.result) {
      return {
        success: false,
        message: "Select the final plate appearance result.",
      };
    }

    setSavedPAs((prev) => [...prev, completedPA]);

    setCount("0-0");
    setCurrentPitch(createEmptyPitch());

    setCurrentPA(
      createPitchingPlateAppearance({
        pitcher,
        batterHand: "R",
        paNumber: completedPA.paNumber + 1,
        inning: completedPA.inning,
        outsBefore: completedPA.outsBefore,
        runnersBefore: completedPA.runnersBefore,
      })
    );

    return {
      success: true,
    };
  }

  function resetCurrentPA() {
    setCount("0-0");
    setCurrentPitch(createEmptyPitch());

    setCurrentPA((prev) =>
      createPitchingPlateAppearance({
        pitcher,
        batterHand: prev.batterHand,
        paNumber: prev.paNumber,
        inning: prev.inning,
        outsBefore: prev.outsBefore,
        runnersBefore: prev.runnersBefore,
      })
    );
  }

  function changePitcher(name: string) {
    const cleanName = name.trim() || "Pitcher";

    setPitcher(cleanName);

    setCurrentPA((prev) => ({
      ...prev,
      pitcher: cleanName,
    }));
  }

  return {
    pitcher,
    count,

    currentPitch,
    currentPA,
    savedPAs,

    changePitcher,
    updateCurrentPitch,
    updateCurrentPA,

    savePitch,
    removeLastPitch,
    finishPlateAppearance,
    resetCurrentPA,
  };
}