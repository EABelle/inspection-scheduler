'use strict'

let Inspector = require('../models/inspector');

let { addDays, buildDate, transformDateString } = require('../utils/formatDate')

class InspectorDAO{

    static find(filter){
        return new Promise((resolve, reject) => {
            const query = !filter.localidades && !filter.id ? undefined : filter
            Inspector.find(query)
            .then((inspectores) => {
                if (!inspectores){
                    reject({ message: "no se encontraron inspectores" });
                }else{
                    resolve(inspectores);
                }
            })
            .catch(() => {reject({message: "no se pudo realizar la búsqueda"})})
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Inspector.findById(id).exec((err, inspector) => {
                if (err || !inspector){
                    console.log(err);
                    reject ({message: "No pudo encontrarse el inspector"});
                } else {
                    resolve(inspector);
                }
            })
        })
    }

    static save(inspectorData){
        return new Promise((resolve, reject) => {
            const inspector = new Inspector(inspectorData)
            let { habilitar, inhabilitar } = inspector
            inspector.habilitar = habilitar.map(date => (buildDate(transformDateString(date))))
            inspector.inhabilitar = inhabilitar.map(date => (buildDate(transformDateString(date))))
            inspector.save((err, inspector) => {
                if (err || !inspector){
                    console.log(err);
                    reject({message: "no pudo guardarse el inspector"});
                } else {
                    resolve(inspector);
                }
            })
        })
    }

    static update(id, inspector, set){
        let dtoUpdate = {$set:inspector}
        let directive = '$pull'
        if(set) {
            directive = '$addToSet'
        }
        if (
            inspector.habilitar || inspector.inhabilitar
        ) {
            const action = inspector.habilitar ? 'habilitar' : 'inhabilitar'
            dtoUpdate = { 
                [directive]: { 
                    [action]: set 
                        ? buildDate(transformDateString(inspector[action])) 
                        : {
                            $gte: buildDate(transformDateString(inspector[action])),
                            $lt: buildDate(transformDateString(addDays(inspector[action], 1))) 
                        } 
                }
            }
        }

        return new Promise((resolve, reject) => {
            Inspector.findByIdAndUpdate(id, dtoUpdate).exec((err, inspector2) => {
                if (err || !inspector2){
                    console.log(err);
                    reject({message: "error interno"});
                } else {
                    resolve(inspector2);
                }
            })
        })
    }

    static delete(id){
        return new Promise((resolve, reject) => {
            
            Inspector.findByIdAndRemove(id).exec((err, deleted) => {
                if (err || !deleted){
                    console.log(err);
                    reject({message: "no se puede borrar el inspector"});
                } else {
                    resolve("eliminado");
                }
            })
        })
    }
}

module.exports = InspectorDAO