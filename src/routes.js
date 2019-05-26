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


routes.post('/posts/:lat/:lng/:type/:level', multer(multerConfig).single('file'), async (req,res) =>{
    
    const { originalname: name, size, key, location: url = ''} = req.file;
    const lat = req.params.lat;
    const lng = req.params.lng;
    const type = req.params.type;
    const level = req.params.level;
      
    const floodPoints = await Post.create({
        name,
        size,   
        key,
        url,
        location: '',
        lat,
        lng,
        type,
        level   
    }); 

    return res.json(floodPoints);
});

routes.delete('/posts/:id', async( req, res) =>{
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
});

module.exports = routes;

