#!/usr/bin/env node
import minimist from "minimist";
import dayjs from "dayjs";

const SATURDAY = 6;

const argv = minimist(process.argv.slice(2));
const year = argv.y !== undefined ? argv.y : dayjs().year();
const monthIndex = argv.m !== undefined ? argv.m - 1 : dayjs().month();

const targetDate = dayjs(new Date(year, monthIndex, 1));
const offsetCells = Array.from({ length: targetDate.day() });
const dateCells = Array.from({ length: targetDate.daysInMonth() }, (_, i) => {
  return dayjs(new Date(year, monthIndex, ++i));
});
const callendarCells = [...offsetCells, ...dateCells];

console.log(`      ${monthIndex + 1}月 ${year}      `);
console.log("日 月 火 水 木 金 土");
callendarCells.forEach((cell) => {
  process.stdout.write(cell ? cell.date().toString().padStart(2, " ") : "  ");
  if (cell?.day() === SATURDAY) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
});
