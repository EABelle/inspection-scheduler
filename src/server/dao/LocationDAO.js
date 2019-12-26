
const Location = require('../models/Location');

class LocationDAO {

  static async find(filter) {
    const query = filter && filter.zipCode && filter.name ? { $or: [{ zipCode: filter.zipCode }, { zipCode: filter.zipCode }] } : filter;
    return await Location.find(query);
  }

  static async fetch(id) {
    return await Location.findById(id);
  }
}

module.exports = LocationDAO;
