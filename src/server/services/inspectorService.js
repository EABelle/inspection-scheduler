const InspectionService = require('./InspectionService');
const InspectorDAO = require('../dao/InspectorDAO');
const InspectorFilter = require('../filters/InspectorFilter');
const { formatDate, matchDate } = require('../utils/formatDate');
const InspectorAssembler = require('../assembler/InspectorAssembler');

class InspectorService {
  static get(id) {
    return new Promise((resolve, reject) => {
      InspectorDAO.findById(id)
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

  static findAvailableInspector(day, location, inspectors_id, inspections) {
    return new Promise((resolve, reject) => {
      const inspectorFilter = new InspectorFilter();
      inspectorFilter.fillData({ locations: location, _id: inspectors_id });
      this.find(inspectorFilter.filterData())
        .then((inspectors) => {
          let assignedInspector = null;
          inspectors.forEach((inspector) => {
            inspector = inspector.toJSON();
            let { maximumPerDay } = inspector;

            if (!inspector.daysNotAble.find((date) => matchDate(formatDate(date), day))) {
              if (inspector.daysUnlimited.find((date) => matchDate(formatDate(date), day))) {
                assignedInspector = inspector._id;
              }
              inspections.forEach(({ inspector_id, date }) => {
                if (matchDate(formatDate(date), day) && inspector_id === inspector._id) {
                  maximumPerDay--;
                }
              });

              if (maximumPerDay > 0) {
                assignedInspector = inspector._id;
              }
            }
          });
          return {
            availableInspector: assignedInspector,
            candidates: inspectors_id.map(({ _id }) => (_id)),
          };
        })
        .then(resolve)
        .catch(reject);
    });
  }

  static async isSomeoneAvailable(inspectors, location, day) {
    const inspections = await InspectionService.getByInspectors(inspectors);
    return await this.findAvailableInspector(day, location, inspectors, inspections);
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
