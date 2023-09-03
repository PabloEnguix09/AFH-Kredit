const fs = require('fs');
const path = require("path");
const { check_error } = require('../utils/utils');
const { Buffer } = require("buffer");


class Documento {
    constructor(nombre, contenido) {
        this.nombre = nombre;
        this.contenido = contenido;
    }
}

class DocumentoAPI {

    getLocalFile = async function (req) {
        return new Promise(async(resolve, reject) => {
            let relPath = new Buffer.from(req.params.relPath, "base64").toString("ascii")
            let fullPath = path.resolve(relPath+"\\"+req.params.name)
            try {
                if(fs.existsSync(fullPath)) {
                    fs.readFile(fullPath, "utf-8", (err, data) => {
                        resolve({
                            status: 200,
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
            } catch (error) {
                resolve(check_error(error))
            }
        })   
    }
}

module.exports = {Documento, DocumentoAPI}