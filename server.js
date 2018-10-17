// load express and handlebars
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const path = require("path");

// load sequelize models
const db = require(path.join(__dirname, "models"));

// install body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// load Handlebars template engine
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");
// load and use routes set in the controller
// require('./controllers/textoncolourController.js')(app);

// set static resources
app.use(express.static(path.join(__dirname, 'public')));

app.set("port", process.env.PORT || 8080);
db.sequelize.sync().then(() => {
    app.listen(app.get("port"), function () {
        console.log("Listening on port " + app.get("port"));
    });
});

