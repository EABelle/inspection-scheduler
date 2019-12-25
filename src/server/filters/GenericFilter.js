
const validator = require('../utils/validate.js');

class GenericFilter {
  constructor() {
    this.data = {
    };
  }

  fillData(data) {
    for (const key of Object.keys(this.data)) {
      if (validator.validKey(data[key])) {
        this.data[key] = data[key];
      }
    }
  }

  filterData() {
    const filterData = {};
    for (const key of Object.keys(this.data)) {
      if (validator.validKey(this.data[key])) {
        filterData[key] = this.data[key];
      }
    }
    return filterData;
  }
}

module.exports = GenericFilter;
