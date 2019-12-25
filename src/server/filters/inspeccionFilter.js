
const GenericFilter = require('./genericFilter');

class InspeccionFilter extends GenericFilter {
  constructor() {
    super();
    this.data = Object.assign(this.data, {
      inspector_id: null,
      fecha: null,
    });
  }

  fillData(data) {
    super.fillData(data);

    if (data.inspectores) {
      this.data.inspector_id = {
        $in: data.inspectores,
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

module.exports = InspeccionFilter;
