
const Location = require('../models/Location');

class LocationDAO {
  static find(filter) {
    return new Promise((resolve, reject) => {
      const query = filter && filter.cp && filter.nombre ? { $or: [{ cp: filter.cp }, { nombre: filter.nombre }] } : filter;
      console.log(query);
      Location.find(query).then((locations) => {
        if (!locations) {
          reject({ message: 'no se encontró ninguna location' });
        } else {
          resolve(locations);
        }
      }).catch(() => { reject({ message: 'no se pudo realizar la busqueda de location' }); });
    });
  }

  static fetch(id) {
    return new Promise((resolve, reject) => {
      Location.findById(id).exec((err, location) => {
        if (err || !location) {
          console.log(err);
          reject({ message: 'No pudo encontrarse la location' });
        } else {
          resolve(location);
        }
      });
    });
  }
}

module.exports = LocationDAO;
