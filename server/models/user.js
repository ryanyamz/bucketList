const mongoose = require('mongoose');

const { Schema } = mongoose;
  const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bucket_lists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bucket_List'
      }
    ]
  }, {
    timestamps: true
  });

module.exports = mongoose.model('User', userSchema);
