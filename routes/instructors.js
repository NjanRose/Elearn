var express = require('express');
var router = express.Router();

User = require('../models/user');
Instructor = require('../models/instructor');
Class = require('../models/class');

router.get('/classes',function(req,res,next){
  Instructor.getInstructorByUsername(req.user.username,function(err,instructor){
    if(err) throw err;
    res.render('instructors/classes',{instructor : instructor});
  });
});

router.get('/classes/:id/lessons/new',function(req,res,next){
  res.render('instructors/newlesson',{class_id:req.params.id});
});

router.post('/classes/:id/lessons/new',function(req,res,next){
  var info = [];
  info['class_id'] = req.params.id;
  info['lesson_number'] = req.body.lesson_number;
  info['lesson_title'] = req.body.lesson_title;
  info['lesson_body'] = req.body.lesson_body;

  Class.addLesson(info, function(err , lesson){
    console.log('Lesson Added');
    req.flash('success_msg','Lesson added.');
    res.redirect('/instructors/classes');
  });
});

router.post('/classes/register',function(req,res){
  info  = [];
  info['instructor_username'] = req.user.username;
  info['class_id'] = req.body.class_id;
  info['class_title'] = req.body.class_title;

  Instructor.register(info,function(err,instructor){
    if(err) throw err;
    console.log(instructor);
  });

  req.flash('success_msg','You have successfully registered.');
  res.redirect('/instructors/classes');
});




module.exports = router;
