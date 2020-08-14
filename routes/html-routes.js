// Require path
let path = require("path");
const api_helper = require('./api-helper')
const isAuthenticated = require("../config/middleware/isAuthenticated");
var _ = require('lodash');

// Front-End Routes
module.exports = function(app) {

    // Index Route: Login page for users to login
    app.get('/', function(req, res){
        if (req.user){
        res.redirect('/members');
    };
        res.render('signup');
    })

    // Signup Route: Sign Up Page for Users to create an account
    app.get('/login', function(req, res){
       if (req.user){
        res.redirect('/members');
    };
        res.render('login');

    })

    // Users Route: Page a signed in user will view
    app.get('/members', function(req, res){

        api_helper.api_get('http://localhost:8080/api/bookmark')
        .then(response => {
            
            let newResponse = response
            let newCategory = _.groupBy(response, 'category')
            console.log(newCategory)
            console.log(response)
            const newObject = {
                category: newCategory, 
                bookmark: newResponse
             };
             console.log("new Object=" + newObject)
            res.render('members', {
               
            newObject: newObject
                
            })
            
        }).catch(error => {
            res.send(error)
        })
    });

    //delete
    // app.get('/members', function(req, res){
    //     api_helper.api_delete('http://localhost:8080/api/bookmarks/:id').then(
    //         res.render('members', {
    //             bookmarks: response
    //         })
    //     ).catch(error => {
    //         res.send(error)
    //     })
    // });

    app.get('/members',isAuthenticated, function(req, res){
        res.render('members');

    })
    
    // making this explicit because of link on signup page to login page
    app.get('/signup', function(req, res){
        res.render('signup');
    })

}