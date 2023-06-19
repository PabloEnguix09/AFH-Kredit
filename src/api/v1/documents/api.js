const { storage } = require("../utils/firebase/admin");
const { check_error } = require("../utils/utils");
const Documento = require("./models")
const fs = require('fs');
const path = require("path")

/**
 * 
 * @api {get} /users/:id/documents List user's documents
 * @apiName List Documents
 * @apiGroup Documents
 * @apiVersion 1.0.0
 * 
 * @apiParam  {String} id User's id
 * @apiParamExample Request-Example:
 * {
 *     id:"test@afhkredit.com"
 * }
 * 
 * @apiSuccess (200) {json[]} Documentos List of user's documents
 * @apiSuccessExample {json[]} Success-Response:
 * HTTP/1.1 200 OK 
 * {
 *      [
 *           {
 *               id:"Documento1.txt",
 *               contenido:"https://storage.googleapis.com/afh-kredit.appspot.com/test@afhkredit.com/Documento1.txt?GoogleAccessId=firebase-adminsdk-5xcx9%40afh-kredit.iam.gserviceaccount.com&Expires=253370761200&Signature=jcWlx74u0owXirnUmwA%2FTNOUgEbkbB0LzChPCCa0TVoPATiG8BIC1urJ9Kxz%2FoGlwxuFBiKhFjUvkkSO8fOzRAs6UadRCGeNyaGdaQBZySQQ0v3jcwxOQkxL59Lv10kWtU5rQZLhNm3tgXAUYywFPz6mMmM1RH3zXk%2FyzTQPt%2BfY6JQbFaRWSoE8%2BfyraapSfzDbBVBnhDm%2FDYNfEHy7QYOMpRfp4bMhuax177SETQoZHdSmT156vPySSoTx74kcj4hqEkCz1%2B7F4l7jRsVzplCwsCxweWHVPSId5QIW8r5SLQYmeEDBEEFv3oEepyKdQ%2BiHqrMcOm7x8sdSvF0SCg%3D%3D"
 *           },
 *           {
 *               id:"Imagen1.png",
 *               contenido:"https://storage.googleapis.com/afh-kredit.appspot.com/test@afhkredit.com/Imagen1.png?GoogleAccessId=firebase-adminsdk-5xcx9%40afh-kredit.iam.gserviceaccount.com&Expires=253370761200&Signature=jcWlx74u0owXirnUmwA%2FTNOUgEbkbB0LzChPCCa0TVoPATiG8BIC1urJ9Kxz%2FoGlwxuFBiKhFjUvkkSO8fOzRAs6UadRCGeNyaGdaQBZySQQ0v3jcwxOQkxL59Lv10kWtU5rQZLhNm3tgXAUYywFPz6mMmM1RH3zXk%2FyzTQPt%2BfY6JQbFaRWSoE8%2BfyraapSfzDbBVBnhDm%2FDYNfEHy7QYOMpRfp4bMhuax177SETQoZHdSmT156vPySSoTx74kcj4hqEkCz1%2B7F4l7jRsVzplCwsCxweWHVPSId5QIW8r5SLQYmeEDBEEFv3oEepyKdQ%2BiHqrMcOm7x8sdSvF0SCg%3D%3D"
 *           }
 *      ]
 * }
 * 
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *      message: "No hay documentos"
 * }
 * 
 */
let list = async (req, res) => {
    try {
        await storage.getFiles({prefix: req.params.id}, async (err, files) => {
            if(files.length == 0) {
                res.status(404).send({message: "No hay documentos"})
            }
            else {
                let documentos = [];
                console.log("HAY FILES");

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
                console.log(documentos);
                res.status(200).send(documentos);
            }
        })
    } 
    catch (error) {
        check_error(error, res)
    }
}

