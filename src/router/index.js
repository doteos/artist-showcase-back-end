// index.js
const { showcaseController } = require('../controller');

module.exports = (server) => {
  server.post('/showcase/artist/image', showcaseController.addArtistImage);
  server.get('/showcase/image', showcaseController.getImage);
  server.delete('/showcase/:uid', showcaseController.deleteImage);
};
