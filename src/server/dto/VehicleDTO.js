const GenericModelDTO = require('./GenericModelDTO');

class VehicleDTO extends GenericModelDTO {
    constructor() {
        super();
        this.data = Object.assign(this.data, {
            domain: null,
            brand: null,
            model: null,
            year: null,
            type: null,
            chassisNumber: null,
            motorNumber: null,
            km: null,
            fuelType: null
        });
    }

    hydrate(data) {
        super.hydrate(data);
    }
}

module.exports = VehicleDTO;
