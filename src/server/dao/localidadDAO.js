
const Localidad = require('../models/localidad');

class LocalidadDAO {
  static find(filter) {
    return new Promise((resolve, reject) => {
      const query = filter && filter.cp && filter.nombre ? { $or: [{ cp: filter.cp }, { nombre: filter.nombre }] } : filter;
      console.log(query);
      Localidad.find(query).then((localidades) => {
        if (!localidades) {
          reject({ message: 'no se encontró ninguna localidad' });
        } else {
          resolve(localidades);
        }
      }).catch(() => { reject({ message: 'no se pudo realizar la busqueda de localidad' }); });
    });
  }

  static fetch(id) {
    return new Promise((resolve, reject) => {
      Localidad.findById(id).exec((err, localidad) => {
        if (err || !localidad) {
          console.log(err);
          reject({ message: 'No pudo encontrarse la localidad' });
        } else {
          resolve(localidad);
        }
      });
    });
  }
}

module.exports = LocalidadDAO;
