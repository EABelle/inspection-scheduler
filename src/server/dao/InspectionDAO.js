
const Inspection = require('../models/Inspection');

class InspectionDAO {

  static find(filter) {
    return Inspection.find(filter);
  }

  static findById(id) {
    return Inspection.findById(id);
  }

  static save(inspectionData) {
    return new Promise((resolve, reject) => {
      const inspection = new Inspection(inspectionData);
      inspection.save((err, inspection) => {
        if (err) {
          reject(err);
        } else {
          const {
            _id, candidates, inspector_id, __v, ...rest
          } = inspection.toJSON();
          resolve(rest);
        }
      });
    });
  }
}

module.exports = InspectionDAO;
