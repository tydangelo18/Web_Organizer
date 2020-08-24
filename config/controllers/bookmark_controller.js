const express = require('express');
const bookmark = require('../models/bookmark.js');
const router = express.Router();

// Create all our routes and set up logic within those routes where required.

//changing / to /members to link to members page
router.get("/members", function(req, res) {
  bookmark.all(function(data) {
    const pugObject = {
      bookmark: data
    };
    // console.log(pugObject);
    //also changing index to members to render the members.pug page
    res.render("members", pugObject);
  });
});