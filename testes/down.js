const { json } = require('body-parser');
var express = require('express');
var app = express();
var fs = require('fs');
var dd= require('./download');

app.get('/', function(req, res, next){
    res.send('You did not say the magic word');
});


app.get('/cnr', function(req, res, next){
    // download the file via aws s3 here
    var fileKey = req.query['fileKey'];
  console.log(req.query);
    console.log('Trying to download file', fileKey);
    var AWS = require('aws-sdk');
    AWS.config.update(
      {
        region: "ap-southeast-1",
        accessKeyId: "PIOURWUB34YLEJFK9M6K",
        secretAccessKey: "UdKy2ownGvJM3ottXMImtgI6bf8m8TcYje3RZnH8",
        endpoint: "s3.ap-southeast-1.wasabisys.com",
      }
    );
    var s3 = new AWS.S3();
    var options = {
      Bucket: "mts.imgbox",
        Key    : "Screenshot (288).png",
    };


   
    res.attachment(options.Key);
    var fileStream = s3.getObject(options).createReadStream();
    res.header('Content-Disposition');
  
    fileStream.pipe(res);
    
  
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('S3 Proxy app listening at http://%s:%s', host, port);
});