// image_receive.js
import mongoose from "mongoose";

import mongoosePaginate from "mongoose-paginate";

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

export default imageReturn;
