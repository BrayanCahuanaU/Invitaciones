import ExcelJS from "exceljs";
import type { InvitationExportData } from "@/lib/invitation-export-data";

const WINE = "FF7B2447";
const ROSE = "FFB03A6B";
const ROSE_LIGHT = "FFFDF2F6";
const STRIPE = "FFFBF7F9";
const GOLD_LIGHT = "FFFFF4D6";
const TEXT = "FF3F3339";
const MUTED = "FF7A6A72";
const BORDER_COLOR = "FFE8D3DD";

const thinBorder: Partial<ExcelJS.Borders> = {
  top: { style: "thin", color: { argb: BORDER_COLOR } },
  left: { style: "thin", color: { argb: BORDER_COLOR } },
  bottom: { style: "thin", color: { argb: BORDER_COLOR } },
  right: { style: "thin", color: { argb: BORDER_COLOR } },
};

const limaDate = new Intl.DateTimeFormat("es-PE", {
  timeZone: "America/Lima",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const limaDateTime = new Intl.DateTimeFormat("es-PE", {
  timeZone: "America/Lima",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatEventDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : limaDate.format(date);
}

function formatRegisteredAt(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : limaDateTime.format(date);
}

function addTitleBlock(
  ws: ExcelJS.Worksheet,
  title: string,
  subtitle: string,
  lastColumn: number
) {
  ws.mergeCells(1, 1, 1, lastColumn);
  const heading = ws.getCell(1, 1);
  heading.value = title;
  heading.font = { name: "Georgia", size: 18, bold: true, color: { argb: "FFFFFFFF" } };
  heading.alignment = { vertical: "middle", horizontal: "center" };
  heading.fill = { type: "pattern", pattern: "solid", fgColor: { argb: WINE } };
  ws.getRow(1).height = 34;

  ws.mergeCells(2, 1, 2, lastColumn);
  const sub = ws.getCell(2, 1);
  sub.value = subtitle;
  sub.font = { name: "Calibri", size: 10, italic: true, color: { argb: "FF6B4A58" } };
  sub.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
  sub.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ROSE_LIGHT } };
  ws.getRow(2).height = 22;
}

function addHeaderRow(ws: ExcelJS.Worksheet, row: number, headers: string[]) {
  headers.forEach((header, index) => {
    const cell = ws.getCell(row, index + 1);
    cell.value = header;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ROSE } };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = thinBorder;
  });
  ws.getRow(row).height = 28;
}

export function buildExportFilename({ invitation }: InvitationExportData) {
  const base = invitation.hero.protagonists
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `${base || invitation.slug}_Invitados_y_Musica.xlsx`;
}

