'use strict'

const GenericModelDTO = require('./genericModelDTO');

class UserDTO extends GenericModelDTO {
    constructor(){
        super();
        this.data = Object.assign(this.data, {
            username: null,
            password: null,
        })
    }

    hydrate(data){
        super.hydrate(data);
    }
};

module.exports = UserDTO;