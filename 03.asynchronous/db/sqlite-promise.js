export function runPromise(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.run(sql, param, function (err) {
      err ? reject(err) : resolve(this);
    });
  });
}

export function allPromise(db, sql, param) {
  return new Promise((resolve, reject) => {
    db.all(sql, param, (err, rows) => {
      err ? reject(err) : resolve(rows);
    });
  });
}
