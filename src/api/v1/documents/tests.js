const supertest = require("supertest")
const app = require ("../../../../index");
let request = {};
const path = require("path");
const { Buffer } = require("buffer");

let testFilePath = path.resolve(__dirname + "\\testFiles\\");
//testFilePath = "\\testFiles\\"
let testTxt = "test.csv";
let relPath = Buffer.from(testFilePath, "ascii").toString("base64")
let name = Buffer.from(testTxt, "ascii").toString()


const documentTestSuite = () => describe("-----TESTS DOCUMENTOS-----", () => {
  console.log("---EMPEZANDO TESTS DOCUMENTOS---");
  beforeAll(async()=> {
    app.close()
    request = supertest(app)
  })
  describe("GET /documents/localFile/:relPath/:name", () => {
    test("Deberia funcionar correctamente", async() => {
      console.log("GET /documents/localFile/:relPath/:name");
      await request.get(`/api/documents/localFile/${relPath}/${testTxt}`)
      .expect(200)
    })

    test("Deberia dar 404", async() => {
      await request.get(`/api/documents/localFile/a/b`)
      .expect(404)
      .expect({ message: 'No existe el archivo especificado'})
    })
  })

  console.log("---FIN TESTS DOCUMENTOS---");
})

module.exports = {documentTestSuite}