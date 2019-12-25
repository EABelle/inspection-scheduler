
const GenericModelDTO = require('./GenericModelDTO');

class UserDTO extends GenericModelDTO {
  constructor() {
    super();
    this.data = Object.assign(this.data, {
      username: null,
      password: null,
    });
  }

  hydrate(data) {
    super.hydrate(data);
  }
}

module.exports = UserDTO;
