
const GenericModelDTO = require('./GenericModelDTO');

class InspectionDTO extends GenericModelDTO {
  constructor() {
    super();
    this.data = Object.assign(this.data, {
      date: null,
      inspectorId: null,
      candidates: null,
      inspection: null,
      owner: null,
      vehicle: null,
      comments: null,
    });
  }

  hydrate(data) {
    super.hydrate(data);
  }
}

module.exports = InspectionDTO;
