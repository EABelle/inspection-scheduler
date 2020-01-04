
const Inspector = require('../models/Inspector');

const { addDays } = require('../utils/formatDate');

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
      inspector.save((err, inspector) => {
        if (err) {
          reject(err);
        } else {
          resolve(inspector);
        }
      });
    });
  }

  static deleteCustomDate(id, date) {
    const dtoUpdate = {
      $pull: {
        daysUnlimited: {
          $gte: date,
          $lt: addDays(date, 1),
        },
        daysNotAble: {
          $gte: date,
          $lt: addDays(date, 1),
        },
      },
    };

    return Inspector.findByIdAndUpdate(id, dtoUpdate);
  }

  static setDayUnlimited(id, date) {
    const dtoUpdate = {
      $addToSet: {
        daysUnlimited: date,
      },
      $pull: {
        daysNotAble: {
          $gte: date,
          $lt: addDays(date, 1),
        },
      }
    };
    return Inspector.findByIdAndUpdate(id, dtoUpdate);
  }

  static setDayNotAble(id, date) {
    const dtoUpdate = {
      $addToSet: {
        daysNotAble: date
      },
      $pull: {
        daysUnlimited: {
          $gte: date,
          $lt: addDays(date, 1),
        },
      }
    };

    return Inspector.findByIdAndUpdate(id, dtoUpdate);
  }

  static delete(id) {
    return Inspector.findByIdAndRemove(id);
  }
}

module.exports = InspectorDAO;
