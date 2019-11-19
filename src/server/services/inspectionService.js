const InspeccionDAO = require('../dao/inspeccionDAO');
const InspeccionFilter = require('../filters/inspeccionFilter');
const InspeccionAssembler = require('../assembler/inspeccionAssembler');

class InspectionService {

    static get(id) {
        return new Promise((resolve, reject) => {
            InspeccionDAO.fetch(id)
                .then(inspeccion => resolve(inspeccion))
                .catch(err => {
                    reject(err)
                })
        })
    }

    static find(filterData) {    
        return new Promise((resolve, reject) => {
            InspeccionDAO.find(filterData)
            .then(resolve)
            .catch(reject)
        })
    }

    static save(inspeccionDTO) {
        let inspeccion = InspeccionAssembler.fromDTO(inspeccionDTO.data);
        return new Promise((resolve, reject) => {
            InspeccionDAO.save(inspeccion)
            .then(inspeccion => resolve(inspeccion))
            .catch(err => reject(err))            
        })
    }

    static update(id, inspeccionDTO, set) {
        return new Promise((resolve, reject) => {
            InspeccionDAO.update(id, inspeccionDTO.getData(), set)
                .then(inspeccion => {
                    resolve(this.get(inspeccion._id))  
                })
                .catch(err => reject(err))
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            InspeccionDAO.delete(id)
                .then(deleted => resolve(deleted))
                .catch(err => reject(err))
        });
    }

    static getInspectionsFromInspectors(inspectores) {
        return new Promise((resolve, reject) => {
            /*if (!inspectores || inspectores.length === 0) {
                resolve([])
            }*/
            const inspeccionFilter = new InspeccionFilter();
            inspeccionFilter.fillData({
                inspectores: inspectores.map(({ _id }) => (_id))
            })
            InspeccionDAO.findWithInspectors(inspectores, inspeccionFilter.filterData())
            .then(resolve)
            .catch(reject)
        })
    }
}

module.exports = InspectionService;