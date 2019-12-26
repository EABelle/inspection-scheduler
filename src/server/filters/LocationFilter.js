
const GenericFilter = require('./GenericFilter');

class InspectorFilter extends GenericFilter {
  constructor() {
    super();
    this.data = {};
  }

  fillData(data) {
    super.fillData(data);
    if (data.name) {
      this.data.name = data.name;
    }
    if (data.zipCode) {
      this.data.zipCode = data.zipCode;
    }
  }
}

module.exports = InspectorFilter;
