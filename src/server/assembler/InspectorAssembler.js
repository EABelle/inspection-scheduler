const GenericAssembler = require('./GenericAssembler');
const Inspector = require('../models/Inspector');
const { buildDate, transformDateString } = require('../utils/formatDate');

class InspectorAssembler extends GenericAssembler {
  static fromDTO(inspectorDTO) {
    let inspector = new Inspector();
    GenericAssembler.convertIn(inspectorDTO, inspector);
    inspector = { inspector, ...inspectorDTO };
    inspector.daysUnlimited = daysUnlimited.map((date) => (buildDate(transformDateString(date))));
    inspector.daysNotAble = daysNotAble.map((date) => (buildDate(transformDateString(date))));
    return inspector;
  }
}

module.exports = InspectorAssembler;
