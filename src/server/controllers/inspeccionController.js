
const InspeccionService = require('../services/inspectionService');
const InspeccionesFilter = require('../filters/inspeccionesFilter');
const InspeccionDTO = require('../dto/inspeccionDTO');


class InspeccionController {
  static get(req, res) {
    const inspeccionesFilter = new InspeccionesFilter();

    const {
      localidad, day, month, year,
    } = req.query;

    inspeccionesFilter.fillData({
      localidad, day, month, year,
    });
    InspeccionService.find(inspeccionesFilter.data)
      .then(
        (inspecciones) => {
          res.status(200).send({
            data: inspecciones,
          });
        },
      ).catch((err) => res.status(err.code || 400).send(err.message));
  }

  static post(req, res, next) {
    const inspeccionDTO = new InspeccionDTO();
    inspeccionDTO.hydrate(req.body);
    InspeccionController.resolve(next, InspeccionService.save(inspeccionDTO), (inspeccion) => {
      res.status(201).send({
        data: inspeccion,
      });
    });
  }

  static getInspeccion(req, res, next) {
    const { id } = req.params;
    InspeccionController.resolve(next, InspeccionService.get(id), (inspeccion) => {
      res.status(200).send({
        data: inspeccion,
      });
    });
  }

  static updateInspeccion(req, res, next) {
    const { id } = req.params;
    const inspeccionDTO = new InspeccionDTO();
    inspeccionDTO.hydrate(req.body);
    InspeccionController.resolve(
      next,
      InspeccionService.update(id, inspeccionDTO, req.body.set),
      (inspeccion) => {
        res.status(200).send({
          data: inspeccion,
        });
      },
    );
  }

  static deleteInspeccion(req, res, next) {
    const { id } = req.params;
    InspeccionController.resolve(next, InspeccionService.delete(id), (message) => {
      res.status(200).send({
        data: message,
      });
    });
  }
}

module.exports = InspeccionController;
