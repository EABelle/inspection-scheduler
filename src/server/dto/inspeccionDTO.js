'use strict'

const GenericModelDTO = require('./genericModelDTO');

class InspeccionDTO extends GenericModelDTO {
    constructor(){
        super();
        this.data = Object.assign(this.data, {
            fecha: null,
            inspector_id: null,
            candidatos: null,
            inspeccion: null,
            titular: null,
            vehiculo: null,
            observaciones: null,
            inspeccion: null
        })
    }

    hydrate(data){
        super.hydrate(data);
    }
};

module.exports = InspeccionDTO;