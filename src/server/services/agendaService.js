'use strict'

const Agenda = require('../models/inspeccion');
const InspeccionDAO = require('../dao/inspeccionDAO')
const InspeccionDTO = require('../dto/inspeccionDTO');
const InspectorDAO = require('../dao/inspectorDAO')
const InspeccionAssembler = require('../assembler/inspeccionAssembler');
const FileSystemManager = require('../utils/fileSystemManager');
const InspectorService = require('./inspectorService');
const { buildDate } = require('../utils/formatDate');

class AgendaService {

    static save(inspeccionData, inspectorFilter) {
        return new Promise((resolve, reject) => {
            let inspeccionDTO = new InspeccionDTO();
            InspectorDAO.find(inspectorFilter.filterData())
            .then(inspectores => {
                if(inspectores.length === 0) {
                    throw ({message: 'no hay disponibilidad'})
                }
                return(inspectores)
            })
            .then(inspectores => InspectorService.isSomeoneAvailable(inspectores, inspeccionData.inspeccion.localidad, inspeccionData.inspeccion.dia))
            .then(({inspectorDisponible, candidatos}) => {
                if(!inspectorDisponible) {
                    reject(() => ({message: 'no hay disponibilidad'}))
                }
                inspeccionData = {
                    ...inspeccionData,
                    candidatos: candidatos,
                    inspector_id: inspectorDisponible,
                    fecha: buildDate(inspeccionData.inspeccion.dia, inspeccionData.inspeccion.horario)
                }
                inspeccionDTO.hydrate(inspeccionData)
                let inspeccion = InspeccionAssembler.fromDTO(inspeccionDTO.data);
                return inspeccion              
            })
            .then(inspeccion => InspeccionDAO.save(inspeccion))
            .then(resolve)
            .catch(reject)
        })
    }
    
}
module.exports = AgendaService