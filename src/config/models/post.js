const mongoose = require ('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const s3 = new aws.S3();

const PostSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    location: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lng: Number,
    lat: Number,
    type: String,
    level: String,
    confirmations: {
        type: Number,
        default: 0
    },
    deviceId: String,
    updateAt: Date
},
{
    timestamps: {
        updatedAt: true
    }
});

PostSchema.pre('save', function(){
    if(!this.url){
        this.url = `http://3.16.180.128:3000/files/${this.key}`;
    }
});

PostSchema.pre('remove',function(){
    if(process.env.STORAGE_TYPE === 's3'){
        return s3.deleteObject({
            Bucket: 'water-images',
            Key: this.key
        }).promise();
    } else{
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', this.key));
    }
});

module.exports = mongoose.model('Post', PostSchema);