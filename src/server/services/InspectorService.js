const InspectionService = require('./InspectionService');
const InspectorDAO = require('../dao/InspectorDAO');
const InspectorFilter = require('../filters/InspectorFilter');
const { formatDate, matchDate } = require('../utils/formatDate');
const InspectorAssembler = require('../assembler/InspectorAssembler');

class InspectorService {

  static get(id) {
    return InspectorDAO.findById(id);
  }

  static find(filterData) {
    return InspectorDAO.find(filterData);
  }

  static formatDay(dayString) {
    const dayObject = {
      [dayString]: {
        inspectors: {},
      },
    };

    return dayObject;
  }

  static async findAvailableInspector(day, location, inspectors_id, inspections) {
    const inspectorFilter = new InspectorFilter();
      inspectorFilter.fillData({ locations: location, _id: inspectors_id });
      const inspectors = await this.find(inspectorFilter.filterData())
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
  }

  static async isSomeoneAvailable(inspectors, location, day) {
    const inspections = await InspectionService.getByInspectors(inspectors);
    return await this.findAvailableInspector(day, location, inspectors, inspections);
  }

  static save(inspectorDTO) {
    const inspector = InspectorAssembler.fromDTO(inspectorDTO.data);
    return InspectorDAO.save(inspector);
  }

  static async update(id, inspectorDTO, set) {
    const inspector = await InspectorDAO.update(id, inspectorDTO.getData(), set);
    return await this.get(inspector._id);
  }

  static delete(id) {
    return InspectorDAO.delete(id);
  }
}

module.exports = InspectorService;
