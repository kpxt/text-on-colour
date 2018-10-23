// var db = require("../models");
var path = require("path");
var fs = require("fs");
var preconfigNet = require("../models/neuralNets/nnZero.json");
console.log(preconfigNet);
var { training } = require("../models/neuralNetZero");

module.exports = function (app) {
  // Get the neural net as a JSON object
  app.get("/api/neuralNet", function (req, res) {
    try {
      fs.readFile(path.join(__dirname, "..", "models", "neuralNets", "writeTrain.json"), "utf8", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          res.send(JSON.parse(data));
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  });

  // Create a new colour preference
  app.post("/api/", function (req, res) {
    // retrieve the new neural net file after post
    // send net when training is done as a response
    training(req.body, true, false, preconfigNet).then(function (data) {
      res.send(data);
    });
  });
};