"use client";

import { useEffect, useState } from "react";
import { AtBat, GameInfo, Player } from "@/types/chart";
import { createEmptyAtBat } from "@/core/chart/atBat";
import { getProgress, getNextStepLabel } from "@/core/chart/engine";

const STORAGE_KEY = "tigervision_current_game";

const emptyLineup: Player[] = Array.from({ length: 9 }, (_, i) => ({
  spot: i + 1,
  name: "",
  position: "",
  bats: "R",
}));

const defaultGameInfo: GameInfo = {
  team: "DSL Tigers",
  opponent: "Opponent",
  inning: "Top 1",
  score: "0-0",
  date: new Date().toISOString().slice(0, 10),
  chartMode: "offense",
};

type Half = "Top" | "Bottom";

function formatInning(half: Half, inning: number) {
  return `${half} ${inning}`;
}

function outsAddedFromResult(result: string) {
  if (["K", "GO", "FO", "LO", "PO", "SAC", "SF"].includes(result)) return 1;
  if (["GDP"].includes(result)) return 2;
  if (["FC"].includes(result)) return 1;
  return 0;
}

function nextHalfInning(half: Half, inning: number) {
  if (half === "Top") {
    return { half: "Bottom" as Half, inning };
  }

  return { half: "Top" as Half, inning: inning + 1 };
}

