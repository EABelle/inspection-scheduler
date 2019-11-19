'use strict'

let GenericAssembler = require('./genericAssembler');
let Inspector = require('../models/inspector');
let InspectorDTO = require('../dto/inspectorDTO')
class InspectorAssembler extends GenericAssembler{
    static fromDTO(inspectorDTO){
        let inspector = new Inspector();
        GenericAssembler.convertIn(inspectorDTO, inspector);
        inspector = { inspector, ...inspectorDTO }
        return inspector;
    } 
};

module.exports = InspectorAssembler