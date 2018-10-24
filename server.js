// load express and handlebars
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const path = require("path");

// load sequelize models
// const db = require(path.join(__dirname, "models"));

// install body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// load Handlebars template engine
app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// set static resources
app.use(express.static(path.join(__dirname, "public")));

// load controller
require(path.join(__dirname, "routes", "apiRoutes"))(app);
require(path.join(__dirname, "routes", "htmlRoutes"))(app);

app.set("port", process.env.PORT || 8080);
// db.sequelize.sync().then(() => {
app.listen(app.get("port"), function () {
	console.log("Listening on port " + app.get("port"));
});

// });


