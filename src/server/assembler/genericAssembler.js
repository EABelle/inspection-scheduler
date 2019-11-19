'use strict'

class GenericAssembler{
    static convertIn(input, output){
        for(let key of Object.keys(output)){
            if(input[key]){
                output[key] = input[key];
            }
        }
    }
};

module.exports = GenericAssembler;