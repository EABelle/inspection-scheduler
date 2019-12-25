
const LocalidadService = require('../services/LocationService');
const LocalidadFilter = require('../filters/LocationFilter');


class LocationController {
  static get(req, res) {
    const localidadFilter = new LocalidadFilter();

    const { nombre, cp } = req.query;

    localidadFilter.fillData({ nombre, cp });
    LocalidadService.find(localidadFilter.data)
      .then(
        (localidad) => {
          res.status(200).send({
            data: localidad,
          });
        },
      ).catch((err) => res.status(err.code || 400).send(err.message));
  }
}

module.exports = LocationController;
