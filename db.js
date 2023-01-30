const { MongoClient } = require('mongodb');
let dbCon;
/** "mongodb://localhost:27017/SibasTpm" */
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(
      'mongodb+srv://isctem:isctem@isctemcluster.jwrxodo.mongodb.net/SIbasTpm?retryWrites=true&w=majority'
    )
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
