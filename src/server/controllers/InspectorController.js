
const InspectorService = require('../services/inspectorService');
const InspectorFilter = require('../filters/InspectorFilter');
const InspectorDTO = require('../dto/InspectorDTO');


class InspectorController {
  static get(req, res) {
    const inspectorFilter = new InspectorFilter();

    const { localidad } = req.query;

    inspectorFilter.fillData({ localidades: localidad });

    InspectorService.find(inspectorFilter)
      .then(
        (inspector) => {
          res.status(200).send({
            data: inspector,
          });
        },
      ).catch((err) => res.status(err.code || 400).send(err.message));
  }

  static post(req, res, next) {
    const inspectorDTO = new InspectorDTO();
    inspectorDTO.hydrate(req.body);
    InspectorController.resolve(next, InspectorService.save(inspectorDTO), (inspector) => {
      res.status(201).send({
        data: inspector,
      });
    });
  }

  static getInspector(req, res, next) {
    const { id } = req.params;
    InspectorController.resolve(next, InspectorService.get(id), (inspector) => {
      res.status(200).send({
        data: inspector,
      });
    });
  }

  static updateInspector(req, res, next) {
    const { id } = req.params;
    const inspectorDTO = new InspectorDTO();
    inspectorDTO.hydrate(req.body);
    InspectorController.resolve(next, InspectorService.update(id, inspectorDTO, req.body.set), (inspector) => {
      res.status(200).send({
        data: inspector,
      });
    });
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
