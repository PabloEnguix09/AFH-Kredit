const {userTestSuite} = require("./users/tests")
const {documentTestSuite} = require("./documents/tests")
const {chatTestSuite} = require("./messages/tests")

describe("INICIO DE TESTS", () => {
    userTestSuite()
    documentTestSuite()
    chatTestSuite()
})