const LocalidadDAO = require('../dao/localidadDAO');
const LocalidadFilter = require('../filters/localidadFilter');

class LocalidadService {

    static get(id) {
        return new Promise((resolve, reject) => {
            LocalidadDAO.fetch(id)
                .then(localidad => resolve(localidad))
                .catch(err => {
                    reject(err)
                })
        })
    }

    static find(filterData) {    
        return new Promise((resolve, reject) => {
            LocalidadDAO.find(filterData)
            .then(resolve)
            .catch(reject)
        })
    }
}
module.exports = LocalidadService;