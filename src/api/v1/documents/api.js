const {DocumentoAPI} = require("./models")
const api = new DocumentoAPI();

/**
 * 
 * @api {get} /documents/localFile/:relPath/:name Read local file
 * @apiName Get Local File
 * @apiGroup Documents
 * @apiVersion 1.0.0
 * 
 * @apiParam  {String} relPath Relative path of the file
 * @apiParam  {String} name Name of the file
 * @apiParamExample Request-Example:
 * {
 *     relPath:"test@afhkredit.com",
 *     name: ""
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
let getLocalFile = async (req, res) => {
    let body = {
        body: req.body,
        params: req.params
    }
    console.log(body);
    await api.getLocalFile(body).then((response) => {
        res.status(response.status).send(response.data)
    })
}

module.exports = {
    getLocalFile: getLocalFile
};