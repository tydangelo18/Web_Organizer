// Require path
let path = require("path");
const api_helper = require('./api-helper')
const isAuthenticated = require("../config/middleware/isAuthenticated");
var _ = require('lodash');
const db = require("../models");

// Front-End Routes
module.exports = function(app) {

    // Index Route: Login page for users to login
    app.get('/', function(req, res){
        if (req.user){
        res.redirect('/members');
        };
        res.render('login');
    });

    // Signup Route: Sign Up Page for Users to create an account
    app.get('/login', function(req, res){
       if (req.user){
        res.redirect('/members');
        };
        res.render('login');

    });

    // Users Route: Page a signed in user will view

    app.get('/members', function(req, res){

        api_helper.api_get('http://localhost:8080/api/bookmark').then(response => {
<<<<<<< HEAD
            console.log(response)
=======
            // console.log(response)

>>>>>>> 8c7cf1be891c4584b9a8c0388b1e57818ff7a8db
            let newCategory = _.groupBy(response, 'category')
            // res.render('members', Object.keys(newCategory).forEach(category => {
            //     $('.category-div').append(`h3= ${category.category}`)
            //     $('.bookmark-div').append(`a(href=${category.url} target='_blank')= ${category.url}`)
            //     $('.bookmark-div').append(`button.keyword= ${category.keyword}`)
            // }))
             res.render('members',{
                bookmarks: newCategory,
            })
        }).catch(error => {
            res.send(error)
        })
    });

    app.get('/category', function(req, res){

        api_helper.api_get('http://localhost:8080/api/bookmark/:category').then(response => {
            // console.log(response)

            let newCategory = _.groupBy(response, 'category')
             res.render('categories',{
                bookmarks: newCategory,
            })
        }).catch(error => {
            res.send(error)
        })
    });

    app.delete('/api/bookmark/:id', function(req, res) {
      db.Bookmark.destroy({
          where: {
              id: req.params.id
          }
          
      }).then (function(dbBookmark) {
          res.json(dbBookmark);
      });
    });

    app.get('/members',isAuthenticated, function(req, res){
        res.render('members');

    })
    
    // making this explicit because of link on signup page to login page
    app.get('/signup', function(req, res){
        res.render('signup');
    })

}
