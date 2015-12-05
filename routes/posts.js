var express = require('express')
var router = express.Router()
var mongo = require('mongodb')
var db = require('monk')('localhost/nodejsblog')
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/images/uploads');
    }, 
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
}); 
var upload = multer({ storage: storage});

router.get('/add', function(req,res,next){
    var categories = db.get('categories')
    
    categories.find({},{}, function(err, categories){
        res.render('addpost',{
            "title":"Add Post",
            "categories":categories
        })
    })
    
})

router.post('/add', upload.single('mainimage'), function(req,res,next){
    // get form values
    var title           = req.body.title,
        category        = req.body.category,
        body            = req.body.body,
        author          = req.body.author,
        date            = new Date(),
        mainImageName
    
    if(req.file){
        var mainImageOriginalName   = req.file.originalname
        mainImageName               = req.file.name
        var mainImageMime           = req.file.mimetype
        var mainImagePath           = req.file.path
        var mainImageExt            = req.file.extension
        var mainImageSize           = req.file.size
    }else{
        mainImageName = 'noimage.png'
    }
    
    // Validation
    
    req.checkBody('title', 'Title field is required').notEmpty()
    req.checkBody('body', 'Body Field is required').notEmpty()
    
    // Check Errors
    var errors = req.validationErrors()
    
    if(errors){
        res.render('addpost', {
            "errors":errors,
            "title":title,
            "body":body
        })
    }else{
        var posts = db.get('posts')
        
        // Submit to DB
        posts.insert({
            "title":title,
            "body":body,
            "category":category,
            "date":date,
            "author":author,
            "mainimage":mainImageName
        },function(err,post){
            if(err){
                res.send('There was an issue submitting the post')
            }else{
                req.flash('success', 'Post Submitted')
                res.location('/')
                res.redirect('/')
            }
        })
    }
})

module.exports = router