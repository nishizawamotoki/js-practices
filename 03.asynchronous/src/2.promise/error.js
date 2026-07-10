import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../db/sqlite-promise.js";

const db = new sqlite3.Database(":memory:");

runPromise(db, "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)")
  .then(() =>
    runPromise(
      db,
      "INSERT INTO dummy_books (title) VALUES (?)",
      "吾輩は猫である",
    ),
  )
  .then(
    ({ lastID }) => {
      console.log(`id:${lastID} のデータを追加しました`);
    },
    (err) => {
      console.error("データ追加時にエラーが発生しました: " + err);
    },
  )
  .then(() => allPromise(db, "SELECT id, dummy_title FROM books"))
  .then(
    (rows) => {
      console.log(rows);
    },
    (err) => {
      console.error("データ取得時にエラーが発生しました: " + err);
    },
  )
  .then(() => runPromise(db, "DROP TABLE books"))
  .then(() => db.close());
