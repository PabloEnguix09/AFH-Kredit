const { check_error } = require("../utils/utils");
const {DocumentoAPI} = require("./models")
const api = new DocumentoAPI();

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
    let body = {
        body: req.body,
        params: req.params
    }
    let response = await api.getAll(body)
    res.status(response.status).send(response.data)
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
    let body = {
        body: req.body,
        params: req.params
    }
    await api.get(body).then((response) => {
        res.status(response.status).send(response.data)
    })
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
let create = async function(req, res) {
    let body = {
        body: req.body,
        params: req.params
    }
    let response = await api.create(body)
    let mensaje = response.data.message;
    if(response.status == 201) {
        body = {
            body: {},
            params: {
                id: req.params.id,
                nombre: req.body.name
            }
        }
        response = await api.get(body)

        let data = {
            message: mensaje, 
            contenido: response.data.contenido
        }
        if(response.status == 200) {
            response.status = 201;
        }
        res.status(response.status).send(data)
    }
    else {
        res.status(response.status).send(response.data)
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
    let body = {
        body: req.body,
        params: req.params
    }
    await api.delete(body).then((response) => {
        res.status(response.status).send(response.data)
    })
}

let getLocalFile = async (req, res) => {
    let body = {
        body: req.body,
        params: req.params
    }
    await api.getLocalFile(body).then((response) => {
        res.status(response.status).send(response.data)
    })
}

module.exports = {
    list:list,
    get:get,
    create: create,
    delete: borrar,
    getLocalFile: getLocalFile
};