const InspectionDAO = require('../dao/InspectionDAO');
const InspectionFilter = require('../filters/InspectionFilter');
const InspectionAssembler = require('../assembler/InspectionAssembler');

class InspectionService {
  static get(id) {
    return new Promise((resolve, reject) => {
      InspectionDAO.fetch(id)
        .then((inspection) => resolve(inspection))
        .catch((err) => {
          reject(err);
        });
    });
  }

  static find(filterData) {
    return new Promise((resolve, reject) => {
      InspectionDAO.find(filterData)
        .then(resolve)
        .catch(reject);
    });
  }

  static save(inspectionDTO) {
    const inspection = InspectionAssembler.fromDTO(inspectionDTO.data);
    return new Promise((resolve, reject) => {
      InspectionDAO.save(inspection)
        .then((inspection) => resolve(inspection))
        .catch((err) => reject(err));
    });
  }

  static update(id, inspectionDTO, set) {
    return new Promise((resolve, reject) => {
      InspectionDAO.update(id, inspectionDTO.getData(), set)
        .then((inspection) => {
          resolve(this.get(inspection._id));
        })
        .catch((err) => reject(err));
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      InspectionDAO.delete(id)
        .then((deleted) => resolve(deleted))
        .catch((err) => reject(err));
    });
  }

  static getInspectionsFromInspectors(inspectors) {
    return new Promise((resolve, reject) => {
      /* if (!inspectors || inspectors.length === 0) {
                resolve([])
            } */
      const inspectionFilter = new InspectionFilter();
      inspectionFilter.fillData({
        inspectors: inspectors.map(({ _id }) => (_id)),
      });
      InspectionDAO.find(inspectionFilter.filterData())
        .then(inspections => resolve([inspectors, inspections]))
        .catch(reject);
    });
  }
}

module.exports = InspectionService;