/**
 * 
 * @api {get} /users/:id/documents/:nombre Get user document by name
 * @apiName Get Document
 * @apiGroup Documents
 * @apiVersion 1.0.0
 * 
 * 
 * @apiParam  {String} id User's id
 * @apiParam  {String} nombre Document name (with extension)
 * 
 * @apiSuccess (200) {Documento} Documento Document requested
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     id:"test@afhkredit.com",
 *     nombre:"Documento1.txt"
 * }
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK 
 * {
 *      id:"Documento1.txt",
 *      contenido:"https://storage.googleapis.com/afh-kredit.appspot.com/test@afhkredit.com/Documento1.txt?GoogleAccessId=firebase-adminsdk-5xcx9%40afh-kredit.iam.gserviceaccount.com&Expires=253370761200&Signature=jcWlx74u0owXirnUmwA%2FTNOUgEbkbB0LzChPCCa0TVoPATiG8BIC1urJ9Kxz%2FoGlwxuFBiKhFjUvkkSO8fOzRAs6UadRCGeNyaGdaQBZySQQ0v3jcwxOQkxL59Lv10kWtU5rQZLhNm3tgXAUYywFPz6mMmM1RH3zXk%2FyzTQPt%2BfY6JQbFaRWSoE8%2BfyraapSfzDbBVBnhDm%2FDYNfEHy7QYOMpRfp4bMhuax177SETQoZHdSmT156vPySSoTx74kcj4hqEkCz1%2B7F4l7jRsVzplCwsCxweWHVPSId5QIW8r5SLQYmeEDBEEFv3oEepyKdQ%2BiHqrMcOm7x8sdSvF0SCg%3D%3D"
 * }
 * 
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *      message: "No existe el archivo especificado"
 * }
 * 
 */
let get = async function(req, res) {
    try {
        let file = await storage.file(req.params.id + "/" + req.params.nombre)
        
        file.exists().then((existe) => {
            if(existe[0]){
                file.getSignedUrl({
                    action:"read",
                    expires: "01-01-9999"
                }).then((data) => {
                    console.log(data);
                    let file = new Documento(
                        req.params.nombre,
                        data[0]
                    )
                    console.log(file);
                    res.status(200).send(file)
                })
            }
            else {
                res.status(404).send({message: "No existe el archivo especificado"})
            }
        })
    } catch (error) {
        check_error(error, res);
    }
}

/**
 * 
 * @api {post} /users/:id/documents/new Create new document
 * @apiName Create Document
 * @apiGroup Documents
 * @apiVersion 1.0.0
 * 
 * @apiParam  {String} id User's id
 * @apiBody {String} relPath Relative path to file
 * @apiBody {String} name File name (with extension)
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     id:"test@afhkredit.com"
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created 
 * {
 *      message: "Archivo subido"
 * }
 * 
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *      message: "No existe el archivo especificado"
 * }
 * 
 */
let create = async (req, res) => {
    try {
        fs.createReadStream(path.resolve(req.body.relPath+req.body.name))
        .on("error", (err) => {
            console.log("ERROR LEYENDO ARCHIVO");
            res.status(404).send({message: "No existe el archivo especificado"});
        })
        .pipe(storage.file(req.params.id + "/"+req.body.name).createWriteStream())
        .on("finish", function(){
            res.status(201).send({message: "Archivo subido"})
        })
        .on("error", (err) => {
            console.log("ERROR ESCRIBIENDO ARCHIVO");
            console.log(err);
        })

    } catch (error) {
        console.log("ERROR");
        check_error(error, res);
    }
}

/**
 * 
 * @api {delete} /users/:id/documents/:nombre/delete Delete document
 * @apiName Delete Document
 * @apiGroup Documents
 * @apiVersion 1.0.0
 * 
 * @apiParam  {String} id User's id
 * @apiParam  {String} nombre Document's name
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     id:"test@afhkredit.com",
 *     nombre:"Documento1.txt"
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created 
 * {
 *      message: "Documento borrado correctamente"
 * }
 * 
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *      message: "Registro no existente"
 * }
 * 
 */
let borrar = async (req, res) => {
    try {
        await storage.file(req.params.id + "/" + req.params.nombre).delete().then(() => {
            console.log("Archivo borrado");
            res.status(200).send({message: "Documento borrado correctamente"});
        })
    } catch (error) {
        check_error(error, res);
    }
}

module.exports = {
    list:list,
    get:get,
    create: create,
    delete: borrar
};