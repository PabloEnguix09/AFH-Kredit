var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const PORT = process.env.PORT || 5050
app.get('/', (req, res) => {
res.send('This is my project')
})
app.listen(PORT, function () {
console.log(`Project at: http://localhost:${PORT} !`); });

//module.exports = {app}
var jsonParser = bodyParser.json();

let users = require("./src/api/v1/users/api")

// users
app.get("/users", users.list);
app.get("/users/:id", users.get);
app.put("/users/update", jsonParser, users.update);
app.post("/users/create", jsonParser, users.create);
app.delete("/users/delete", jsonParser, users.delete);