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
  Key: "lastro/pdf/doc/Cua.txt",
};

console.log("Cnr games");
// upload object to previously created "examplebucket"
s3.putObject(object_get_params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data); // successful response
});
