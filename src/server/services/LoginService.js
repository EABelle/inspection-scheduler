
const jwt = require('jsonwebtoken');
const redis = require('redis');
const UserDAO = require('../dao/UserDAO');
const redisClient = require('../redisClient');


class LoginService {
  static async login(filterData) {
      const users = await UserDAO.find(filterData);
      if (!users || users.length === 0) {
          throw new Error("User or password not valid");
      }
      const { username, password } = users[0];
      const token = jwt.sign({ username, password }, 'PUBLIC');
      redisClient.set(username, token, redis.print);
      return token;
  }
}
module.exports = LoginService;
