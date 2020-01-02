const InspectionDAO = require('../dao/InspectionDAO');
const InspectionFilter = require('../filters/InspectionFilter');
const InspectionAssembler = require('../assembler/InspectionAssembler');

class InspectionService {

  static get(id) {
    return InspectionDAO.findById(id);
  }

  static find(filterData) {
    return InspectionDAO.find(filterData);
  }

  static save(inspectionDTO) {
    const inspection = InspectionAssembler.fromDTO(inspectionDTO.data);
    return InspectionDAO.save(inspection);
  }

  static async update(id, inspectionDTO, set) {
    const inspection = await InspectionDAO.update(id, inspectionDTO.getData(), set);
    return await this.get(inspection._id);
  }

  static delete(id) {
    return InspectionDAO.delete(id);
  }

  static async getByInspectors(inspectors) {
    const inspectionFilter = new InspectionFilter();
    inspectionFilter.fillData({
      inspectors: inspectors.map(({ _id }) => (_id)),
    });
    return await InspectionDAO.find(inspectionFilter.filterData());
  }
}

module.exports = InspectionService;
