const jwt = require('jsonwebtoken');
const redisClient = require('../redisClient');

const verifyToken = (token) => (new Promise((resolve, reject) => {
  jwt.verify(token, 'PUBLIC', (err, decoded) => {
    if (err) {
      reject(err);
    }
    resolve(decoded);
  });
}));

const compareToken = (username, token) => (new Promise((resolve, reject) => {
  redisClient.get(username, (err, comparedToken) => {
    if (err) {
      reject();
    }
    if (comparedToken === token) {
      console.log('TOKEN', comparedToken);
      resolve();
    }
    reject();
  });
}));


const auth = (req, res, next) => {
  const token = req.headers.authorization;
  return verifyToken(token)
    .then((decoded) => {
      compareToken(decoded.username, token);
      next();
    })
    .catch(() => {
      res.status(401).send('Unauthorized');
    });
};

module.exports = auth;
