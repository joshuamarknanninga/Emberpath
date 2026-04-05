const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialPost', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, maxlength: 400 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
