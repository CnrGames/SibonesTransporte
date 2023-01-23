const { MongoClient } = require("mongodb");
let dbCon;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect("mongodb://localhost:27017/SibasTpm")
      .then((client) => {
        dbCon = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbCon,
};
