
const GenericAssembler = require('./genericAssembler');
const Inspector = require('../models/inspector');

class InspectorAssembler extends GenericAssembler {
  static fromDTO(inspectorDTO) {
    let inspector = new Inspector();
    GenericAssembler.convertIn(inspectorDTO, inspector);
    inspector = { inspector, ...inspectorDTO };
    return inspector;
  }
}

module.exports = InspectorAssembler;