export function useChart() {
  const [hasGame, setHasGame] = useState(false);
  const [gameInfo, setGameInfo] = useState<GameInfo>(defaultGameInfo);
  const [lineup, setLineup] = useState<Player[]>(emptyLineup);
  const [currentBatterIndex, setCurrentBatterIndex] = useState(0);
  const [currentAtBat, setCurrentAtBat] = useState<AtBat>(createEmptyAtBat());
  const [savedAtBats, setSavedAtBats] = useState<AtBat[]>([]);
  const [inningNumber, setInningNumber] = useState(1);
  const [half, setHalf] = useState<Half>("Top");
  const [outs, setOuts] = useState<0 | 1 | 2>(0);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      setHasGame(data.hasGame || false);
      setGameInfo(data.gameInfo || defaultGameInfo);
      setLineup(data.lineup || emptyLineup);
      setCurrentBatterIndex(data.currentBatterIndex || 0);
      setCurrentAtBat(data.currentAtBat || createEmptyAtBat(data.lineup?.[0], 1));
      setSavedAtBats(data.savedAtBats || []);
      setInningNumber(data.inningNumber || 1);
      setHalf(data.half || "Top");
      setOuts(data.outs ?? 0);
      setIsLightMode(data.isLightMode || false);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        hasGame,
        gameInfo,
        lineup,
        currentBatterIndex,
        currentAtBat,
        savedAtBats,
        inningNumber,
        half,
        outs,
        isLightMode,
      })
    );
  }, [
    hasGame,
    gameInfo,
    lineup,
    currentBatterIndex,
    currentAtBat,
    savedAtBats,
    inningNumber,
    half,
    outs,
    isLightMode,
  ]);

  function startGame(newGameInfo: GameInfo, newLineup: Player[]) {
    const cleanLineup = newLineup.map((p, index) => ({
      ...p,
      spot: index + 1,
      name: p.name.trim() || `Player ${index + 1}`,
      position: p.position.trim() || "-",
    }));

    setGameInfo({
      ...newGameInfo,
      inning: "Top 1",
    });

    setLineup(cleanLineup);
    setCurrentBatterIndex(0);
    setSavedAtBats([]);
    setInningNumber(1);
    setHalf("Top");
    setOuts(0);
    setCurrentAtBat(createEmptyAtBat(cleanLineup[0], 1, "0"));
    setHasGame(true);
  }

  function newGame() {
    localStorage.removeItem(STORAGE_KEY);
    setHasGame(false);
    setGameInfo(defaultGameInfo);
    setLineup(emptyLineup);
    setCurrentBatterIndex(0);
    setSavedAtBats([]);
    setInningNumber(1);
    setHalf("Top");
    setOuts(0);
    setCurrentAtBat(createEmptyAtBat());
  }

  function toggleTheme() {
    setIsLightMode((prev) => !prev);
  }

  function updateGameInfo<K extends keyof GameInfo>(key: K, value: GameInfo[K]) {
    setGameInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function setManualOuts(value: 0 | 1 | 2) {
    setOuts(value);
    setCurrentAtBat((prev) => ({
      ...prev,
      outs: String(value) as "0" | "1" | "2",
    }));
  }

  function setManualInning(value: string) {
    setGameInfo((prev) => ({
      ...prev,
      inning: value,
    }));

    const [newHalf, inningText] = value.split(" ");
    const newInning = Number(inningText);

    if (newHalf === "Top" || newHalf === "Bottom") {
      setHalf(newHalf);
    }

    if (!Number.isNaN(newInning)) {
      setInningNumber(newInning);
    }
  }

  function updateAtBat<K extends keyof AtBat>(key: K, value: AtBat[K]) {
    setCurrentAtBat((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function resetAtBat() {
    const player = lineup[currentBatterIndex];
    setCurrentAtBat(
      createEmptyAtBat(
        player,
        currentAtBat.abNumber,
        String(outs) as "0" | "1" | "2"
      )
    );
  }

  function selectBatter(index: number) {
    const player = lineup[index];
    if (!player) return;

    setCurrentBatterIndex(index);
    setCurrentAtBat(
      createEmptyAtBat(
        player,
        currentAtBat.abNumber,
        String(outs) as "0" | "1" | "2"
      )
    );
  }

  function nextBatter() {
    const nextIndex = (currentBatterIndex + 1) % lineup.length;
    selectBatter(nextIndex);
  }

  function previousBatter() {
    const previousIndex =
      currentBatterIndex === 0 ? lineup.length - 1 : currentBatterIndex - 1;

    selectBatter(previousIndex);
  }

  function substituteBatter(index: number, newPlayer: Player) {
    const cleanPlayer: Player = {
      ...newPlayer,
      spot: index + 1,
      name: newPlayer.name.trim() || `Player ${index + 1}`,
      position: newPlayer.position.trim() || "-",
      bats: newPlayer.bats || "R",
    };

    setLineup((prev) =>
      prev.map((player, i) => (i === index ? cleanPlayer : player))
    );

    if (index === currentBatterIndex) {
      setCurrentAtBat((prev) => ({
        ...prev,
        batter: cleanPlayer.name,
        batterHand: cleanPlayer.bats,
      }));
    }
  }

  function saveAtBat() {
    const completedAtBat = currentAtBat;

    setSavedAtBats((prev) => [...prev, completedAtBat]);

    const addedOuts = outsAddedFromResult(completedAtBat.result);
    let nextOuts = outs + addedOuts;
    let nextHalf = half;
    let nextInning = inningNumber;

    if (nextOuts >= 3) {
      nextOuts = 0;
      const next = nextHalfInning(half, inningNumber);
      nextHalf = next.half;
      nextInning = next.inning;
    }

    const nextIndex = (currentBatterIndex + 1) % lineup.length;
    const nextPlayer = lineup[nextIndex];
    const nextABNumber = currentAtBat.abNumber + 1;

    setOuts(nextOuts as 0 | 1 | 2);
    setHalf(nextHalf);
    setInningNumber(nextInning);

    setGameInfo((prev) => ({
      ...prev,
      inning: formatInning(nextHalf, nextInning),
    }));

    setCurrentBatterIndex(nextIndex);
    setCurrentAtBat(
      createEmptyAtBat(
        nextPlayer,
        nextABNumber,
        String(nextOuts) as "0" | "1" | "2"
      )
    );
  }

  function updateSavedAtBat(index: number, updatedAtBat: AtBat) {
    setSavedAtBats((prev) =>
      prev.map((ab, i) => (i === index ? updatedAtBat : ab))
    );
  }

  function updateLastAtBat<K extends keyof AtBat>(key: K, value: AtBat[K]) {
    setSavedAtBats((prev) => {
      if (!prev.length) return prev;

      const copy = [...prev];
      const lastIndex = copy.length - 1;

      copy[lastIndex] = {
        ...copy[lastIndex],
        [key]: value,
      };

      return copy;
    });
  }

  function undoLastAtBat() {
    setSavedAtBats((prev) => {
      if (!prev.length) return prev;

      const copy = [...prev];
      const last = copy.pop();

      if (last) {
        const previousIndex =
          lineup.findIndex((p) => p.name === last.batter) >= 0
            ? lineup.findIndex((p) => p.name === last.batter)
            : currentBatterIndex;

        setCurrentBatterIndex(previousIndex);
        setCurrentAtBat(last);
      }

      return copy;
    });
  }

  return {
    hasGame,
    gameInfo,
    lineup,
    currentBatterIndex,
    currentAtBat,
    savedAtBats,
    inningNumber,
    half,
    outs,
    isLightMode,

    startGame,
    newGame,
    toggleTheme,
    updateGameInfo,
    setManualOuts,
    setManualInning,
    updateAtBat,
    resetAtBat,
    saveAtBat,
    selectBatter,
    nextBatter,
    previousBatter,
    substituteBatter,
    updateSavedAtBat,
    updateLastAtBat,
    undoLastAtBat,

    progress: getProgress(currentAtBat),
    nextStep: getNextStepLabel(currentAtBat),
  };
}