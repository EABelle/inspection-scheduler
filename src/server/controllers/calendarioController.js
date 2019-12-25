
const CalendarioService = require('../services/calendarioService');
const InspectorFilter = require('../filters/inspectorFilter');

class CalendarioController {
  static get(req, res) {
    const inspectorFilter = new InspectorFilter();

    const { localidad } = req.query;

    inspectorFilter.fillData({ localidades: localidad });

    CalendarioService.find(inspectorFilter)
      .then(
        (calendario) => {
          res.send({
            data: calendario,
          });
        },
      ).catch((err) => res.status(err.code || 400).send(err.message));
  }

  static getDaysOnly(req, res) {
    const inspectorFilter = new InspectorFilter();

    const { localidad } = req.query;

    inspectorFilter.fillData({ localidades: localidad });

    CalendarioService.findDays(inspectorFilter)
      .then(
        (calendario) => {
          res.send({
            data: calendario,
          });
        },
      ).catch((err) => res.status(err.code || 400).send(err.message));
  }

  static getByIgnoreAvailability(req, res, next) {
    const inspectorFilter = new InspectorFilter();

    const { localidad } = req.query;

    inspectorFilter.fillData({ localidades: localidad });

    CalendarioController.resolve(
      next,
      CalendarioService.findByIgnoreAvailability(inspectorFilter),
      (calendario) => {
        res.send({
          data: calendario,
        });
      },
    );
  }
}


module.exports = CalendarioController;
