
const GenericModelDTO = require('./GenericModelDTO');

class InspectionDTO extends GenericModelDTO {
  constructor() {
    super();
    this.data = Object.assign(this.data, {
      fecha: null,
      inspector_id: null,
      candidatos: null,
      inspection: null,
      titular: null,
      vehiculo: null,
      observaciones: null,
    });
  }

  hydrate(data) {
    super.hydrate(data);
  }
}

module.exports = InspectionDTO;
