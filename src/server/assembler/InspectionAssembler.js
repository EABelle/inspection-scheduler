
const GenericAssembler = require('./GenericAssembler');
const Inspection = require('../models/Inspection');

class InspectionAssembler extends GenericAssembler {
  static fromDTO(inspectionDTO) {
    let inspection = new Inspection();
    GenericAssembler.convertIn(inspectionDTO, inspection);
    inspection = { inspection, ...inspectionDTO };
    return inspection;
  }
}

module.exports = InspectionAssembler;
