import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)", () => {
  db.run("INSERT INTO books (title) VALUES (?)", "吾輩は猫である", function () {
    console.log(`id:${this.lastID} のデータを追加しました`);
    db.all("SELECT id, title FROM books", (_, rows) => {
      console.log(rows);
      db.run("DROP TABLE books", () => {
        db.close();
      });
    });
  });
});
