
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
        .then((inspectors) => InspectorService.isSomeoneAvailable(inspectors, inspectionData.inspection.location, inspectionData.inspection.dia))
        .then(({ inspectorDisponible, candidatos }) => {
          if (!inspectorDisponible) {
            reject(() => ({ message: 'no hay disponibilidad' }));
          }
          inspectionData = {
            ...inspectionData,
            candidatos,
            inspector_id: inspectorDisponible,
            fecha: buildDate(inspectionData.inspection.dia, inspectionData.inspection.horario),
          };
          inspectionDTO.hydrate(inspectionData);
          const inspection = InspectionAssembler.fromDTO(inspectionDTO.data);
          return inspection;
        })
        .then((inspection) => InspectionDAO.save(inspection))
        .then(resolve)
        .catch(reject);
    });
  }
}
module.exports = AgendaService;
