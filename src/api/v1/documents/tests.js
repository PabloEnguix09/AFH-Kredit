const documents = require("./api")
const http = require("http");
const supertest = require("supertest")
const router = require("./urls")
const app = require ("../../../../index");
const fs = require("fs");
let request = {};
const path = require("path")


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
let testPng = __dirname+"/testFiles/test.png";
let testPdf = __dirname+"/testFiles/test.pdf";


const documentTestSuite = () => describe("-----TESTS DOCUMENTOS-----", () => {
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
  
  describe("POST /users/:id/documents/new", () => {

    test("Deberia funcionar correctamente", async() => {
      let filePath = path.resolve(path.dirname(require.main.filename))
      await request.post("/api/users/"+defaultUserData.email+"/documents/new")
      .set("Content-Type", "multipart/form-data")
      .field("name", "test.txt")
      .field("relPath", filePath+testFilePath)
      .expect(201)
      .expect({message: "Archivo subido"})
    })

    test("Deberia dar 404", async() => {
      let filePath = path.resolve(path.dirname(require.main.filename))
      await request.post("/api/users/"+defaultUserData.email+"/documents/new")
      .set("Content-Type", "multipart/form-data")
      .field("name", "a.txt")
      .field("relPath", filePath+testFilePath)
      .expect(404)
      .expect({message: "No existe el archivo especificado"})
    })
  })

  describe("GET /users/:id/documents/:nombre", () => {
    test("Deberia funcionar correctamente", async() => {
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
  })

  describe("DELETE /users/:id/documents/:nombre", () => {
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
})

module.exports = {documentTestSuite}