
const CalendarService = require('../services/CalendarService');
const InspectorFilter = require('../filters/InspectorFilter');

class CalendarController {

  static get(req, res) {
    const inspectorFilter = new InspectorFilter();

    const { location, onlyAvailableInspectors } = req.query;
    inspectorFilter.fillData({ locations: location });

    CalendarService.find(inspectorFilter, onlyAvailableInspectors === 'true')
      .then(
        (calendar) => {
          res.send(calendar);
        },
      ).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static getDaysOnly(req, res) {
    const inspectorFilter = new InspectorFilter();

    const { location } = req.query;

    inspectorFilter.fillData({ locations: location });

    CalendarService.findDays(inspectorFilter)
      .then(
        (calendar) => {
          res.send(calendar);
        },
      ).catch((err) => res.status(err.code || 500).send(err.message));
  }
}


module.exports = CalendarController;
