
const CalendarService = require('../services/CalendarService');
const InspectorFilter = require('../filters/InspectorFilter');

class CalendarController {
  static get(req, res) {
    const inspectorFilter = new InspectorFilter();

    const { location } = req.query;

    inspectorFilter.fillData({ locations: location });

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

    const { location } = req.query;

    inspectorFilter.fillData({ locations: location });

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

    const { location } = req.query;

    inspectorFilter.fillData({ locations: location });

    CalendarService.findByIgnoreAvailability(inspectorFilter).then(
      (calendar) => {
        res.send({
          data: calendar,
        });
      },
    );
  }
}


module.exports = CalendarController;
