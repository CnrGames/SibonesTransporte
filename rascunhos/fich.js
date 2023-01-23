const AWS = require("aws-sdk");

const dados = {
  region: "ap-southeast-1",
  accessKeyId: "PIOURWUB34YLEJFK9M6K",
  secretAccessKey: "UdKy2ownGvJM3ottXMImtgI6bf8m8TcYje3RZnH8",
  endpoint: "s3.ap-southeast-1.wasabisys.com",
};

// Connection
// This is how you can use the .aws credentials file to fetch the credentials
const credentials = new AWS.SharedIniFileCredentials({ profile: "wasabi" });
AWS.config.credentials = credentials;
AWS.config.credentials.accessKeyId = dados.accessKeyId;
AWS.config.credentials.secretAccessKey = dados.secretAccessKey;

// Set the AWS region. us-east-1 is default for IAM calls.
AWS.config.region = dados.region;
// Set an endpoint.
const ep = new AWS.Endpoint(dados.endpoint);
// Create an S3 client
const s3 = new AWS.S3({ endpoint: ep });

//Get Bucket
const object_get_params = {
  Bucket: "mts.imgbox",
  Key: "Lucas.txt",
};

// s3.getObject(object_get_params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else console.log(data); // successful response
// });

function loadFilesFromS3() {
  var params = {
    Bucket: object_get_params.Bucket,
  };
}

// Create the parameters for calling listObjects
var bucketParams = {
  Bucket: object_get_params.Bucket,
  Delimiter: "/",
};

// Call S3 to obtain a list of the objects in the bucket
// let lista = s3.listObjects(bucketParams, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     return data.Contents.json();
//     //console.log("Success", listo[23].Key);
//   }
// });

//Listar
const lista = s3
  .listObjects(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("==============Success==============");
    }
  })
  .promise();

//Filtrar Pesquisa
/*
const lista = s3
  .listObjectsV2(bucketParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("=================================");
    }
  })
  .promise();

lista.then((ls) => {
  const items = ls.Contents.filter((i) => i.Key.endsWith("png"));

  for (let x = 0; x < items.length; x++) {
    const ex = items[x].Key;
    console.log(ex);
  }
});
*/

lista.then((ls) =>
  console.log(
    ls.Contents.map((e) => {
      return e.Key;
    })
  )
);
lista.catch((ks) => console.log(ks));

console.log(lista.Contents);
//console.log("terminou");
