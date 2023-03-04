const { MongoClient } = require('mongodb');
let dbCon;
/** "mongodb://localhost:27017/SibasTpm" */
/*'mongodb+srv://isctem:isctem@isctemcluster.jwrxodo.mongodb.net/SIbasTpm?retryWrites=true&w=majority'*/

let a = 'mongodb+srv://isctem:isctem@isctemcluster.jwrxodo.mongodb.net/SIbasTpm?retryWrites=true&w=majority';
let b = 'mongodb://localhost:27017/SibasTpm';
module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(a)
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
