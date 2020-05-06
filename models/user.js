var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var UserSchema = mongoose.Schema({
  username:{type:String},
  email:{type:String},
  password:{type:String,bcrypt:true},
  type:{type:String}
});
var User = module.exports = mongoose.model('User',UserSchema);
//Get user by id
module.exports.getUserById = function(id,callback){
  User.findById(id,callback).lean();
}
//Get user by username
module.exports.getUserByUsername = function(username,callback){
  var query = {username:username}
  User.findOne(query,callback).lean();
}

//Compare password
module.exports.comparePassword = function(candidatePassword,hash,callback){
  bcrypt.compare(candidatePassword,hash,function(err,isMatch){
    if(err) throw err;
    callback(null,isMatch);
  });
}

//Create new Student User
module.exports.saveStudent = function(newUser , newStudent , callback){
  bcrypt.hash(newUser.password , 10, function(err,hash){
    if(err) throw errl;
    //Set hash
    newUser.password = hash;
    console.log('Student is being saved.');
    newUser.save(function (err, user) {
      if (err) return console.error(err);
      console.log(newUser.username + " saved to users db.");
    });
    newStudent.save(function (err, student) {
      if (err) return console.error(err);
      console.log(newStudent.first_name + " saved to students db.");
    });
    //async.parallel([newUser.save, newStudent.save],callback);
  });
}

//create new instructor user
module.exports.saveInstructor = function(newUser,newInstructor,callback){
  bcrypt.hash(newUser.password,10,function(err,hash){
    if(err) throw err;
    //Set hash
    newUser.password = hash;
    console.log('Student is being saved.');
    newUser.save(function (err, user) {
      if (err) return console.error(err);
      console.log(newUser.username + " saved to users db.");
    });
    newInstructor.save(function (err, instructor) {
      if (err) return console.error(err);
      console.log(newInstructor.first_name + " saved to instructors db.");
    });
  });
}
