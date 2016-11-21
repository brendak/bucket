var mongoose = require('mongoose');
var BucketList = mongoose.model('BucketList');
var User = mongoose.model('User');
var Status = mongoose.model('Status');

module.exports = {
  addbucket : function(req, res){
    User.findOne({_id: req.session.user._id}, function(err, user){
    if(err){
       return res.sendStatus('500');
    }else{
    console.log('Adding bucket process');
    var newBucket = new BucketList(req.body);
    newBucket.user = req.session.user.id;
    newBucket.tagged.push(req.body.tagged)
    newBucket.save(function(err){
      user._buckets.push(newBucket);
      user.save(function(err){
        var newStatus = new Status(user._id, newBucket._id);
        newStatus.user = user;
        newStatus.bucketlist = newBucket;
        newStatus.save(function(err){
          if(err){
            console.log('Error in creating bucket');
            return res.sendStatus('400');
          } else {
            console.log("Added bucket")
            req.session.user = user;
            res.json(newBucket);
          }
       })
    })
 })
 }
})
},
  getBuckets : function(req,res){
    console.log('Getting bucket')
    BucketList.find({}, function(err, buckets){
      if (err) {
        res.sendStatus(500)
      }else {
        res.json(buckets)
      }
    })
  }
}

  // updateStatus: function(req,res){
  //     User.findOne({_id: req.session.user._id}, function(err, user){
  //        if(err){
  //           return res.sendStatus('500');
  //        }else{
  //           User.findOne({_id: req.session.user._id}, function(err, user){
  //              if(err){
  //                 return res.sendStatus('500');
  //              }else{
  //                 var status = new Status(user);
  //                 status.status = "checked";
  //                 status.save(function(err){
  //                   if(err){
  //                     return res.sendStatus('400');
  //                   } else {
  //                     res.json(status);
  //              }
  //           })
  //        }
  //     })
  //  }
  // })
