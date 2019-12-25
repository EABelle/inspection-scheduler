
const GenericAssembler = require('./GenericAssembler');
const Inspector = require('../models/Inspector');

class InspectorAssembler extends GenericAssembler {
  static fromDTO(inspectorDTO) {
    let inspector = new Inspector();
    GenericAssembler.convertIn(inspectorDTO, inspector);
    inspector = { inspector, ...inspectorDTO };
    return inspector;
  }
}

module.exports = InspectorAssembler;
