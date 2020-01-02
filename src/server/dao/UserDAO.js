
const User = require('../models/User');

class UserDAO {

  static find(filter) {
    return User.find(filter);
  }

}

module.exports = UserDAO;
