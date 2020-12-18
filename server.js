const express = require('express');
const path = require('path');
const db = require(path.join(__dirname, './models'));
var exphbs = require("express-handlebars");

const PORT = process.env.PORT || 8080;
const app = express();

//parse parameters
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//config express handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(require('./routes/authentication'));

//sync models before active server
db.sequelize.sync({force: true}).then(() => {
    //bind server.
    app.listen(PORT, () => {
        console.log("Server is now listening on port: " + PORT);
    });
});