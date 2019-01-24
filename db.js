/* ---------------------------------------------------------------------------------
   * @ description : This is the db configration file.
---------------------------------------------------------------------------------- */
const Mongoose = require("mongoose");
const config = require("./config/appConfig");
const env = require("./env")

// Connect to MongoDB
const db = config[env.instance].db

module.exports = async () => {
  // Build the connection string.
  // const mongoUrl = db.auth
  //   ? `mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${db.name}`
  //   : `mongodb://${db.host}:${db.port}/${db.name}`;

  Mongoose.Promise = global.Promise;
  Mongoose.set('useCreateIndex', true);
  
  Mongoose.connect(db.url, db.options, err => {
    if (err) {
      console.log('+++ DB Error', err);
    } else {
      console.log('+++ MongoDB Connected');
    }
  });
};
