const GenericModelDTO = require('./GenericModelDTO');

class MeetingDetailsDTO extends GenericModelDTO {
    constructor() {
        super();
        this.data = Object.assign(this.data, {
            address: null,
            zipCode: null,
            city: null,
            workingArea: null,
            date: null,
            time: null
        });
    }

    hydrate(data) {
        super.hydrate(data);
    }
}

module.exports = MeetingDetailsDTO;
