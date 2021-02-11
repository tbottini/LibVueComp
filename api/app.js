const Application = require("./toolbox/application");
const config = require("../config").database;

module.exports = new Application({
  database: config.model,
  config: {
    database: config.name,
  }
});
