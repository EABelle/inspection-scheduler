
const GenericModelDTO = require('./genericModelDTO');

class InspectorDTO extends GenericModelDTO {
  constructor() {
    super();
    this.data = Object.assign(this.data, {
      localidades: null,
      nombre_apellido: null,
      provincia: null,
      horarios: null,
      maximo: null,
      habilitar: null,
      inhabilitar: null,
    });
  }

  hydrate(data) {
    super.hydrate(data);
  }
}

module.exports = InspectorDTO;
