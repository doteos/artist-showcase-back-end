// Post.js
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const PostSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

PostSchema.plugin(mongoosePaginate);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
