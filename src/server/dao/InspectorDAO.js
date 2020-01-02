
const Inspector = require('../models/Inspector');

const { addDays, buildDate, transformDateString } = require('../utils/formatDate');

class InspectorDAO {
  static find(filter) {
    const query = !filter.locations && !filter.id ? undefined : filter;
    return Inspector.find(query);
  }

  static findById(id) {
    return Inspector.findById(id);
  }

  static save(inspectorData) {
    return new Promise((resolve, reject) => {
      const inspector = new Inspector(inspectorData);
      const { daysUnlimited, daysNotAble } = inspector;
      inspector.daysUnlimited = daysUnlimited.map((date) => (buildDate(transformDateString(date))));
      inspector.daysNotAble = daysNotAble.map((date) => (buildDate(transformDateString(date))));
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
      inspector.daysUnlimited || inspector.daysNotAble
    ) {
      const action = inspector.daysUnlimited ? 'daysUnlimited' : 'daysNotAble';
      dtoUpdate = {
        [directive]: {
          [action]: set
            ? buildDate(inspector[action])
            : {
              $gte: buildDate(inspector[action]),
              $lt: buildDate(addDays(inspector[action], 1)),
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
    return Inspector.findByIdAndRemove(id);
  }
}

module.exports = InspectorDAO;
