
const GenericFilter = require('./genericFilter');

class InspectorFilter extends GenericFilter {
  constructor() {
    super();
    this.data = {};
  }

  fillData(data) {
    super.fillData(data);
    if (data.nombre) {
      this.data.nombre = data.nombre;
    }
    if (data.cp) {
      this.data.cp = data.cp;
    }
  }
}

module.exports = InspectorFilter;
