const express = require("express");
const router = express.Router();

const user = require("./users/urls")
const documents = require("./documents/urls")

router.use("", user.routes)
router.use("", documents.routes)

module.exports = {
    routes: router
}