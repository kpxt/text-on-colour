// var db = require("../models");
var net = require("../models/neuralNets/nnZero.json")
module.exports = function(app) {
  // Get all colour preferences
  app.get("/api/colour", function(req, res) {
    res.send(net);
  });

  // Create a new colour preference
  app.post("/api/", function(req, res) {

  });


};
