const mongoose = require('mongoose');
const { Schema } = mongoose;

const bucket_listSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tagged_user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Bucket_List', bucket_listSchema );
