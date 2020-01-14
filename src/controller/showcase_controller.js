module.exports = {
  /**
   * Adds a valid artist image.
   * @returns {Promise<void>}
   */
  addArtistImage: async (req, res, next) => {
    // - takes imageFile, imageName, artistUrl, artistName
    // - Check for validity
    // - Each artist gets a UID, each image also gets UID
    // - Rename file to uid-imageName-artistName.jpg
    // - Make a PR to add image file to git repo
    // - If PR merged, make MongoDB entry with: uid, imageFileUrl, imageName, artistUrl, artistName
    res.send(req.body);
    next();
  },

  /**
   * Returns a random image;
   * @returns {Promise<void>}
   */
  getImage: async (req, res, next) => {
    // - Returns a random entry from database
    // - Return format is JSONObject with imageUrl, imageName, artistUrl, artistName
    res.send('Received a GET HTTP method for getImage');
    next();
  },

  /**
   * Deletes an image;
   * @returns {Promise<void>}
   */
  deleteImage: async (req, res, next) => {
    // - Returns a random entry from database
    // - Return format is JSONObject with imageUrl, imageName, artistUrl, artistName
    res.send('Received a DELETE HTTP method for deleteImage');
    next();
  },
};
