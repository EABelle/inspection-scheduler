
const GenericFilter = require('./GenericFilter');

class InspectionsFilter extends GenericFilter {
  constructor() {
    super();
    this.data = {};
  }

  fillData(data) {
    super.fillData(data);

    if (data.inspectors) {
      this.data.inspector_id = {
        $in: data.inspectors,
      };
    }

    if (data.day && data.month && data.year) {
      const fromFecha = new Date();
      fromFecha.setDate(data.day);
      fromFecha.setMonth(parseInt(data.month, 10) - 1);
      fromFecha.setFullYear(data.year);
      fromFecha.setHours(0, 0, 0, 0);

      const lastFecha = new Date(fromFecha);
      lastFecha.setDate(fromFecha.getDate() + 1);

      this.data.fecha = {
        $gte: fromFecha,
        $lt: lastFecha,
      };
    }
  }
}

module.exports = InspectionsFilter;
