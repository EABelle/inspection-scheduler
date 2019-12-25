
const jwt = require('jsonwebtoken');
const redis = require('redis');
const UserDAO = require('../dao/userDAO');
const redisClient = require('../redisClient');


class LoginService {
  static login(filterData) {
    return new Promise((resolve, reject) => {
      UserDAO.find(filterData)
        .then(({ username, password }) => {
          const token = jwt.sign({ username, password }, 'PUBLIC');
          redisClient.set(username, token, redis.print);
          resolve(token);
        }).catch((err) => reject(err));
    });
  }
}
module.exports = LoginService;
