const InspectionService = require('./inspectionService');
const InspectorDAO = require('../dao/inspectorDAO');
const InspectorFilter = require('../filters/inspectorFilter');
const { formatDate, matchDate } = require('../utils/formatDate');
const InspectorAssembler = require('../assembler/inspectorAssembler');

class InspectorService {

    static get(id) {
        return new Promise((resolve, reject) => {
            InspectorDAO.fetch(id)
                .then(inspector => resolve(inspector))
                .catch(err => {
                    reject(err)
                })
        })
    }

    static find(filterData) {    
        return new Promise((resolve, reject) => {
            InspectorDAO.find(filterData)
            .then(resolve)
            .catch(reject)
        })
    }

    static formatDay(dayString) {
       
        let dayObject = {
            [dayString]: {
                inspectores: {}
            }
        }
        
        return dayObject;
    }

    static findAvailableInspector(day, localidad, inspectores_id, inspecciones) {
        
        return new Promise((resolve, reject) => {
            let dayObject = this.formatDay(day)
            const inspectorFilter = new InspectorFilter;
            inspectorFilter.fillData({localidades: localidad, _id: inspectores_id})
            this.find(inspectorFilter.filterData())
            .then((inspectores) => {            
                let assignedInspector = null;
                inspectores.forEach( inspector => {
                    inspector = inspector.toJSON()
                    let maximo = inspector.maximo
                    
                    if(!inspector.inhabilitar.find(fecha =>
                        matchDate(formatDate(fecha), day)
                    )) {
                        if(inspector.habilitar.find(fecha =>
                            matchDate(formatDate(fecha), day)
                        )) {
                            assignedInspector = inspector._id
                        }
                        inspecciones.forEach(({inspector_id, fecha}) => {
                            if(matchDate(formatDate(fecha), day) && inspector_id == inspector._id) {
                                maximo --;
                            }
                        })
                        
                        if (maximo > 0) {
                            assignedInspector = inspector._id
                        }
                    }
                })        
                return {
                    inspectorDisponible: assignedInspector, 
                    candidatos: inspectores_id.map(({_id}) => (_id))
                };
            })
            .then(resolve)
            .catch(reject)
        }) 
    }

    static isSomeoneAvailable(inspectores, localidad, dia) {
        return new Promise((resolve, reject) => {
            InspectionService.getInspectionsFromInspectors(inspectores)
            .then(([inspectores, inspecciones]) => this.findAvailableInspector(dia, localidad, inspectores, inspecciones))
            .then(resolve)
            .catch(reject)
        })
    }

    static save(inspectorDTO) {
        let inspector = InspectorAssembler.fromDTO(inspectorDTO.data);
        return new Promise((resolve, reject) => {
            InspectorDAO.save(inspector)
            .then(inspector => resolve(inspector))
            .catch(err => reject(err))            
        })
    }

    static update(id, inspectorDTO, set) {
        return new Promise((resolve, reject) => {
            InspectorDAO.update(id, inspectorDTO.getData(), set)
                .then(inspector => {
                    resolve(this.get(inspector._id))  
                })
                .catch(err => reject(err))
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            InspectorDAO.delete(id)
                .then(deleted => resolve(deleted))
                .catch(err => reject(err))
        });
    }
}

module.exports = InspectorService;