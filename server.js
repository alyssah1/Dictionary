const express = require('express');
const path = require('path');
const db = require(path.join(__dirname, './models'));

const PORT = process.env.PORT || 8080;
const app = express();

//parse parameters
app.use(express.urlencoded({extended: true}));
app.use(express.json());

db.sequelize.sync().then(() => {
    //bind server.
    app.listen(PORT, () => {
        console.log("Server is now listening on port: " + PORT);
    });
});