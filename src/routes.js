const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const multerS3 = require('multer-s3');
const Post = require('./config/models/post');

routes.get('/posts', async (req,res) =>{
    const posts = await Post.find();

    return res.json(posts); 
});

routes.post('/posts', multer(multerConfig).single('file'), async (req,res) =>{
    
    const { originalname: name, size, key, location: url = ''} = req.file;
    const {lat,lng} = req.body;
    console.log(req.body);
    
    const floodPoints = await Post.create({
        name,
        size,   
        key,
        url,
        location: '',
        lat,
        lng   
    });

    return res.json(floodPoints);
});

routes.delete('/posts/:id', async( req, res) =>{
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.send();
});

module.exports = routes;

