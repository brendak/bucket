var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = new mongoose.Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  bucket: {type: Schema.Types.ObjectId, ref: 'BucketList'},
  status: {type: String, default:'unchecked'},
}, {timestamps: true});

var Status = mongoose.model('Status', StatusSchema)
