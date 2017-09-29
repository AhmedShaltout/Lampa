const express = require('express');
const mongoose = require('mongoose');
const dateFormat = require('dateformat');
const router = express.Router();
const task = require('../models/task_db.js');

// get all the tasks for a a user.
router.post('/get-task',(req,res)=>{
  if(req.session.user){
    task.find({EMAIL: req.session.user.EMAIL},(err,document)=>{
      if(!document){
        res.json({state:false,message:"No document found"});
      }else{
        res.json(document);
      }
    });
  }
});

// get all the tasks in selected day
router.post('/search-task',(req,res)=>{
  if(req.session.user){
    task.find({EMAIL: req.session.user.EMAIL, DATE: req.body.DATE},(err,document)=>{
      if(!document){
        res.json({state:false,message:"No document found"});
      }else{
        res.json(document);
      }
    });
  }
});

// add new task
router.post('/add-task',(req,res)=>{
  if(req.session.user){
     var newTask = req.body;
     newTask.DATE = dateFormat(newTask.DATE, 'isoDate');
     newTask.EMAIL = req.session.user.EMAIL;
    task.insertMany(newTask,(err,document)=>{
      if(!document){
        res.json({state:false,message:"No document found"})
      }else{
        res.json(document);
      }
    });
  }
});

// change task status
router.put('/update-task/:id',(req,res)=>{
  if(req.session.user){
    var updatedTask = req.body;
    task.findByIdAndUpdate(
        req.params.id,
        {
            $set: updatedTask
        },
        {
            new: true
        },
        (err,taskDone)=>{
            if(err){
                res.send(err);
            }else{
                res.json(taskDone);
            }
        }
    );
  }
});

//delete task
router.delete('/delete-task/:id',(req,res)=>{
  if(req.session.user){
    task.findByIdAndRemove(req.params.id,(err,taskDel)=>{
            if(err){
                res.send(err);
            }else{
                res.json(taskDel);
            }
        }
    );
  }
});

module.exports = router;
