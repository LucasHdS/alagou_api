require("dotenv").config();
const express = require('express'); 
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();

 //Database setup
 var mongo_url = "mongodb+srv://lucas:35761735@appdb-g7wf7.mongodb.net/test?retryWrites=true&w=majority";
    mongoose.connect(
    mongo_url,
    {
    useNewUrlParser: true  
    }
);
    
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.use(require("./routes"));

app.listen( process.env.PORT || 80);
