const GenericModelDTO = require('./GenericModelDTO');

class CustomDateDTO extends GenericModelDTO {
    constructor() {
        super();
        this.data = Object.assign(this.data, {
            date: null,
        });
    }

    hydrate(data) {
        super.hydrate(data);
    }
}

module.exports = CustomDateDTO;
