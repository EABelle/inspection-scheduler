'use strict'

var validator = require('../utils/validate.js')

class GenericModelDTO{
    constructor() {
        this.data = {}
    }

    hydrate(data){
        for(let key of Object.keys(this.data)){
            if(data[key]){
                this.data[key] = data[key];
            }            
        }
    }

    getData(){
        let validData = {};
        for(let key of Object.keys(this.data)){
            if (validator.validKey(this.data[key])){
                validData[key] = this.data[key];
            }
        }
        return validData;
    }
};

module.exports = GenericModelDTO;