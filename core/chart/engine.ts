import { AtBat, ChartStep } from "@/types/chart";

const BALL_IN_PLAY_RESULTS = new Set([
  "1B",
  "2B",
  "3B",
  "HR",
  "GO",
  "FO",
  "LO",
  "PO",
  "FC",
  "GDP",
  "SAC",
  "SF",
  "Other",
]);

const NO_CONTACT_RESULTS = new Set(["BB", "HBP", "K"]);

export function needsContact(atBat: AtBat) {
  return BALL_IN_PLAY_RESULTS.has(atBat.result);
}

export function needsFieldDirection(atBat: AtBat) {
  return BALL_IN_PLAY_RESULTS.has(atBat.result);
}

export function isNoContactResult(atBat: AtBat) {
  return NO_CONTACT_RESULTS.has(atBat.result);
}

export function getStepStatus(
  atBat: AtBat,
  step: ChartStep
): "pending" | "active" | "done" {
  const active = getActiveStep(atBat);

  if (isStepDone(atBat, step)) return "done";
  if (active === step) return "active";
  return "pending";
}

export function getActiveStep(atBat: AtBat): ChartStep {
  if (!atBat.result) return "result";
  if (!atBat.pitch) return "pitch";
  if (!atBat.zone) return "zone";
  if (!atBat.count) return "count";

  if (needsContact(atBat) && !atBat.contact) return "contact";
  if (needsContact(atBat) && !atBat.quality) return "contact";
  if (needsFieldDirection(atBat) && !atBat.direction) return "field";

  return "finish";
}

export function isStepDone(atBat: AtBat, step: ChartStep) {
  if (step === "result") return Boolean(atBat.result);
  if (step === "pitch") return Boolean(atBat.pitch);
  if (step === "zone") return Boolean(atBat.zone);
  if (step === "count") return Boolean(atBat.count);

  if (step === "contact") {
    if (isNoContactResult(atBat)) return true;
    return Boolean(atBat.contact && atBat.quality);
  }

  if (step === "field") {
    if (!needsFieldDirection(atBat)) return true;
    return Boolean(atBat.direction);
  }

  if (step === "finish") {
    return getActiveStep(atBat) === "finish";
  }

  return false;
}

export function getProgress(atBat: AtBat) {
  const steps: ChartStep[] = [
    "result",
    "pitch",
    "zone",
    "count",
    "contact",
    "field",
  ];

  const done = steps.filter((step) => isStepDone(atBat, step)).length;

  return Math.round((done / steps.length) * 100);
}

export function getNextStepLabel(atBat: AtBat) {
  const step = getActiveStep(atBat);

  const labels: Record<ChartStep, string> = {
    result: "Select Result",
    pitch: "Select Pitch",
    zone: "Select Location",
    count: "Select Count",
    contact: "Select Contact",
    field: "Select Field Direction",
    finish: "Save At-Bat",
  };

  return labels[step];
}