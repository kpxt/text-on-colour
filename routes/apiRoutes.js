var db = require("../models");

module.exports = function(app) {
  // Get all colour preferences
  app.get("/api/", function(req, res) {
    db.placeholder.findAll({}).then(function(dbplaceholder) {
      res.json(dbplaceholder);
    });
  });

  // Create a new colour preference
  app.post("/api/", function(req, res) {
    db.placeholder.create(req.body).then(function(dbplaceholder) {
      res.json(dbplaceholder);
    });
  });


};
