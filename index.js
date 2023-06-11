var express = require('express');
var app = express();
const cors = require("cors")
const config = require("./config");
const PORT = process.env.PORT || 5050
const bodyParser = require("body-parser");
app.get('/', (req, res) => {
res.send('This is my project')
})

var routes = require("./src/api/v1/users/urls")

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())

app.use("/api", routes.routes)

let server = app.listen(PORT, function () {
    console.log("Project at: %s", config.url); 
});

module.exports = server
