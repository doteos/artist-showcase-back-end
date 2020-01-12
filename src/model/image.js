// image.js
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const imageSchema = new Schema({
  artistName: {
    type: String,
  },
  artistUrl: {
    type: String,
  },
  imageName: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

imageSchema.plugin(mongoosePaginate);

const image = mongoose.model('image', imageSchema);

module.exports = image;
