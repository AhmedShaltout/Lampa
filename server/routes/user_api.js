const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const user_login = require('../models/user_db.js');

//login
router.post('/login',(req, res)=> {
  if(!req.session.user){
    user_login.findOne({EMAIL:req.body.EMAIL},(err, user)=> {
      if(!user){
        res.json({state:false,message:"No Document found"});
      }else{
        // compare the password with the hash password
        bcrypt.compare(req.body.PASSWORD, user.PASSWORD, function(err, ans) {
          if(ans){
            req.session.user = {EMAIL:user.EMAIL,PASSWORD: user.PASSWORD};
            res.json(user);
          }else{
            res.json({state:false,message:"email or password not correct"});
          }
        });
      }
    });
  }
});

//add new user
router.post('/add-user',(req,res) => {
  var newUser = req.body;
  //hash the user password
  bcrypt.hash(newUser.PASSWORD, saltRounds, function(err, hash) {
    newUser.PASSWORD = hash;
    user_login.insertMany(newUser,(err,document)=>{
      if(!document){
        res.json({state:false,message:"No document found"})
      }else{
        res.json(document);
      }
    });
  });
});

// end user session
router.post('/logout',(req,res) => {
  req.session.destroy();
});

//check if a user logged in.
router.post('/isLogged', (req,res) => {
  if(req.session.user){
    res.json({state: true});
  }else {
    res.json({state: false});
  }
});

module.exports = router;
