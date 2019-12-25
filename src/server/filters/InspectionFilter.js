
const GenericFilter = require('./GenericFilter');

class InspectionFilter extends GenericFilter {
  constructor() {
    super();
    this.data = Object.assign(this.data, {
      inspector_id: null,
      fecha: null,
    });
  }

  fillData(data) {
    super.fillData(data);

    if (data.inspectors) {
      this.data.inspector_id = {
        $in: data.inspectors,
      };
    }

    if (data.fecha) {
      this.data.fecha = {
        $in: data.fecha,
      };
    } else {
      const fromFecha = new Date();
      const lastFecha = new Date(fromFecha);
      lastFecha.setDate(fromFecha.getDate() + 5);

      this.data.fecha = {
        $gte: fromFecha,
        $lt: lastFecha,
      };
    }
  }
}

module.exports = InspectionFilter;
