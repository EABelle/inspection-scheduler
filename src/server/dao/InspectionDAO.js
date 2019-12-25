
const Inspection = require('../models/Inspection');

class InspectionDAO {
  static find(filter) {
    return new Promise((resolve, reject) => {
      Inspection.find(filter).then((inspections) => {
        if (!inspections) {
          reject({ message: 'no se encontró ninguna inspección' });
        } else {
          resolve(inspections);
        }
      }).catch(() => { reject({ message: 'no se pudo realizar la busqueda de inspección' }); });
    });
  }

  static findWithInspectors(inspectors, filter) {
    return new Promise((resolve, reject) => {
      Inspection.find(filter).then((inspections) => {
        if (!inspections) {
          reject({ message: 'no se encontró ninguna inspección' });
        } else {
          resolve([inspectors, inspections]);
        }
      }).catch(() => { reject({ message: 'no se pudo realizar la busqueda de inspección' }); });
    });
  }

  static fetch(id) {
    return new Promise((resolve, reject) => {
      Inspection.findById(id).exec((err, inspection) => {
        if (err || !inspection) {
          console.log(err);
          reject({ message: 'No pudo encontrarse la inspection' });
        } else {
          resolve(inspection);
        }
      });
    });
  }

  static save(inspectionData) {
    return new Promise((resolve, reject) => {
      const inspection = new Inspection(inspectionData);
      inspection.save((err, inspection) => {
        if (err || !inspection) {
          console.log(err);
          reject({ message: 'no pudo guardarse la inspección' });
        } else {
          const {
            _id, candidatos, inspector_id, __v, ...rest
          } = inspection.toJSON();
          resolve(rest);
        }
      });
    });
  }
}

module.exports = InspectionDAO;
