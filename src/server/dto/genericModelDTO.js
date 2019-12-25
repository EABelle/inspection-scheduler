
const validator = require('../utils/validate.js');

class GenericModelDTO {
  constructor() {
    this.data = {};
  }

  hydrate(data) {
    for (const key of Object.keys(this.data)) {
      if (data[key]) {
        this.data[key] = data[key];
      }
    }
  }

  getData() {
    const validData = {};
    for (const key of Object.keys(this.data)) {
      if (validator.validKey(this.data[key])) {
        validData[key] = this.data[key];
      }
    }
    return validData;
  }
}

module.exports = GenericModelDTO;
