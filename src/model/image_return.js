// image_return.js
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const imageReturnSchema = new Schema({
  artistName: {
    type: String,
  },
  clickUrl: {
    type: String,
  },
  imageName: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

imageReturnSchema.plugin(mongoosePaginate);

const imageReturn = mongoose.model('image', imageReturnSchema);

module.exports = imageReturn;
