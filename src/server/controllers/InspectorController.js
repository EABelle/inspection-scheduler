
const InspectorService = require('../services/InspectorService');
const InspectorFilter = require('../filters/InspectorFilter');
const InspectorDTO = require('../dto/InspectorDTO');


class InspectorController {
  static get(req, res) {
    const inspectorFilter = new InspectorFilter();

    const { location } = req.query;

    inspectorFilter.fillData({ locations: location });

    InspectorService.find(inspectorFilter)
      .then(
        (inspector) => {
          res.status(200).send({
            data: inspector,
          });
        },
      ).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static post(req, res) {
    const inspectorDTO = new InspectorDTO();
    inspectorDTO.hydrate(req.body);
    InspectorService.save(inspectorDTO).then((inspector) => {
      res.status(200).send(inspector);
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static getInspector(req, res) {
    const { id } = req.params;
    InspectorService.get(id).then(inspector => {
      res.status(200).send(inspector);
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static updateInspector(req, res) {
    const { id } = req.params;
    const inspectorDTO = new InspectorDTO();
    inspectorDTO.hydrate(req.body);
    InspectorService.update(id, inspectorDTO, req.body.set).then(inspector => {
      res.status(200).send(inspector);
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static deleteInspector(req, res, next) {
    const { id } = req.params;
    InspectorController.resolve(next, InspectorService.delete(id), (message) => {
      res.status(200).send({
        data: message,
      });
    });
  }
}

module.exports = InspectorController;
