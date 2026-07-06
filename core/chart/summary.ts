import { AtBat } from "@/types/chart";

export function buildAtBatReceipt(atBat: AtBat) {
  const receipt: string[] = [];

  if (atBat.pitch) {
    receipt.push(`${atBat.pitch}${atBat.velo ? ` ${atBat.velo}` : ""}`);
  }

  if (atBat.zone) {
    receipt.push(`Zone ${atBat.zone}`);
  }

  if (atBat.count) {
    receipt.push(`Count ${atBat.count}`);
  }

  if (atBat.contact) {
    receipt.push(atBat.contact);
  }

  if (atBat.direction) {
    receipt.push(atBat.direction);
  }

  if (atBat.quality) {
    receipt.push(atBat.quality);
  }

  if (atBat.result) {
    receipt.push(atBat.result);
  }

  return receipt;
}

export function generateAtBatText(atBat: AtBat) {
  if (!atBat.result) return "No at-bat result selected yet.";

  const pitchText = atBat.pitch
    ? `${atBat.pitch}${atBat.velo ? ` at ${atBat.velo} mph` : ""}`
    : "the final pitch";

  if (atBat.result === "BB") {
    return `${atBat.batter} walked after seeing ${pitchText}.`;
  }

  if (atBat.result === "HBP") {
    return `${atBat.batter} reached on a hit-by-pitch.`;
  }

  if (atBat.result === "K") {
    return `${atBat.batter} struck out on ${pitchText}.`;
  }

  const contact = atBat.contact ? `${atBat.contact}` : "ball in play";
  const direction = atBat.direction ? `to ${atBat.direction}` : "";
  const quality = atBat.quality ? `${atBat.quality} contact` : "contact";

  return `${atBat.batter} produced ${quality} on a ${contact} ${direction} off ${pitchText}.`;
}