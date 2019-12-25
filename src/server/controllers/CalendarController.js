
const CalendarService = require('../services/CalendarService');
const InspectorFilter = require('../filters/InspectorFilter');

class CalendarController {
  static get(req, res) {
    const inspectorFilter = new InspectorFilter();

    const { localidad } = req.query;

    inspectorFilter.fillData({ localidades: localidad });

    CalendarService.find(inspectorFilter)
      .then(
        (calendar) => {
          res.send({
            data: calendar,
          });
        },
      ).catch((err) => res.status(err.code || 400).send(err.message));
  }

  static getDaysOnly(req, res) {
    const inspectorFilter = new InspectorFilter();

    const { localidad } = req.query;

    inspectorFilter.fillData({ localidades: localidad });

    CalendarService.findDays(inspectorFilter)
      .then(
        (calendar) => {
          res.send({
            data: calendar,
          });
        },
      ).catch((err) => res.status(err.code || 400).send(err.message));
  }

  static getByIgnoreAvailability(req, res, next) {
    const inspectorFilter = new InspectorFilter();

    const { localidad } = req.query;

    inspectorFilter.fillData({ localidades: localidad });

    CalendarController.resolve(
      next,
      CalendarService.findByIgnoreAvailability(inspectorFilter),
      (calendar) => {
        res.send({
          data: calendar,
        });
      },
    );
  }
}


module.exports = CalendarController;
