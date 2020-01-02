
const InspectionDAO = require('../dao/InspectionDAO');
const InspectionDTO = require('../dto/InspectionDTO');
const InspectorDAO = require('../dao/InspectorDAO');
const InspectionAssembler = require('../assembler/InspectionAssembler');
const InspectorService = require('./inspectorService');
const { buildDate } = require('../utils/formatDate');

class AgendaService {
  static save(inspectionData, inspectorFilter) {
    return new Promise((resolve, reject) => {
      const inspectionDTO = new InspectionDTO();
      InspectorDAO.find(inspectorFilter.filterData())
        .then((inspectors) => {
            return InspectorService.isSomeoneAvailable(inspectors, inspectionData.meetingDetails.city, inspectionData.meetingDetails.date)})
        .then(({ availableInspector, candidates }) => {
          if (!availableInspector) {
            reject(() => ({ message: 'no hay disponibilidad' }));
          }
          inspectionData = {
            ...inspectionData,
            candidates,
            inspectorId: availableInspector,
            date: buildDate(inspectionData.meetingDetails.date, inspectionData.meetingDetails.time),
          };
          inspectionDTO.hydrate(inspectionData);
          return InspectionAssembler.fromDTO(inspectionDTO.data);
        })
        .then((inspection) => InspectionDAO.save(inspection))
        .then(resolve)
        .catch(reject);
    });
  }
}
module.exports = AgendaService;
