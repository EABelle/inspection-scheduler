
const LocationService = require('../services/LocationService');
const LocationFilter = require('../filters/LocationFilter');


class LocationController {
  static get(req, res) {
    const locationFilter = new LocationFilter();

    const { name, zipCode } = req.query;

    locationFilter.fillData({ name, zipCode });
    LocationService.find(locationFilter.data)
      .then(
        (location) => {
          res.status(200).send(location);
        },
      ).catch((err) => res.status(err.code || 500).send(err.message));
  }
}

module.exports = LocationController;
