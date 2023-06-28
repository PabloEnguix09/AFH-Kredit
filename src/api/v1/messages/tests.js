const supertest = require("supertest")
const app = require ("../../../../index");
let request = {};
const path = require("path");

let filePath = path.resolve(path.dirname(require.main.filename));

process.env.HOST_URL = "http://127.0.0.1:9199"

let plantilla = {
    "chatId": "abcd",
    "cliente": "test@afhkredit.com",
    "agente": "other@afhkredit.com",
    "isClienteSender": true,
    "texto": "Hola",
    "media": {}
}

let plantillaArchivo = {
        "relPath": "src\\api\\v1\\documents\\testFiles\\",
        "name": "test.pdf"
}

const chatTestSuite = async() => describe("-----TESTS CHAT-----", () => {
    console.log("---EMPEZANDO TESTS CHAT---");
    beforeAll(async()=> {
        app.close()
        request = supertest(app)
    })

    afterAll(async() => {
        await request.delete("/api/users/"+plantilla.cliente+"/documents/test.pdf/delete")
    })

    describe("POST /mensajes", () => {
        console.log("POST /mensajes");
        test("Deberia funcionar correctamente", async() => {
            await request.post("/api/mensajes")
            .set("Accept", "application/json")
            .send(plantilla)
            .expect(201)
            .expect({message: "Mensaje enviado con exito"})
            
            let mensaje = plantilla;
            mensaje.isClienteSender = false;
            mensaje.texto = "Mensaje de prueba"
            mensaje.media = plantillaArchivo;

            await request.post("/api/mensajes")
            .set("Accept", "application/json")
            .send(mensaje)
            .expect(201)
            .expect({message: "Mensaje enviado con exito"})
        })

        test("Deberia fallar", async() => {
            let mensaje = plantilla;
            let archivo = plantillaArchivo;
            archivo.name = "a.txt";
            mensaje.media = archivo;

            await request.post("/api/mensajes")
            .set("Accept", "application/json")
            .send(mensaje)
            .expect(404)
            .expect({message: "Error al adjuntar el archivo"})
        })
        console.log("FIN POST /mensajes");
    })

    describe("GET /mensajes/:userId", () => {
        test("Deberia devolver una conversacion", async() => {
            await request.get("/api/mensajes/"+plantilla.cliente)
            .expect(200)
            .expect((response) => {
                expect(response.body.length).toEqual(1)
            })
        })

        test("No deberian haber conversaciones", async() => {
            await request.get("/api/mensajes/a")
            .expect(200)
            .expect((response) => {
                expect(response.body.length).toEqual(0)
            })
        })
    })
  console.log("---FIN TESTS CHAT---");
})

module.exports = {chatTestSuite}