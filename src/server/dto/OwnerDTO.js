const GenericModelDTO = require('./GenericModelDTO');

class OwnerDTO extends GenericModelDTO {
    constructor() {
        super();
        this.data = Object.assign(this.data, {
            firstName: null,
            lastName: null,
            phone1: null,
            phone2: null,
        });
    }

    hydrate(data) {
        super.hydrate(data);
    }
}

module.exports = OwnerDTO;
