const supertest = require("supertest")
const app = require ("../../../../index");
let request = {};
const path = require("path");

const defaultUserId = "test@afhkredit.com";
const defaultUserData = {
    nombre: "Test",
    apellidos: "AFH Kredit",
    email: defaultUserId,
    rol: "Admin"
};

const newUserId = "other@email.com";
const newUserData = {
  nombre: "Otro",
  apellidos: "Test AFH",
  email: newUserId,
  rol: "Usuario"
};

let testFilePath = "\\documents\\testFiles\\";
let testTxt = "test.txt";
let filePath = path.resolve(path.dirname(require.main.filename))


const documentTestSuite = () => describe("-----TESTS DOCUMENTOS-----", () => {
  console.log("---EMPEZANDO TESTS DOCUMENTOS---");
  beforeAll(async()=> {
    app.close()
    request = supertest(app)

    await request.post("/api/users/create").send(defaultUserData).set("Accept", "application/json")
    await request.post("/api/users/create").send(newUserData).set("Accept", "application/json")
  })
  afterAll(async() => {
    await request.delete("/api/users/delete").send({id: defaultUserData.email}).set("Accept", "application/json")
    await request.delete("/api/users/delete").send({id: newUserData.email}).set("Accept", "application/json")
  })
  
  describe("POST /users/:id/documents/new", async() => {

    test("Deberia funcionar correctamente", async() => {
      console.log("POST /users/:id/documents/new");
      await request.post("/api/users/"+defaultUserData.email+"/documents/new")
      .set("Accept", "application/json")
      .send({
        relPath: filePath + testFilePath,
        name: testTxt
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toEqual("Archivo subido")
        expect(res.body.contenido).toBeDefined()
      })
    })

    test("Deberia dar 404", async() => {
      console.log("POST /users/:id/documents/new");
      await request.post("/api/users/"+defaultUserData.email+"/documents/new")
      .set("Accept", "application/json")
      .send({
        relPath: filePath + testFilePath,
        name: "a"
      })
      .expect(404)
      .expect({message: "No existe el archivo especificado"})
    })
  })

  describe("GET /users/:id/documents/:nombre", () => {
    test("Deberia funcionar correctamente", async() => {
      console.log("GET /users/:id/documents/:nombre");

      await request.get("/api/users/"+defaultUserData.email+"/documents/"+testTxt)
      .expect(200)
      .expect((respuesta) => {
        expect(respuesta.body.nombre).toEqual("test.txt");
      })
    })

    test("Deberia dar 404", async() => {
      await request.get("/api/users/"+defaultUserData.email+"/documents/a")
      .expect(404)
      .expect({message: "No existe el archivo especificado"})
    })
  })

  describe("GET /users/:id/documents", () => {
    test("Deberia funcionar correctamente", async() => {
      await request.get("/api/users/"+defaultUserData.email+"/documents")
      .expect(200)
      .expect((respuesta) => {
        expect(respuesta.body.length).toEqual(1);
        expect(respuesta.body[0].nombre).toEqual("test.txt");
      })
    })

    test("Deberia dar 404", async() => {
      await request.get("/api/users/"+newUserData.email+"/documents")
      .expect(404)
      .expect({message: "No hay documentos"})
    })

    test("Deberia dar 404", async() => {
      await request.get("/api/users/a/documents")
      .expect(404)
      .expect({message: "No hay documentos"})
    })
  })

  describe("DELETE /users/:id/documents/:nombre/delete", () => {
    test("Deberia funcionar correctamente", async() => {
      await request.delete("/api/users/"+defaultUserData.email+"/documents/"+testTxt+"/delete")
      .expect(200)
      .expect({message: "Documento borrado correctamente"})
    })

    test("Deberia dar 404", async() => {
      await request.delete("/api/users/"+defaultUserData.email+"/documents/a/delete")
      .expect(404)
      .expect({message: "Registro no existente"})
    })
  })

  console.log("---FIN TESTS DOCUMENTOS---");
})

module.exports = {documentTestSuite}