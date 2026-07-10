import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../db/sqlite-promise.js";

const db = new sqlite3.Database(":memory:");

(async function () {
  await runPromise(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)",
  );

  const { lastID } = await runPromise(
    db,
    "INSERT INTO books (title) VALUES (?)",
    "吾輩は猫である",
  );
  console.log(`id:${lastID} のデータを追加しました`);

  const rows = await allPromise(db, "SELECT id, title FROM books");
  console.log(rows);

  await runPromise(db, "DROP TABLE books");
  db.close();
})();
