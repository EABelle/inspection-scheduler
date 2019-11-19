'use strict'

let GenericAssembler = require('./genericAssembler');
let Inspeccion = require('../models/inspeccion');
let InspeccionDTO = require('../dto/inspeccionDTO')
class InspeccionAssembler extends GenericAssembler{
    static fromDTO(inspeccionDTO){
        let inspeccion = new Inspeccion();
        GenericAssembler.convertIn(inspeccionDTO, inspeccion);
        inspeccion = { inspeccion, ...inspeccionDTO }
        return inspeccion;
    } 
};

module.exports = InspeccionAssembler