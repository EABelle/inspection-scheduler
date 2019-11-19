'use strict'

let Inspeccion = require('../models/inspeccion');

class InspeccionDAO{

    static find(filter){
        return new Promise((resolve, reject) => {
            Inspeccion.find(filter).then((inspecciones) => {
                if (!inspecciones){
                    reject({message: "no se encontró ninguna inspección"});
                }else{
                    resolve(inspecciones); 
                }
            }).catch(() => {reject({message: "no se pudo realizar la busqueda de inspección"});})
        })
    }

    static findWithInspectors(inspectores, filter){
        return new Promise((resolve, reject) => {
            Inspeccion.find(filter).then((inspecciones) => {
                if (!inspecciones){
                    reject({message: "no se encontró ninguna inspección"});
                }else{
                    resolve([inspectores, inspecciones]); 
                }
            }).catch(() => {reject({message: "no se pudo realizar la busqueda de inspección"});})
        })
    }

    static fetch(id){
        return new Promise((resolve, reject) => {
            Inspeccion.findById(id).exec((err, inspeccion) => {
                if (err || !inspeccion){
                    console.log(err);
                    reject ({message: "No pudo encontrarse la inspeccion"});
                } else {
                    resolve(inspeccion);
                }
            })
        })
    }

    static save(inspeccionData){
        return new Promise((resolve, reject) => {
            const inspeccion = new Inspeccion(inspeccionData)
            inspeccion.save((err, inspeccion) => {
                if (err || !inspeccion){
                    console.log(err);
                    reject({message: "no pudo guardarse la inspección"});
                } else {
                    const { _id, candidatos, inspector_id, __v, ...rest } = inspeccion.toJSON();
                    resolve(rest);
                }
            });
        })
    }
}

module.exports = InspeccionDAO