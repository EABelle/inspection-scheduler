
const InspectorService = require('../services/InspectorService');
const InspectorFilter = require('../filters/InspectorFilter');
const InspectorDTO = require('../dto/InspectorDTO');
const CustomDateDTO = require('../dto/CustomDateDTO');


class InspectorController {

  static get(req, res) {
    const inspectorFilter = new InspectorFilter();

    const { location } = req.query;

    inspectorFilter.fillData({ locations: location });

    InspectorService.find(inspectorFilter)
      .then(
        (inspector) => {
          res.status(200).send(inspector);
        },
      ).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static createInspector(req, res) {
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
    InspectorService.update(id, inspectorDTO).then(inspector => {
      res.status(200).send(inspector);
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static addAvailableDate(req, res) {
    const { id } = req.params;
    const customDateDTO = new CustomDateDTO();
    customDateDTO.hydrate(req.body);
    InspectorService.addAvailableDate(id, customDateDTO).then(response => {
      res.status(200).send(response);
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static addUnavailableDate(req, res) {
    const { id } = req.params;
    const customDateDTO = new CustomDateDTO();
    customDateDTO.hydrate(req.body);
    InspectorService.addUnavailableDate(id, customDateDTO).then(response => {
      res.status(200).send(response);
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static deleteCustomDate(req, res) {
    const { id, date } = req.params;
    InspectorService.deleteCustomDate(id, date).then(response => {
      res.status(200).send(response);
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }


  static deleteInspector(req, res) {
    const { id } = req.params;
    InspectorService.delete(id).then((response) => {
      res.status(200).send(response);
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }
}

module.exports = InspectorController;
