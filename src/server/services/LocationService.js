const LocationDAO = require('../dao/LocationDAO');

class LocationService {

  static async get(id) {
    return await LocationDAO.fetch(id);
  }

  static async find(filterData) {
    return await LocationDAO.find(filterData);
  }
}
module.exports = LocationService;
