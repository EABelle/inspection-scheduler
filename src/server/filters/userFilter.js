'use strict'

const GenericFilter = require('./genericFilter');

class UserFilter extends GenericFilter{
    constructor(){
        super();
        this.data =  {}
    }

    fillData(data) {
        super.fillData(data);
        if (data.username) {
            this.data.username = data.username;
        }
        if(data.password) {
            // this.data.password = data.password.toUpperCase()
            this.data.password = data.password
        }
    }
};

module.exports = UserFilter;