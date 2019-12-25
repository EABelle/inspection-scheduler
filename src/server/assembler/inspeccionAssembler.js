
const GenericAssembler = require('./genericAssembler');
const Inspeccion = require('../models/inspeccion');

class InspeccionAssembler extends GenericAssembler {
  static fromDTO(inspeccionDTO) {
    let inspeccion = new Inspeccion();
    GenericAssembler.convertIn(inspeccionDTO, inspeccion);
    inspeccion = { inspeccion, ...inspeccionDTO };
    return inspeccion;
  }
}

module.exports = InspeccionAssembler;
