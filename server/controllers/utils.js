const axios = require('axios');

module.exports = {
  getDB(req) {
    return req.app.get('db');
  },
  checkToken: e => {
    return new Promise((resolve, reject) => {
      axios
        .get(`https://graph.facebook.com/me?access_token=${e}`)
        .then(() => {
          return resolve();
        })
        .catch(() => {
          return reject();
        });
    });
  }
};
