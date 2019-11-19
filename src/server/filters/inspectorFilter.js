'use strict'

const GenericFilter = require('./genericFilter');

class InspectorFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  Object.assign(this.data,{
            localidades: null,  //solo es una localidad, esta en plural para machear con el del dao
        })
    }

    fillData(data) {
        super.fillData(data);
        if (data.localidades) {
            this.data.localidades = data.localidades;
        }
        if(data._id) {
            this.data._id = { $in: data._id }
        }
    }
};

module.exports = InspectorFilter;