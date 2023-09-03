const {userTestSuite} = require("./users/tests")
const {documentTestSuite} = require("./documents/tests")

describe("INICIO DE TESTS", () => {
    userTestSuite()
    documentTestSuite()
})