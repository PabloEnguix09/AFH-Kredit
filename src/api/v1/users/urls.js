const express = require("express");
const api = require("./api");
const router = express.Router();


router.get("/users", api.list);
router.get("/users/:id", api.get);
router.put("/users/update", api.update);
router.post("/users/create", api.create);
router.delete("/users/delete", api.delete);
router.post("/login", api.login);

module.exports = {
    routes: router
}