const fs = require('fs');
const path = require("path");
const { storage } = require("../utils/firebase/admin");
const { check_error } = require('../utils/utils');

class Documento {
    constructor(nombre, contenido) {
        this.nombre = nombre;
        this.contenido = contenido;
    }
}

class DocumentoAPI {
    
    getAll = async function (req) {
        return new Promise((resolve, reject) => {
            try {
                storage.getFiles({prefix: req.params.id}, async (err, files) => {
                    if(files.length == 0) {
                        resolve({
                            status: 404,
                            data: {message: "No hay documentos"}
                        })
                    }
                    else {
                        let documentos = [];
                        for(let file of files) {
                            await file.getSignedUrl({
                                action:"read",
                                expires: "01-01-9999"
                            }).then((data) => {
                                if(file.name != req.params.id+"/") {
                                    let documento = new Documento(
                                        file.name.replace(req.params.id+"/", ""),
                                        data[0]
                                    );
                                    documentos.push(documento);
                                }
                            });
                        }
                        resolve({
                            status: 200,
                            data: documentos
                        })
                    }
                })
            } catch (error) {
                resolve(check_error(error))
            }
        })
    }

    create = async function (req) {
        return new Promise(async(resolve, reject) => {
            try {
                let fullPath = path.resolve(req.body.relPath+req.body.name)

                if(fs.existsSync(fullPath)) {
                    let options = {
                        destination: req.params.id + "/" + req.body.name
                    }
                    await storage.upload(fullPath, options).then(() => {
                        resolve({
                            status:201,
                            data: {message: "Archivo subido"}
                        })
                    })
                }
                else {
                    resolve({
                        status:404,
                        data: {message: "No existe el archivo especificado"}
                    })
                }
                
            } catch (error) {
                resolve(check_error(error))
            }
        })
    }

    get = async function (req) {
        return new Promise(async (resolve, reject) => {
            try {
                let file = storage.file(req.params.id + "/" + req.params.nombre)
        
                await file.exists().then((existe) => {
                    if(existe[0]){
                        file.getSignedUrl({
                            action:"read",
                            expires: "01-01-9999"
                        }).then((data) => {
                            let file = new Documento(
                                req.params.nombre,
                                data[0]
                            )
                            resolve({
                                status: 200,
                                data: file
                            })
                        })
                    }
                    else {
                        resolve({
                            status: 404,
                            data: {message: "No existe el archivo especificado"}
                        })
                    }
                })
            } catch (error) {
                resolve(check_error(error))                
            }
        })
    }

    delete = async function (req) {
        return new Promise(async(resolve, reject) => {
            try {
                await storage.file(req.params.id + "/" + req.params.nombre).delete().then(() => {
                    resolve({
                        status: 200,
                        data: {message: "Documento borrado correctamente"}
                    })
                })
            } catch (error) {
                resolve(check_error(error))
            }
            
        })
        
    }

    getLocalFile = async function (req) {
        return new Promise(async(resolve, reject) => {
            let relPath = new Buffer.from(req.params.relPath, "base64").toString("ascii")
            let fullPath = path.resolve(relPath+req.params.name)
            if(fs.existsSync(fullPath)) {
                fs.readFile(fullPath, "utf-8", (err, data) => {
                    resolve({
                        status:201,
                        data: data.split("/\r?\n/")
                    })
                })
                
            }
            else {
                resolve({
                    status:404,
                    data: {message: "No existe el archivo especificado"}
                })
            }
        })   
    }
}

module.exports = {Documento, DocumentoAPI}