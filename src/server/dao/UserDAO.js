
const User = require('../models/User');

class UserDAO {
  static find(filter) {
    return new Promise((resolve, reject) => {
      User.find(filter).then((users) => {
        if (!users || users.length === 0) {
          reject(new Error("No users found"));
        } else {
          resolve(users[0]);
        }
      }).catch(reject);
    });
  }

  static async fetch(id) {
    return await User.findById(id);
  }
}

module.exports = UserDAO;
