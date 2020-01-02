
const AgendaService = require('../services/AgendaService');
const InspectorFilter = require('../filters/InspectorFilter');

const { isValidDate } = require('../utils/validate');

class AgendaController {
  static schedule(req, res) {
    const data = req.body;


    if (!isValidDate(data.meetingDetails.date)) {
      res.status(400).send({ message: 'Not valid date' });
    }

    const inspectorFilter = new InspectorFilter();
    inspectorFilter.fillData({ locations: data.meetingDetails.city });

    AgendaService.save(data, inspectorFilter)
      .then((inspection) => {
        res.status(200).send(inspection)
      }).catch((err) => res.status(err.code || 500).send(err.message));
  }
}

module.exports = AgendaController;
