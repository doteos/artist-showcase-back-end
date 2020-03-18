// image_return.js
import mongoose from "mongoose";

import mongoosePaginate from "mongoose-paginate";

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

export default imageReturn;
