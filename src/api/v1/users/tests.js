const supertest = require("supertest")
const app = require ("../../../../index")
let request = {};
const TestSequencer = require("@jest/test-sequencer").default

const userTestSuite = () => describe("-----TESTS USUARIOS-----", () => {
  console.log("---EMPEZANDO TESTS USUARIOS---");
  beforeAll(() => {
    app.close()
    request = supertest(app)
  })
  
  const defaultUserId = "testeador@afhkredit.com";
  const defaultUserData = {
    nombre: "Test",
    apellidos: "AFH Kredit",
    email: defaultUserId,
    rol: "Admin",
    contactos: [],
    prestamos: []
  };
  
  const newUserId = "othertesteador@email.com";
  const newUserData = {
    nombre: "Otro",
    apellidos: "Test AFH",
    email: newUserId,
    rol: "Usuario",
    contactos: [],
    prestamos: []
  };

  const sendContactData = {
    nombre: "Otro",
    apellidos: "Test AFH",
    correo: newUserId,
    telefono: "",
    descripcion: ""
}
  describe("POST /users/create", () => {
  
    test("No deberian haber usuarios", async() => {
      await request.get("/api/users")
      .expect(404)
      .expect({message: "No hay usuarios"})
    })
  
    test("Deberia funcionar correctamente", async() => {
      resData = defaultUserData;
      
      await request.post("/api/users/create")
      .send(defaultUserData)
      .set("Accept", "application/json")
      .expect(201)
      .expect({message: "Usuario creado correctamente"})
  
    });
  
    test("Deberia decir que ya existe", async() => {
      await request.post("/api/users/create")
      .send(defaultUserData)
      .set("Accept", "application/json")
      .expect(400)
      .expect({message: "Usuario ya existente"})
    })
  })
  
  describe("GET /users", () => {
    test("Deberia haber 1 usuario", async() => {
      await request.get("/api/users")
      .expect(200)
      .expect(function(respuesta) {
        expect(respuesta.body.length).toEqual(1);
        expect(respuesta.body[0].email).toEqual(defaultUserId)
      })
    });
  
    test("Deberian haber 2 usuarios", async() => {
  
      await request.post("/api/users/create").send(newUserData)
  
      await request.get("/api/users")
      .expect(200)
      .expect(function(respuesta) {
        expect(respuesta.body.length).toEqual(2);
        expect(respuesta.body[0].email).toEqual(newUserId)
        expect(respuesta.body[1].email).toEqual(defaultUserId)
      })
    })
  })
  
  describe("GET /users/:id", () => {
    test("Deberia funcionar correctamente", async() => {
      await request.get("/api/users/"+defaultUserId)
      .expect(200)
      .expect(function(respuesta) {
        expect(respuesta.body).toEqual(defaultUserData)
      });
    });
  
    test("Deberia dar error 404", async() => {
      await request.get("/api/users/a")
      .expect(404)
      .expect({message: "Usuario no existente"})
    });
  });
  
  describe("PUT /users/update", () => {
    test("Deberia funcionar correctamente", async() => {
      let data = {
        id: defaultUserId,
        data: {
          rol:"Usuario",
          nombre: "Gestor"
        }
      };
  
      await request.put("/api/users/update")
      .send(data)
      .expect(204)
      .then(async() => {
        await request.get("/api/users/"+defaultUserId)
        .expect(function(res) {
          expect(res.body.rol).toEqual("Usuario");
          expect(res.body.nombre).toEqual("Gestor");
        });
      });
    });
  
    test("Deberia dar error 404", async() => {
      let data = {
        id: "a",
        data: {
          rol:"Usuario",
          nombre: "Gestor"
        }
      };
  
      await request.put("/api/users/update")
      .send(data)
      .expect(404)
    })
  });
  
  describe("DELETE /users/delete", () => {
    test("Deberia funcionar correctamente", async() => {
      await request.delete("/api/users/delete")
      .send({id:defaultUserId})
      .expect(204)
  
      await request.delete("/api/users/delete").send({id:newUserId})
    });
  });

  describe("POST /sendContactMail", () => {
    test("Deberia funcionar correctamente", async() => {
      await request.post("/api/sendContactMail")
      .send(sendContactData)
      .expect(200)
    });
  })

  console.log("---FIN TESTS USUARIOS---");
})

module.exports = {userTestSuite}