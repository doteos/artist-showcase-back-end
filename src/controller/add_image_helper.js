const validUrl = require('valid-url');
const fs = require('fs');

module.exports = {
  getBodyParams: (req) => {
    try {
      const { artistName, imageName, clickUrl } = req.body;
      if (artistName.length > 18) {
        return 'artistName length is not <= 18';
      }
      if (imageName.length > 18) {
        return 'imageName length is not <= 18';
      }
      if (!validUrl.isUri(clickUrl)) {
        return 'clickUrl is not valid';
      }
      try {
        const imageFile = fs.statSync(`uploads/${req.file.filename}`);
        if (imageFile.size > 3000000) {
          return 'image size is over 3 megabytes';
        }
        return {
          artistName,
          imageName,
          clickUrl,
          imageFile,
        };
      } catch (e) {
        return `${e.toString()} with image file`;
      }
    } catch (e) {
      return `${e.toString()} when validating request body`;
    }
  },
};
