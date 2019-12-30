
const GenericModelDTO = require('./GenericModelDTO');

class InspectorDTO extends GenericModelDTO {
  constructor() {
    super();
    this.data = Object.assign(this.data, {
      locations: null,
      fullName: null,
      workingArea: null,
      times: null,
      maximumPerDay: null,
      daysUnlimited: null,
      daysNotAble: null,
    });
  }

  hydrate(data) {
    super.hydrate(data);
  }
}

module.exports = InspectorDTO;
