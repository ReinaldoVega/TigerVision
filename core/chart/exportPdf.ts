import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AtBat, GameInfo, Player } from "@/types/chart";

function safeText(value: unknown) {
  return String(value ?? "").trim();
}

function countBy<T extends string>(items: T[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    if (!item) return acc;
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function formatCountMap(map: Record<string, number>) {
  const entries = Object.entries(map);
  if (!entries.length) return "-";
  return entries.map(([k, v]) => `${k}: ${v}`).join("   ");
}

export function exportGameChartPdf({
  gameInfo,
  lineup,
  atBats,
  filename,
}: {
  gameInfo: GameInfo;
  lineup: Player[];
  atBats: AtBat[];
  filename?: string;
}) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "letter",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  const navy = "#07111F";
  const navy2 = "#0C2340";
  const orange = "#FA4616";
  const gray = "#64748B";
  const lightGray = "#F1F5F9";

  const pitchCount = countBy(atBats.map((ab) => ab.pitch));
  const resultCount = countBy(atBats.map((ab) => ab.result));
  const contactCount = countBy(atBats.map((ab) => ab.contact));
  const qualityCount = countBy(atBats.map((ab) => ab.quality));

  // HEADER
  doc.setFillColor(navy);
  doc.rect(0, 0, pageWidth, 78, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor("#FFFFFF");
  doc.text("TigerVision Game Chart", 36, 32);

  doc.setFontSize(10);
  doc.setTextColor("#CBD5E1");
  doc.text("Professional Baseball Charting Report", 36, 52);

  doc.setFontSize(18);
  doc.setTextColor(orange);
  doc.text(`${safeText(gameInfo.team)} vs ${safeText(gameInfo.opponent)}`, pageWidth / 2, 32, {
    align: "center",
  });

  doc.setFontSize(11);
  doc.setTextColor("#FFFFFF");
  doc.text(
    `${safeText(gameInfo.date)}   |   ${safeText(gameInfo.inning)}   |   Score: ${safeText(gameInfo.score)}`,
    pageWidth / 2,
    54,
    { align: "center" }
  );

  doc.setFillColor(orange);
  doc.roundedRect(pageWidth - 150, 22, 114, 32, 8, 8, "F");

  doc.setTextColor("#FFFFFF");
  doc.setFontSize(11);
  doc.text(`${atBats.length} PA CHARTED`, pageWidth - 93, 42, {
    align: "center",
  });

  // SUMMARY CARDS
  let y = 100;

  const cards = [
    ["Pitch Mix", formatCountMap(pitchCount)],
    ["Results", formatCountMap(resultCount)],
    ["Contact", formatCountMap(contactCount)],
    ["Quality", formatCountMap(qualityCount)],
  ];

  const cardWidth = (pageWidth - 72 - 36) / 4;

  cards.forEach(([title, value], index) => {
    const x = 36 + index * (cardWidth + 12);

    doc.setFillColor(lightGray);
    doc.roundedRect(x, y, cardWidth, 62, 10, 10, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(gray);
    doc.text(title.toUpperCase(), x + 12, y + 20);

    doc.setFontSize(8);
    doc.setTextColor(navy2);

    const split = doc.splitTextToSize(value, cardWidth - 24);
    doc.text(split, x + 12, y + 38);
  });

  y += 86;

  // LINEUP
  autoTable(doc, {
    startY: y,
    head: [["Spot", "Player", "Pos", "Bats"]],
    body: lineup.map((p) => [
      p.spot,
      safeText(p.name),
      safeText(p.position),
      safeText(p.bats),
    ]),
    theme: "grid",
    tableWidth: 250,
    margin: { left: 36 },
    styles: {
      fontSize: 8,
      cellPadding: 4,
      lineColor: "#E2E8F0",
      lineWidth: 0.5,
    },
    headStyles: {
      fillColor: navy2,
      textColor: "#FFFFFF",
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: "#F8FAFC",
    },
  });

  // SCOREKEEPING GRID
  autoTable(doc, {
    startY: y,
    head: [
      [
        "AB",
        "Batter",
        "Hand",
        "Pitch",
        "Velo",
        "Zone",
        "Count",
        "Contact",
        "Quality",
        "Dir",
        "Result",
        "Outs",
        "Runners",
        "Comment",
      ],
    ],
    body: atBats.map((ab) => [
      ab.abNumber,
      safeText(ab.batter),
      safeText(ab.batterHand),
      safeText(ab.pitch),
      safeText(ab.velo),
      safeText(ab.zone),
      safeText(ab.count),
      safeText(ab.contact),
      safeText(ab.quality),
      safeText(ab.direction),
      safeText(ab.result),
      safeText(ab.outs),
      safeText(ab.runners),
      safeText(ab.comment),
      safeText(ab.comment || ab.inkText),
    ]),
    theme: "grid",
    margin: { left: 305, right: 36 },
    styles: {
      fontSize: 7,
      cellPadding: 3,
      overflow: "linebreak",
      lineColor: "#CBD5E1",
      lineWidth: 0.4,
    },
    headStyles: {
      fillColor: navy2,
      textColor: "#FFFFFF",
      fontStyle: "bold",
      fontSize: 7,
    },
    alternateRowStyles: {
      fillColor: "#F8FAFC",
    },
    columnStyles: {
      0: { cellWidth: 24 },
      1: { cellWidth: 72 },
      2: { cellWidth: 28 },
      3: { cellWidth: 30 },
      4: { cellWidth: 34 },
      5: { cellWidth: 32 },
      6: { cellWidth: 36 },
      7: { cellWidth: 42 },
      8: { cellWidth: 44 },
      9: { cellWidth: 30 },
      10: { cellWidth: 40 },
      11: { cellWidth: 30 },
      12: { cellWidth: 48 },
      13: { cellWidth: 110 },
    },
  });

  const notesWithInk = atBats.filter((ab) => ab.inkNote);

if (notesWithInk.length) {
  doc.addPage();

  doc.setFillColor(navy);
  doc.rect(0, 0, pageWidth, 60, "F");

  doc.setTextColor("#FFFFFF");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Handwritten Notes", 36, 36);

  let noteY = 85;

  notesWithInk.forEach((ab, index) => {
    if (noteY > 420) {
      doc.addPage();
      noteY = 60;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(navy2);
    doc.text(`AB ${ab.abNumber} — ${ab.batter}`, 36, noteY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(gray);
    doc.text(`Converted: ${safeText(ab.inkText || ab.comment || "-")}`, 36, noteY + 16);

    try {
      doc.addImage(ab.inkNote, "PNG", 36, noteY + 28, 340, 120);
    } catch {}

    noteY += 175;
  });
}

  // FOOTER / PAGE NUMBERS
  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    const h = doc.internal.pageSize.getHeight();

    doc.setFillColor(navy);
    doc.rect(0, h - 28, pageWidth, 28, "F");

    doc.setTextColor("#CBD5E1");
    doc.setFontSize(8);
    doc.text("TigerVision Charting", 36, h - 11);

    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 36, h - 11, {
      align: "right",
    });
  }

  const safeTeam = safeText(gameInfo.team).replace(/\s+/g, "-").toLowerCase();
  const safeOpp = safeText(gameInfo.opponent || "opponent")
    .replace(/\s+/g, "-")
    .toLowerCase();

  doc.save(filename || `${gameInfo.date}-${safeTeam}-vs-${safeOpp}-chart.pdf`);
}