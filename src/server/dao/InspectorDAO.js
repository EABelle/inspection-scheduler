
const Inspector = require('../models/Inspector');

const { addDays, buildDate, transformDateString } = require('../utils/formatDate');

class InspectorDAO {
  static find(filter) {
    return new Promise((resolve, reject) => {
      const query = !filter.locations && !filter.id ? undefined : filter;
      Inspector.find(query)
        .then((inspectors) => {
            resolve(inspectors);
        })
        .catch((error) => { reject(error); });
    });
  }

  static fetch(id) {
    return new Promise((resolve, reject) => {
      Inspector.findById(id).exec((err, inspector) => {
        if (err) {
          reject(err);
        } else {
          resolve(inspector);
        }
      });
    });
  }

  static save(inspectorData) {
    return new Promise((resolve, reject) => {
      const inspector = new Inspector(inspectorData);
      const { habilitar, inhabilitar } = inspector;
      inspector.habilitar = habilitar.map((date) => (buildDate(transformDateString(date))));
      inspector.inhabilitar = inhabilitar.map((date) => (buildDate(transformDateString(date))));
      inspector.save((err, inspector) => {
        if (err) {
          reject(err);
        } else {
          resolve(inspector);
        }
      });
    });
  }

  static update(id, inspector, set) {
    let dtoUpdate = { $set: inspector };
    let directive = '$pull';
    if (set) {
      directive = '$addToSet';
    }
    if (
      inspector.habilitar || inspector.inhabilitar
    ) {
      const action = inspector.habilitar ? 'habilitar' : 'inhabilitar';
      dtoUpdate = {
        [directive]: {
          [action]: set
            ? buildDate(transformDateString(inspector[action]))
            : {
              $gte: buildDate(transformDateString(inspector[action])),
              $lt: buildDate(transformDateString(addDays(inspector[action], 1))),
            },
        },
      };
    }

    return new Promise((resolve, reject) => {
      Inspector.findByIdAndUpdate(id, dtoUpdate).exec((err, inspector2) => {
        if (err) {
          reject(err);
        } else {
          resolve(inspector2);
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      Inspector.findByIdAndRemove(id).exec((err, deleted) => {
        if (err) {
          reject(err);
        } else {
          resolve(deleted);
        }
      });
    });
  }
}

module.exports = InspectorDAO;
