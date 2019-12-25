
const Inspection = require('../models/Inspection');

class InspectionDAO {
  static find(filter) {
    return new Promise((resolve, reject) => {
      Inspection.find(filter).then((inspections) => {
        resolve(inspections);
      }).catch((err) => {reject(err)}); });
    }

  static findWithInspectors(inspectors, filter) {
    return new Promise((resolve, reject) => {
      Inspection.find(filter).then((inspections) => {
        resolve([inspectors, inspections]);
      }).catch((err) => { reject(err); }); });
    }

  static fetch(id) {
    return new Promise((resolve, reject) => {
      Inspection.findById(id).exec((err, inspection) => {
        if (err) {
          reject(err);
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
