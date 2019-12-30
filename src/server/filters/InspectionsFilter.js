
const GenericFilter = require('./GenericFilter');

class InspectionsFilter extends GenericFilter {
  constructor() {
    super();
    this.data = {};
  }

  fillData(data) {
    super.fillData(data);

    if (data.inspectors) {
      this.data.inspectorId = {
        $in: data.inspectors,
      };
    }

    if (data.day && data.month && data.year) {
      const dateFrom = new Date();
      dateFrom.setDate(data.day);
      dateFrom.setMonth(parseInt(data.month, 10) - 1);
      dateFrom.setFullYear(data.year);
      dateFrom.setHours(0, 0, 0, 0);

      const lastFecha = new Date(dateFrom);
      lastFecha.setDate(dateFrom.getDate() + 1);

      this.data.date = {
        $gte: dateFrom,
        $lt: lastFecha,
      };
    }
  }
}

module.exports = InspectionsFilter;
