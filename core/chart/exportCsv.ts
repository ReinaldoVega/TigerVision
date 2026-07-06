import { AtBat, GameInfo } from "@/types/chart";

function escapeCsv(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

export function buildAtBatsCsv(gameInfo: GameInfo, atBats: AtBat[]) {
  const headers = [
    "Date",
    "Team",
    "Opponent",
    "AB",
    "Batter",
    "Hand",
    "Pitch",
    "Velo",
    "Zone",
    "Count",
    "Contact",
    "Quality",
    "Direction",
    "Result",
    "Outs",
    "Runners",
    "Comment",
  ];

  const rows = atBats.map((ab) => [
    gameInfo.date,
    gameInfo.team,
    gameInfo.opponent,
    ab.abNumber,
    ab.batter,
    ab.batterHand,
    ab.pitch,
    ab.velo,
    ab.zone,
    ab.count,
    ab.contact,
    ab.quality,
    ab.direction,
    ab.result,
    ab.outs,
    ab.runners,
    ab.comment,
  ]);

  return [headers, ...rows]
    .map((row) => row.map(escapeCsv).join(","))
    .join("\n");
}

export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}