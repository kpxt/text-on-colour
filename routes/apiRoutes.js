// var db = require("../models");
var path = require("path");
var preconfigNet = require("../models/neuralNets/nnZero.json");
var { training } = require("../models/neuralNetZero");

module.exports = function (app) {
  // Get all colour preferences
  // app.get("/api/colour", function(req, res) {
  //   res.send(net);
  // });

  // Create a new colour preference
  app.post("/api/", function (req, res) {
    // send net when training is done as a response
    console.log(req.body);
    training(req.body, false, false, preconfigNet).then(function(data) {
      console.log(data);
      res.send(data);

    });
  });


};