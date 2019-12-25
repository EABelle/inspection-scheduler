const LocationDAO = require('../dao/LocationDAO');

class LocationService {
  static get(id) {
    return new Promise((resolve, reject) => {
      LocationDAO.fetch(id)
        .then((location) => resolve(location))
        .catch((err) => {
          reject(err);
        });
    });
  }

  static find(filterData) {
    return new Promise((resolve, reject) => {
      LocationDAO.find(filterData)
        .then(resolve)
        .catch(reject);
    });
  }
}
module.exports = LocationService;
