var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency

mongoose.connect('mongodb://localhost/commentDB', { useNewUrlParser: true }); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Comment: String,
    Done: String
});

var userSchema = mongoose.Schema({ //Defines the Schema for this database
    Name: String,
    Password: String
});

var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model
var Login = mongoose.model('Login', userSchema);

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
    console.log('Connected');
});


router.post('/comment', function(req, res, next) {
    console.log("POST comment route");
    console.log(req.body);

    var newcomment = new Comment(req.body);
    console.log(newcomment);
    newcomment.save(function(err, post) {
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});


router.get('/comment', function(req, res, next) {
    console.log("In the GET route?");
    var find = req.query.q;
    Comment.find(function(err, commentList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
            console.log(commentList); //Otherwise console log the comments you found
            res.json(commentList);
        }
    })
});


router.post('/login', function(req, res, next) {
    console.log("POST login route");
    console.log(req.body.Name);
    Login.find({ Name: req.body.Name }, function(err, commentList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
            if (Object.keys(commentList).length === 0) {
                var newuser = new Login(req.body);
                newuser.save(function(err, post) {
                    if (err) return console.error(err);
                    console.log(post);
                    res.sendStatus(200);
                });
            }
            else {
                res.sendStatus(409);
                console.log("Too many users!");
            }
        }
    })
});


router.get('/login', function(req, res, next) {
    console.log("In the login route?");
    var use = req.query.use;
    var pass = req.query.pass;
    console.log(use);
    Login.find({ Name: use }, function(err, commentList) { //Calls the find() method on your database
        if (err) return console.error(err); //If there's an error, print it out
        else {
            res.json(commentList);
        }
    })
});

module.exports = router;
