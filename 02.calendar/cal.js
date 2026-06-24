#!/usr/bin/env node
import minimist from "minimist";
import dayjs from "dayjs";

const argv = minimist(process.argv.slice(2));
const year = argv.y ?? dayjs().year();
const month = argv.m !== undefined ? argv.m - 1 : dayjs().month();

const targetDate = dayjs(new Date(year, month, 1));
const offsetCells = Array.from({ length: targetDate.day() });
const dateCells = Array.from({ length: targetDate.daysInMonth() }, (_, i) => {
  return dayjs(new Date(year, month, ++i));
});
const calendarCells = [...offsetCells, ...dateCells];

console.log(`      ${month + 1}月 ${year}`);
console.log("日 月 火 水 木 金 土");
calendarCells.forEach((cell) => {
  process.stdout.write(cell ? cell.date().toString().padStart(2, " ") : "  ");

  const isLastDay = cell?.date() === targetDate.endOf("month").date();
  const isSaturday = cell?.day() === 6;
  if (isLastDay) {
    process.stdout.write("\n");
  } else if (isSaturday) {
    process.stdout.write("\n");
  } else {
    process.stdout.write(" ");
  }
});
