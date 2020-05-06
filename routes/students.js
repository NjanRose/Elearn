var express = require('express');
var router = express.Router();

User = require('../models/user');
Student = require('../models/student');
Class = require('../models/class');

router.get('/classes',function(req,res,next){
  Student.getStudentByUsername(req.user.username,function(err,student){
    if(err) throw err;
    console.log(student);
    res.render('students/classes',{student : student});
  });
});

router.post('/classes/register',function(req,res){
  info  = [];
  info['student_username'] = req.user.username;
  info['class_id'] = req.body.class_id;
  info['class_title'] = req.body.class_title;

  Student.register(info,function(err,student){
    if(err) throw err;
    console.log(student);
  });

  req.flash('success_msg','You have successfully registered to this class.');
  res.redirect('/students/classes');
});
module.exports = router;
