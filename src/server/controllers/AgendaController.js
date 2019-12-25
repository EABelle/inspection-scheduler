
const AgendaService = require('../services/AgendaService');
const InspectorFilter = require('../filters/InspectorFilter');

const { isValidDate } = require('../utils/validate');
const { transformDateString } = require('../utils/formatDate');

class AgendaController {
  static schedule(req, res) {
    const data = req.body;


    if (!isValidDate(data.inspection.dia)) {
      res.status(400).send({ message: 'Not valid date' });
    }

    data.inspection.dia = transformDateString(data.inspection.dia);

    const inspectorFilter = new InspectorFilter();
    inspectorFilter.fillData({ locations: data.inspection.location });


    AgendaService.save(data, inspectorFilter)
      .then((inspection) => {
        res.status(201).send({
          data: inspection,
        });
      })
      .catch((err) => res.status(err.code || 400).send(err.message));
  }
}

module.exports = AgendaController;
