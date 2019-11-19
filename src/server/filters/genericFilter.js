'use strict'

var validator = require('../utils/validate.js')

class GenericFilter{
    constructor(){
        this.data = {
        }
    }

    fillData(data){
        for(let key of Object.keys(this.data)){
            if(validator.validKey(data[key])){
                this.data[key] = data[key];
            }
        }
    }

    filterData(){
        let filterData = {};
        for(let key of Object.keys(this.data)){
            if (validator.validKey(this.data[key])){
                filterData[key] = this.data[key];
            }
        }
        return filterData;
    }

};

module.exports = GenericFilter;