
const Location = require('../models/Location');

class LocationDAO {

  static find(filter) {
    const query = filter && filter.zipCode && filter.name ? { $or: [{ zipCode: filter.zipCode }, { zipCode: filter.zipCode }] } : filter;
    return Location.find(query);
  }

  static findById(id) {
    return Location.findById(id);
  }
}

module.exports = LocationDAO;
