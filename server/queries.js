const { getDB, checkToken } = require('./controllers/utils');

module.exports = {
  getAll: req => {
    return new Promise((resolve, reject) => {
      const q = req.query;
      if (req.baseUrl === '/score') {
        if (q.id && q.name && q.score && q.time && q.access_token) {
          const id = q.id;
          const name = q.name;
          const score = q.score;
          const time = q.time;
          const accessToken = q.access_token;
          checkToken(accessToken)
            .then(() => {
              const DB = getDB(req);
              const statement = DB.prepare(
                'INSERT INTO KING (id, name, score, time) VALUES (?, ?, ?, ?)',
                [id, name, score, time]
              );
              DB.get('SELECT * FROM KING WHERE id = ?', id, (err, res) => {
                if (err) return reject({ error: err });
                if (!res) {
                  statement.run(err => {
                    if (err) return reject({ error: err });
                    resolve({ success: 1 });
                  });
                } else {
                  if (res.score > score) {
                    DB.run(
                      'UPDATE KING SET score = ?, time = ? WHERE id = ? AND name = ?',
                      [score, time, id, name],
                      err => {
                        if (err) return reject({ error: err });
                        resolve({ success: 1 });
                      }
                    );
                  } else {
                    resolve(res);
                  }
                }
              });
            })
            .catch(() => {
              return reject({ error: 404 });
            });
        } else {
          reject({ error: 404 });
        }
      } else if (req.baseUrl === '/superDump') {
        const DB = getDB(req);
        DB.all('SELECT * FROM KING', (err, res) => {
          if (err) return reject({ error: err });
          resolve(res);
        });
      } else if (req.baseUrl === '/top5') {
        const DB = getDB(req);
        DB.all(
          'SELECT * FROM KING ORDER BY score ASC, time ASC LIMIT 5',
          (err, res) => {
            if (err) return reject({ error: err });
            resolve(res);
          }
        );
      }
    });
  }
};
