
const User = require('../models/User');

class UserDAO {
  static find(filter) {
    return new Promise((resolve, reject) => {
      console.log('searching user: ', filter);
      User.find(filter).then((users) => {
        if (!users || users.length === 0) {
          reject({ message: 'no se encontró ningún usuario' });
        } else {
          resolve(users[0]);
        }
      }).catch(() => { reject({ message: 'no se pudo realizar la busqueda de usuario' }); });
    });
  }

  static fetch(id) {
    return new Promise((resolve, reject) => {
      User.findById(id).exec((err, user) => {
        if (err || !user) {
          console.log(err);
          reject({ message: 'No pudo encontrarse el usuario' });
        } else {
          resolve(user);
        }
      });
    });
  }
}

module.exports = UserDAO;
