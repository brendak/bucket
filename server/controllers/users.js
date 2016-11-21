var mongoose = require('mongoose');
var User = mongoose.model('User');
var BucketList = mongoose.model('BucketList')

module.exports = {
    register: function(req,res){
        if (req.body.password != req.body.pw_confirm){
            res.sendStatus(400);
        }else{
            var user = new User(req.body);
            user.save(function(err,user){
                if (err){
                    console.log('There were validation errors:', err)
                    res.json(err);
                }else{
                    req.session.user = {
                      name: user.name,
                      _id: user._id
                    }
                    res.sendStatus(200);
                }
            });
        }
   },
  login:function(req,res){
    var errors = {errors:{
      general:{
        message:'Invalid login information'
      }
    }}
    User.findOne({email:req.body.email}).exec(function(err,user){
      if(!req.body.email||!req.body.password || !user){
        res.json(errors)
      }else{
        if(user.password != req.body.password){
          res.json(errors);
        }else{
            req.session.user = {
              name: user.name,
              _id: user._id
            }
            res.send(user);
        }
      }
    })
  },
  logout: function(req,res){
    User.findOne({_id: req.session.userId}).exec(function(err, user){
      if (err){
        res.status(500).send("Failure");
      } else{
        req.session.destroy(function(){
          req.session=null;
        })
        res.json(user);
      }
  })
  },
  getCurrent: function(req,res){
    User.findOne({_id: req.session.user._id}).exec(function(err, user){
      if(err){
        res.sendStatus(400);
      }else{
        var u = {
            name:user.name,
           _id:user._id
         }
        res.json(u)
      }
    })
  },
getusers : function(req,res){
  console.log('Getting users from server')
  User.find({}, function(err, users){
    if (err) {
      res.sendStatus(500)
    }else {
      res.json(users)
    }
  })
},

show : function (req, res){
console.log(req.params.id)
BucketList.find({"$or":[{user: req.body.user}, {tagged: req.body.user}]}).populate('user').exec(function(err, buckets){
    if (err){
      res.status(500).send("Failure");
    } else{
      console.log("Showing user");
      res.json(buckets);
    }
})
}
}
