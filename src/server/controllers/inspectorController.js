'use strict'

let InspectorService = require('../services/inspectorService');
let InspectorFilter = require('../filters/inspectorFilter');
let InspectorDTO = require('../dto/inspectorDTO');


class InspectorController {
    static get(req, res, next) {
        const inspectorFilter = new InspectorFilter();
      
        const { localidad } = req.query
        
        inspectorFilter.fillData({localidades: localidad});

        InspectorService.find(inspectorFilter)
        .then(
            inspector => {
                res.status(200).send({
                  data: inspector
                });
            }
        ).catch(err => res.status(err.code || 400).send(err.message))
    }

    static post(req, res, next) {
        let inspectorDTO = new InspectorDTO()
        inspectorDTO.hydrate(req.body);
        InspectorController.resolve(next, InspectorService.save(inspectorDTO), inspector => {
            res.status(201).send({
                data: inspector
            })
        })
    }

    static getInspector(req, res, next) {
        let id = req.params.id;
        InspectorController.resolve(next, InspectorService.get(id), inspector => {
                res.status(200).send({
                    data: inspector
                });
            })
    }
    
    static updateInspector(req, res, next) {
        let id = req.params.id;
        let inspectorDTO = new InspectorDTO()
        inspectorDTO.hydrate(req.body);
        InspectorController.resolve(next, InspectorService.update(id, inspectorDTO, req.body.set), inspector => {
                res.status(200).send({
                    data: inspector
                })
            })
    }
    
    static deleteInspector(req, res, next) {
        let id = req.params.id;
        InspectorController.resolve(next, InspectorService.delete(id), message => {
                res.status(200).send({
                    data: message
                })
            })
    }
}

module.exports = InspectorController