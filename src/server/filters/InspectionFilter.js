
const GenericFilter = require('./GenericFilter');

class InspectionFilter extends GenericFilter {
  constructor() {
    super();
    this.data = Object.assign(this.data, {
      inspectorId: null,
      date: null,
    });
  }

  fillData(data) {
    super.fillData(data);

    if (data.inspectors) {
      this.data.inspectorId = {
        $in: data.inspectors,
      };
    }

    if (data.date) {
      this.data.date = {
        $in: data.date,
      };
    } else {
      const dateFrom = new Date();
      const lastFecha = new Date(dateFrom);
      lastFecha.setDate(dateFrom.getDate() + 5);

      this.data.date = {
        $gte: dateFrom,
        $lt: lastFecha,
      };
    }
  }
}

module.exports = InspectionFilter;
