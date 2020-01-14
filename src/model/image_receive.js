// image_receive.js
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const { Schema } = mongoose;

const imageReceiveSchema = new Schema({
  artistName: {
    type: String,
  },
  clickUrl: {
    type: String,
  },
  imageName: {
    type: String,
  },
});

imageReceiveSchema.plugin(mongoosePaginate);

const imageReturn = mongoose.model('image', imageReceiveSchema);

module.exports = imageReturn;
