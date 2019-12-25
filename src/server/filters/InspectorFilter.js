
const GenericFilter = require('./GenericFilter');

class InspectorFilter extends GenericFilter {
  constructor() {
    super();
    this.data = Object.assign(this.data, {
      locations: null, // solo es una location, esta en plural para machear con el del dao
    });
  }

  fillData(data) {
    super.fillData(data);
    if (data.locations) {
      this.data.locations = data.locations;
    }
    if (data._id) {
      this.data._id = { $in: data._id };
    }
  }
}

module.exports = InspectorFilter;
