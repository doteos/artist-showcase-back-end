const addHelper = require('./add_image_helper');

module.exports = {
  /**
   * Adds a valid artist image.
   * @returns {Promise<void>}
   */
  addArtistImage: async (req, res, next) => {
    // TODO: Each artist gets a UID, each image also gets UID
    // TODO: Make a PR to add image file to git repo
    // TODO: If PR merged, make db entry
    const params = addHelper.getBodyParams(req);
    if (typeof params !== 'string') {
      await res.status(200);
      res.send(params);
    } else {
      await res.status(400);
      res.send(params);
    }
    addHelper.removeImageUpload(req.file.filename);
    next();
  },

  /**
   * Returns a random image;
   * @returns {Promise<void>}
   */
  getImage: async (req, res, next) => {
    // TODO: Returns a random entry from database
    // TODO: Return format is JSONObject with imageUrl, imageName, clickUrl, artistName
    res.send('Received a GET HTTP method for getImage');
    next();
  },

  /**
   * Deletes an image;
   * @returns {Promise<void>}
   */
  deleteImage: async (req, res, next) => {
    // TODO: deletes a database entry based on uidArtist and uidImage
    res.send('Received a DELETE HTTP method for deleteImage');
    next();
  },
};
