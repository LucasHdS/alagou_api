const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const multerS3 = require('multer-s3');
const Post = require('./config/models/post');

routes.get('/posts', async (req,res) =>{
    const floodPoints = await Post.find();

    return res.json(floodPoints); 
});

routes.get('/posts/:id', async (req,res) =>{
    const floodPoint = await Post.findById(req.params.id);

    return res.json(floodPoint); 
});

routes.get('/posts/userpoint/:deviceID', async (req,res) =>{
    const userFloodPoint = await Post.find({deviceId: { $eq: req.params.deviceID }});

    return res.json(userFloodPoint);
})

routes.post('/posts/:lat/:lng/:type/:level/:deviceId', multer(multerConfig).single('file'), async (req,res) =>{
    
    const { originalname: name, size, key, location: url = ''} = req.file;
    const lat = req.params.lat;
    const lng = req.params.lng;
    const type = req.params.type;
    const level = req.params.level;
    const deviceId = req.params.deviceId;
      
    const floodPoints = await Post.create({
        name,
        size,   
        key,
        url,
        location: '',
        lat,
        lng,
        type,
        level,
        deviceId   
    }); 

    return res.json(floodPoints);
});

routes.post('/posts/confirmPoint/:id', async(req, res) =>{
    const update = await Post.findByIdAndUpdate(req.params.id,{$inc: {confirmations : 1}})
    return res.json(update);

});

routes.post('/posts/unconfirmPoint/:id', async(req, res) =>{
    const update = await Post.findByIdAndUpdate(req.params.id,{$inc: {confirmations : -1}})
    return res.json(update);

});


routes.delete('/posts/:id', async( req, res) =>{
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
});


module.exports = routes;

