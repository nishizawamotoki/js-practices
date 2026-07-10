import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "../db/sqlite-promise.js";

const db = new sqlite3.Database(":memory:");

runPromise(db, "CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)")
  .then(() =>
    runPromise(db, "INSERT INTO books (title) VALUES (?)", "吾輩は猫である"),
  )
  .then(({ lastID }) => {
    console.log(`id:${lastID} のデータを追加しました`);
    return allPromise(db, "SELECT id, title FROM books");
  })
  .then((rows) => {
    console.log(rows);
    return runPromise(db, "DROP TABLE books");
  })
  .then(() => {
    db.close();
  });
