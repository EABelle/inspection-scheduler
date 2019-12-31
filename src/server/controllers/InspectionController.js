const InspectionService = require('../services/InspectionService');
const InspectionsFilter = require('../filters/InspectionsFilter');
const InspectionDTO = require('../dto/InspectionDTO');
const buildDate = require('../utils/formatDate').buildDate;

class InspectionController {
  static get(req, res) {
    const inspectionsFilter = new InspectionsFilter();

    const {
      location, day, month, year,
    } = req.query;

    inspectionsFilter.fillData({
      location, day, month, year,
    });
    InspectionService.find(inspectionsFilter.data)
      .then(
        (inspections) => {
          res.status(200).send(inspections);
        },
      ).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static post(req, res) {
    const inspectionDTO = new InspectionDTO();
    const { date, time } = req.body.meetingDetails;
    inspectionDTO.hydrate({...req.body, date: buildDate(date, time)});
    InspectionService.save(inspectionDTO).then((inspection) => {
      res.status(200).send(inspection);
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static getInspection(req, res) {
    const { id } = req.params;
    InspectionService.get(id).then((inspection) => {
      res.status(200).send(inspection);
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static updateInspection(req, res) {
    const { id } = req.params;
    const inspectionDTO = new InspectionDTO();
    inspectionDTO.hydrate(req.body);
    InspectionService.update(id, inspectionDTO, req.body.set).then(
      (inspection) => {
        res.status(200).send(inspection);
      }).catch((err) => res.status(err.code || 500).send(err.message));
  }

  static deleteInspection(req, res, ) {
    const { id } = req.params;
    InspectionService.delete(id).then((message) => {
      res.status(200).send({
        message: message,
      });
    }).catch((err) => res.status(err.code || 500).send(err.message));
  }
}

module.exports = InspectionController;
