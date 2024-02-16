'use strict';

function getValue(elem) {
  return (typeof(elem) === "string" || typeof(elem) === "number") ? String(elem) : "";
}

function generateSizeTable(data, maxWidth) {
  const x = [];
  const y = [];
  for (let i = 0; i < data.length; i++) {
    y[i] = 1;
    for (let j = 0; j < data[i].length; j++) {
      const str = getValue(data[i][j]);
      const minHeight = isFinite(maxWidth) ? Math.ceil(str.length/maxWidth) : 1;
      if (typeof(x[j]) === "undefined") {
        x[j] = str.length;
      }
      if (x[j] < str.length) {
        x[j] = str.length;
      }
      if (x[j] > maxWidth) {
        x[j] = maxWidth;
      }
      if (y[i] < minHeight) {
        y[i] = minHeight;
      }
    }
  }
  return [y,x];
}

function generateDataTable(data, sizeTable) {
  const rows = [];
  for (let y1 = 0; y1 < data.length; y1++) {
    const row = data[y1];
    const height = sizeTable[0][y1];
    const lines = [];
    for (let y2 = 0; y2 < height; y2++) {
      const line = [];
      for (let x1 = 0; x1 < row.length; x1++) {
        const str = getValue(row[x1]);
        const width = sizeTable[1][x1];
        const minX = y2 * width;
        const maxX = minX + width;

        let cell = "";
        for (let x2 = minX; x2 < maxX; x2++) {
          const ch = str.charAt(x2) || " ";
          cell += ch;
        }

        line.push(cell);
      }
      lines.push(line);
    }
    rows.push(lines);
  }
  return rows;
}

function generateBorderRow(x, hoz, pvt) {
  const br = [];
  // add first pivot character
  br.push(pvt);
  for (let i = 0; i < x.length; i++) {
    const w = x[i];
    let str = "";
    for (let j = 0; j < w; j++) {
      // add horizontal character
      str += hoz;
    }
    // add value, pivot character
    br.push(str, pvt);
  }
  return br;
}

function createTable(data, maxWidth) {
  const horizontal = "-";
  const vertical = "|";
  const pivot = "+";

  const st = generateSizeTable(data, maxWidth || Number.POSITIVE_INFINITY);
  const dt = generateDataTable(data, st);
  
  // add top border
  const table = [generateBorderRow(st[1], horizontal, pivot).join("")];

  for (let y1 = 0; y1 < dt.length; y1++) {
    const row = dt[y1];

    // add table row
    for (let y2 = 0; y2 < row.length; y2++) {
      const line = row[y2];

      // add left vertical character
      const tableRow = [vertical];
      for (let x1 = 0; x1 < line.length; x1++) {
        const cell = line[x1];
        // add value, right vertical character
        tableRow.push(cell, vertical);
      }

      table.push(tableRow.join(""));
    }

    // add bottom border
    table.push(generateBorderRow(st[1], horizontal, pivot).join(""));    
  }

  return table.join("\n");
}

export default {
  create: createTable,
}