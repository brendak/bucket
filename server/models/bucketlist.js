console.log('BucketList')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BucketListSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  user: { type: Schema.Types.ObjectId, ref: "User"},
  tagged: [{type: Schema.Types.ObjectId, ref: 'User'}],
  checked: {type: Boolean, required: true, default: false}
  },{timestamps: true}
);

mongoose.model('BucketList', BucketListSchema);
