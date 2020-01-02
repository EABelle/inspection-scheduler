const LocationDAO = require('../dao/LocationDAO');

class LocationService {

  static async get(id) {
    return await LocationDAO.findById(id);
  }

  static async find(filterData) {
    return await LocationDAO.find(filterData);
  }
}
module.exports = LocationService;
