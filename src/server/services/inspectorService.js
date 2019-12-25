const InspectionService = require('./InspectionService');
const InspectorDAO = require('../dao/InspectorDAO');
const InspectorFilter = require('../filters/InspectorFilter');
const { formatDate, matchDate } = require('../utils/formatDate');
const InspectorAssembler = require('../assembler/InspectorAssembler');

class InspectorService {
  static get(id) {
    return new Promise((resolve, reject) => {
      InspectorDAO.fetch(id)
        .then((inspector) => resolve(inspector))
        .catch((err) => {
          reject(err);
        });
    });
  }

  static find(filterData) {
    return new Promise((resolve, reject) => {
      InspectorDAO.find(filterData)
        .then(resolve)
        .catch(reject);
    });
  }

  static formatDay(dayString) {
    const dayObject = {
      [dayString]: {
        inspectors: {},
      },
    };

    return dayObject;
  }

  static findAvailableInspector(day, localidad, inspectors_id, inspections) {
    return new Promise((resolve, reject) => {
      const inspectorFilter = new InspectorFilter();
      inspectorFilter.fillData({ localidades: localidad, _id: inspectors_id });
      this.find(inspectorFilter.filterData())
        .then((inspectors) => {
          let assignedInspector = null;
          inspectors.forEach((inspector) => {
            inspector = inspector.toJSON();
            let { maximo } = inspector;

            if (!inspector.inhabilitar.find((fecha) => matchDate(formatDate(fecha), day))) {
              if (inspector.habilitar.find((fecha) => matchDate(formatDate(fecha), day))) {
                assignedInspector = inspector._id;
              }
              inspections.forEach(({ inspector_id, fecha }) => {
                if (matchDate(formatDate(fecha), day) && inspector_id === inspector._id) {
                  maximo--;
                }
              });

              if (maximo > 0) {
                assignedInspector = inspector._id;
              }
            }
          });
          return {
            inspectorDisponible: assignedInspector,
            candidatos: inspectors_id.map(({ _id }) => (_id)),
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  static isSomeoneAvailable(inspectors, localidad, dia) {
    return new Promise((resolve, reject) => {
      InspectionService.getInspectionsFromInspectors(inspectors)
        .then(([inspectors, inspections]) => this.findAvailableInspector(dia, localidad, inspectors, inspections))
        .then(resolve)
        .catch(reject);
    });
  }

  static save(inspectorDTO) {
    const inspector = InspectorAssembler.fromDTO(inspectorDTO.data);
    return new Promise((resolve, reject) => {
      InspectorDAO.save(inspector)
        .then((inspector) => resolve(inspector))
        .catch((err) => reject(err));
    });
  }

  static update(id, inspectorDTO, set) {
    return new Promise((resolve, reject) => {
      InspectorDAO.update(id, inspectorDTO.getData(), set)
        .then((inspector) => {
          resolve(this.get(inspector._id));
        })
        .catch((err) => reject(err));
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      InspectorDAO.delete(id)
        .then((deleted) => resolve(deleted))
        .catch((err) => reject(err));
    });
  }
}

module.exports = InspectorService;
