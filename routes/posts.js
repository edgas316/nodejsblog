var express = require('express')
var router = express.Router()
var mongo = require('mongodb')
var db = require('monk')('localhost/nodejsblog')

router.get('/add', function(req,res,next){
    res.render('addpost',{
        "title":"Add Post"
    })
})

router.post('/add',function(req,res,next){
    // get form values
    var title       = req.body.title,
        category    = req.body.category,
        body        = req.body.body,
        author      = req.body.author,
        date        = new Date()
    
    if(req.files.mainimage){
        var mainImageOriginalName   = req.files.mainimage.originalname
        var mainImageName           = req.files.mainimage.name
        var mainImageMime           = req.files.mainimage.mimetype
        var mainImagePath           = req.files.mainimage.path
        var mainImageExt            = req.files.mainimage.extension
        var mainImageSize           = req.files.mainimage.size
    }else{
        var mainimagename = 'noimage.png'
    }
    
    // Validation
    req.checkBody()
})

module.exports = router