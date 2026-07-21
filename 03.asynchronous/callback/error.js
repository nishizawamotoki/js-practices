import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run("CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT)", () => {
  db.run(
    "INSERT INTO dummy_books (title) VALUES (?)",
    "吾輩は猫である",
    function (err) {
      if (err) {
        console.error(`データ追加時にエラーが発生しました: ${err}`);
      } else {
        console.log(`ID:${this.lastID} のデータを追加しました`);
      }
      db.all("SELECT id, dummy_title FROM books", (err, rows) => {
        if (err) {
          console.error(`データ取得時にエラーが発生しました: ${err}`);
        } else {
          console.log(rows);
        }
        db.run("DROP TABLE books", () => {
          db.close();
        });
      });
    },
  );
});
