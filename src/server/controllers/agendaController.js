
const AgendaService = require('../services/agendaService');
const InspectorFilter = require('../filters/inspectorFilter');

const { isValidDate } = require('../utils/validate');
const { transformDateString } = require('../utils/formatDate');

class AgendaController {
  static agendar(req, res) {
    const data = req.body;


    if (!isValidDate(data.inspeccion.dia)) {
      res.status(400).send({ message: 'Not valid date' });
    }

    data.inspeccion.dia = transformDateString(data.inspeccion.dia);

    const inspectorFilter = new InspectorFilter();
    inspectorFilter.fillData({ localidades: data.inspeccion.localidad });


    AgendaService.save(data, inspectorFilter)
      .then((inspeccion) => {
        res.status(201).send({
          data: inspeccion,
        });
      })
      .catch((err) => res.status(err.code || 400).send(err.message));
  }
}

module.exports = AgendaController;
