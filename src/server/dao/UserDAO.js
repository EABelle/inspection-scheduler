
const User = require('../models/User');

class UserDAO {
  static find(filter) {
    return new Promise((resolve, reject) => {
      console.log('searching user: ', filter);
      User.find(filter).then((users) => {
        if (!users || users.length === 0) {
          reject(new Error("No users found"));
        } else {
          resolve(users[0]);
        }
      }).catch((err) => { reject(err); });
    });
  }

  static fetch(id) {
    return new Promise((resolve, reject) => {
      User.findById(id).exec((err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }
}

module.exports = UserDAO;
