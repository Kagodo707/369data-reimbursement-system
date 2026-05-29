/**
 * One-time go-live preparation helper.
 * Adds governance columns and tags pre-go-live rows as Pilot.
 * Run manually from Apps Script editor.
 */

const GO_LIVE_DATE = new Date("2026-06-01T00:00:00");
const CLAIMS_SHEET = "Claims_Register";

function prepareGoLiveGovernance() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CLAIMS_SHEET);
  if (!sh) throw new Error("Claims_Register sheet not found.");

  const headerRow = 4;
  const lastCol = sh.getLastColumn();
  const headers = sh.getRange(headerRow, 1, 1, lastCol).getValues()[0];

  ensureColumn_(sh, headers, headerRow, "Environment");
  ensureColumn_(sh, headers, headerRow, "IsArchived");

  const refreshedHeaders = sh.getRange(headerRow, 1, 1, sh.getLastColumn()).getValues()[0];
  const dateIdx = refreshedHeaders.indexOf("Date Submitted") + 1;
  const envIdx = refreshedHeaders.indexOf("Environment") + 1;
  const archivedIdx = refreshedHeaders.indexOf("IsArchived") + 1;
  const claimantIdx = refreshedHeaders.indexOf("Claimant Name") + 1;

  const startRow = headerRow + 1;
  const numRows = sh.getLastRow() - headerRow;
  if (numRows <= 0) return;

  const values = sh.getRange(startRow, 1, numRows, sh.getLastColumn()).getValues();

  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    const claimant = row[claimantIdx - 1];
    if (!claimant) continue;

    const submitted = parseDate_(row[dateIdx - 1]);
    const isPilot = submitted && submitted < GO_LIVE_DATE;

    row[envIdx - 1] = isPilot ? "Pilot" : "Production";
    row[archivedIdx - 1] = isPilot ? true : false;
  }

  sh.getRange(startRow, 1, numRows, sh.getLastColumn()).setValues(values);
}

function ensureColumn_(sheet, headers, headerRow, name) {
  if (headers.indexOf(name) !== -1) return;
  const insertAt = sheet.getLastColumn() + 1;
  sheet.insertColumnAfter(sheet.getLastColumn());
  sheet.getRange(headerRow, insertAt, 1, 1).setValue(name);
}

function parseDate_(v) {
  if (Object.prototype.toString.call(v) === "[object Date]") return v;
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}
