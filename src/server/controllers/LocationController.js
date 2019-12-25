
const LocationService = require('../services/LocationService');
const LocationFilter = require('../filters/LocationFilter');


class LocationController {
  static get(req, res) {
    const locationFilter = new LocationFilter();

    const { nombre, cp } = req.query;

    locationFilter.fillData({ nombre, cp });
    LocationService.find(locationFilter.data)
      .then(
        (location) => {
          res.status(200).send({
            data: location,
          });
        },
      ).catch((err) => res.status(err.code || 400).send(err.message));
  }
}

module.exports = LocationController;
