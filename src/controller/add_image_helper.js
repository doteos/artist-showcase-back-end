const validUrl = require('valid-url');
const fs = require('fs');

module.exports = {
  /**
   * Validates the req body params and returns them from as a file.
   * @param req
   * @returns {string|{clickUrl: *, imageName: *, artistName: *, newFilePath: string}}
   */
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
        const newFilePath = `uploads/${imageName.replace(/ /g, '_')}_by_${artistName.replace(/ /g, '_')}`;
        fs.renameSync(`uploads/${req.file.filename}`, newFilePath);
        return {
          artistName,
          imageName,
          clickUrl,
          newFilePath,
        };
      } catch (e) {
        return `${e.toString()} with image file`;
      }
    } catch (e) {
      return `${e.toString()} when validating request body`;
    }
  },

  removeImageUpload: (filename) => {
    try {
      fs.unlinkSync(`uploads/${filename}`);
    } catch (e) {
      return `${e.toString()} when removing ${filename}`;
    }
    return true;
  },
};
