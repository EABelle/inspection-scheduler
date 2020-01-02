
const InspectionDAO = require('../dao/InspectionDAO');
const InspectionDTO = require('../dto/InspectionDTO');
const InspectorDAO = require('../dao/InspectorDAO');
const InspectionAssembler = require('../assembler/InspectionAssembler');
const InspectorService = require('./InspectorService');
const { buildDate } = require('../utils/formatDate');

class AgendaService {
  static async save(inspectionData, inspectorFilter) {
      const inspectionDTO = new InspectionDTO();
      const inspectors = await InspectorDAO.find(inspectorFilter.filterData());
      const { availableInspector, candidates } = await InspectorService.isSomeoneAvailable(inspectors, inspectionData.meetingDetails.city, inspectionData.meetingDetails.date);
      if (!availableInspector) {
          throw new Error ('No available inspectors');
      }
      const payload = {
        ...inspectionData,
        candidates,
        inspectorId: availableInspector,
        date: buildDate(inspectionData.meetingDetails.date, inspectionData.meetingDetails.time),
      };
      inspectionDTO.hydrate(payload);
      const inspection = InspectionAssembler.fromDTO(inspectionDTO.data);
      return await InspectionDAO.save(inspection);
  }
}
module.exports = AgendaService;