export async function buildInvitationWorkbook(
  data: InvitationExportData
): Promise<Buffer> {
  const { invitation, guests, songs, duplicatesRemoved } = data;

  const confirmed = guests.filter((guest) => guest.attending);
  const declined = guests.length - confirmed.length;
  const totalPeople = confirmed.reduce(
    (sum, guest) => sum + 1 + guest.guests,
    0
  );
  const totalAdditional = confirmed.reduce((sum, guest) => sum + guest.guests, 0);

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Invitaciones";
  workbook.created = new Date();
  workbook.modified = new Date();

  const eventLine = `${invitation.hero.motivo} · ${formatEventDate(invitation.eventDate)}`;

  // ───────────────────────── Hoja: Invitados ─────────────────────────
  const guestSheet = workbook.addWorksheet("Invitados", {
    views: [{ state: "frozen", ySplit: 7 }],
    pageSetup: { orientation: "portrait", fitToPage: true, fitToWidth: 1 },
    properties: { tabColor: { argb: ROSE } },
  });

  addTitleBlock(
    guestSheet,
    invitation.hero.protagonists.toUpperCase(),
    `${eventLine} · Lista de invitados · Generada el ${limaDateTime.format(
      new Date()
    )} (hora de Lima)`,
    6
  );

  const summary: [string, string | number][] = [
    ["Confirmados", confirmed.length],
    ["No asistirán", declined],
    ["Total de personas", totalPeople],
  ];
  summary.forEach(([label, value], index) => {
    const labelCell = guestSheet.getCell(4, index + 1);
    labelCell.value = label;
    labelCell.font = { bold: true, size: 10, color: { argb: "FF6B4A58" } };
    labelCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: ROSE_LIGHT } };
    labelCell.alignment = { horizontal: "center", vertical: "middle" };
    labelCell.border = thinBorder;

    const valueCell = guestSheet.getCell(5, index + 1);
    valueCell.value = value;
    valueCell.font = { bold: true, size: 16, color: { argb: WINE } };
    valueCell.alignment = { horizontal: "center", vertical: "middle" };
    valueCell.border = thinBorder;
  });

  guestSheet.mergeCells(4, 4, 5, 6);
  const noteCell = guestSheet.getCell(4, 4);
  const notes: string[] = [];
  if (duplicatesRemoved > 0) {
    notes.push(
      `Se eliminaron ${duplicatesRemoved} registro${
        duplicatesRemoved === 1 ? "" : "s"
      } repetido${duplicatesRemoved === 1 ? "" : "s"} de nombres.`
    );
  }
  notes.push(
    "«Invitados adicionales» son los acompañantes declarados al confirmar."
  );
  noteCell.value = notes.join(" ");
  noteCell.font = { size: 9, italic: true, color: { argb: MUTED } };
  noteCell.alignment = { wrapText: true, vertical: "middle" };

  const guestHeaderRow = 7;
  addHeaderRow(guestSheet, guestHeaderRow, [
    "N°",
    "Invitado",
    "Asistencia",
    "Invitados adicionales",
    "Total de personas",
    "Confirmado el",
  ]);

  guests.forEach((guest, index) => {
    const row = guestHeaderRow + 1 + index;
    const values: (string | number)[] = [
      index + 1,
      guest.name,
      guest.attending ? "Confirmado" : "No asistirá",
      guest.guests,
      guest.attending ? 1 + guest.guests : 0,
      formatRegisteredAt(guest.createdAt),
    ];

    values.forEach((value, column) => {
      const cell = guestSheet.getCell(row, column + 1);
      cell.value = value;
      cell.font = { size: 10, color: { argb: TEXT }, bold: column === 1 };
      cell.border = thinBorder;
      cell.alignment = {
        vertical: "middle",
        horizontal: column === 1 ? "left" : "center",
      };
      if (index % 2 === 1) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: STRIPE } };
      }
    });
  });

  if (guests.length > 0) {
    const totalRowNumber = guestHeaderRow + 1 + guests.length;
    const totalRow = guestSheet.getRow(totalRowNumber);
    totalRow.getCell(2).value = "TOTAL";
    totalRow.getCell(4).value = totalAdditional;
    totalRow.getCell(5).value = totalPeople;

    for (let column = 1; column <= 6; column += 1) {
      const cell = totalRow.getCell(column);
      cell.font = { bold: true, size: 10, color: { argb: WINE } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD_LIGHT } };
      cell.border = thinBorder;
      cell.alignment = { vertical: "middle", horizontal: column === 2 ? "right" : "center" };
    }
  }

  const lastGuestRow = guestHeaderRow + guests.length;
  guestSheet.autoFilter = {
    from: { row: guestHeaderRow, column: 1 },
    to: { row: lastGuestRow, column: 6 },
  };
  [6, 32, 14, 13, 12, 18].forEach((width, index) => {
    guestSheet.getColumn(index + 1).width = width;
  });

  // ───────────────────────── Hoja: Música ─────────────────────────
  const songSheet = workbook.addWorksheet("Música", {
    views: [{ state: "frozen", ySplit: 6 }],
    pageSetup: { orientation: "portrait", fitToPage: true, fitToWidth: 1 },
    properties: { tabColor: { argb: WINE } },
  });

  addTitleBlock(
    songSheet,
    `MÚSICA SUGERIDA · ${invitation.hero.protagonists.toUpperCase()}`,
    `${eventLine} · ${songs.length} canción${
      songs.length === 1 ? "" : "es"
    } · Puntuación = votos de los invitados`,
    4
  );

  const songHeaderRow = 6;
  addHeaderRow(songSheet, songHeaderRow, [
    "Puesto",
    "Canción",
    "Artista",
    "Puntuación",
  ]);

  songs.forEach((song, index) => {
    const row = songHeaderRow + 1 + index;
    const values = [index + 1, song.title, song.artist, song.score];

    values.forEach((value, column) => {
      const cell = songSheet.getCell(row, column + 1);
      cell.value = value;
      cell.font = {
        size: 10,
        color: { argb: TEXT },
        bold: column === 3 && song.score >= 10,
      };
      cell.border = thinBorder;
      cell.alignment = {
        vertical: "middle",
        horizontal: column === 1 ? "left" : "center",
      };
      if (index % 2 === 1) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: STRIPE } };
      }
    });

    if (index < 3) {
      const positionCell = songSheet.getCell(row, 1);
      positionCell.font = { bold: true, color: { argb: WINE } };
      positionCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: GOLD_LIGHT },
      };
    }
  });

  if (songs.length > 0) {
    const totalVotes = songs.reduce((sum, song) => sum + song.score, 0);
    const totalRow = songSheet.getRow(songHeaderRow + 1 + songs.length);
    totalRow.getCell(3).value = "TOTAL DE VOTOS";
    totalRow.getCell(4).value = totalVotes;

    for (let column = 1; column <= 4; column += 1) {
      const cell = totalRow.getCell(column);
      cell.font = { bold: true, size: 10, color: { argb: WINE } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GOLD_LIGHT } };
      cell.border = thinBorder;
      cell.alignment = {
        vertical: "middle",
        horizontal: column === 3 ? "right" : "center",
      };
    }
  }

  const lastSongRow = songHeaderRow + songs.length;
  songSheet.autoFilter = {
    from: { row: songHeaderRow, column: 1 },
    to: { row: lastSongRow, column: 4 },
  };
  [9, 62, 32, 12].forEach((width, index) => {
    songSheet.getColumn(index + 1).width = width;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer as ArrayBuffer);
}
