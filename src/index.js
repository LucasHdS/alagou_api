require("dotenv").config();
const express = require('express'); 
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
// const https = require('https');
// 'use strict';
const app = express();

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://lucas:Wfj1YhFBib1NoeZs@appdb-g7wf7.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
// });

 //Database setup
 var mongo_url = "mongodb+srv://lucas2:1234mudar@appdb-g7wf7.mongodb.net/test?retryWrites=true&w=majority";
    mongoose.connect(
    mongo_url,
    {
    useNewUrlParser: true  
    }
);

// const rootCas = require('ssl-root-cas')
//     .inject()
//     .addFile(__dirname + '/ssl/Geotrust Cross Root CA.txt');

// const keyPath = path.join(__dirname, './ssl/key.pem');
// const certPath = path.join(__dirname, './ssl/server.crt');

// const sslOptions = {
//     key : fs.readFileSync(keyPath,'utf8'),
//     cert : fs.readFileSync(certPath,'utf8')
// };
    
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.use(require("./routes"));

app.listen( process.env.PORT || 3000);

// server = https.createServer(sslOptions);
// server.on('request', app);
// server.listen((process.env.PORT || 3000), function(){
//   console.log('Listening on https://' + server.address().address + ':' + server.address().port);
// });

//https.createServer(sslOptions,app).listen(process.env.PORT || 3000);
