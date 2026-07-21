import sqlite3 from "sqlite3";
import { runPromise, allPromise, closePromise } from "../db/sqlite-promise.js";

const db = new sqlite3.Database(":memory:");

await runPromise(db, "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)");

try {
  const { lastID } = await runPromise(
    db,
    "INSERT INTO dummy_books (title) VALUES (?)",
    "吾輩は猫である",
  );
  console.log(`id:${lastID} のデータを追加しました`);
} catch (err) {
  if (err?.code === "SQLITE_ERROR") {
    console.error(`データ追加時にエラーが発生しました: ${err}`);
  } else {
    throw err;
  }
}

try {
  const rows = await allPromise(db, "SELECT id, dummy_title FROM books");
  console.log(rows);
} catch (err) {
  if (err?.code === "SQLITE_ERROR") {
    console.error(`データ取得時にエラーが発生しました: ${err}`);
  } else {
    throw err;
  }
}

await runPromise(db, "DROP TABLE books");
await closePromise(db);
