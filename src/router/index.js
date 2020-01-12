// index.js
const { showcaseController } = require('../controller');

module.exports = (app) => {
  app.post('/showcase/artist/image', showcaseController.addArtistImage);
  app.get('/showcase/image', showcaseController.getImage);
  app.delete('/showcase/{uid}', showcaseController.deleteImage);
};
