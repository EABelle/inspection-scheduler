
const InspectionService = require('../services/InspectionService');
const InspectionsFilter = require('../filters/InspectionsFilter');
const InspectionDTO = require('../dto/InspectionDTO');


class InspectionController {
  static get(req, res) {
    const inspectionsFilter = new InspectionsFilter();

    const {
      localidad, day, month, year,
    } = req.query;

    inspectionsFilter.fillData({
      localidad, day, month, year,
    });
    InspectionService.find(inspectionsFilter.data)
      .then(
        (inspections) => {
          res.status(200).send({
            data: inspections,
          });
        },
      ).catch((err) => res.status(err.code || 400).send(err.message));
  }

  static post(req, res, next) {
    const inspectionDTO = new InspectionDTO();
    inspectionDTO.hydrate(req.body);
    InspectionController.resolve(next, InspectionService.save(inspectionDTO), (inspection) => {
      res.status(201).send({
        data: inspection,
      });
    });
  }

  static getInspection(req, res, next) {
    const { id } = req.params;
    InspectionController.resolve(next, InspectionService.get(id), (inspection) => {
      res.status(200).send({
        data: inspection,
      });
    });
  }

  static updateInspection(req, res, next) {
    const { id } = req.params;
    const inspectionDTO = new InspectionDTO();
    inspectionDTO.hydrate(req.body);
    InspectionController.resolve(
      next,
      InspectionService.update(id, inspectionDTO, req.body.set),
      (inspection) => {
        res.status(200).send({
          data: inspection,
        });
      },
    );
  }

  static deleteInspection(req, res, next) {
    const { id } = req.params;
    InspectionController.resolve(next, InspectionService.delete(id), (message) => {
      res.status(200).send({
        data: message,
      });
    });
  }
}

module.exports = InspectionController;
