'use strict'

const GenericFilter = require('./genericFilter');
var validator = require('../utils/validate.js')

class InspeccionesFilter extends GenericFilter {
    constructor() {
        super();
        this.data = {}
    }

    fillData(data) {
        super.fillData(data);

        if (data.inspectores) {

            this.data.inspector_id = {
                $in: data.inspectores
            }
        }

        if(data.day && data.month && data.year) {
            let fromFecha = new Date()
            fromFecha.setDate(data.day);
            fromFecha.setMonth(parseInt(data.month) - 1);
            fromFecha.setFullYear(data.year);
            fromFecha.setHours(0, 0, 0, 0)
            
            let lastFecha = new Date(fromFecha);
            lastFecha.setDate(fromFecha.getDate() + 1);
            
            this.data.fecha = {
                $gte: fromFecha,
                $lt: lastFecha
            };
        } 
    }
};

module.exports = InspeccionesFilter;