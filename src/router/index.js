// index.js
const multer = require('multer');
const { showcaseController } = require('../controller');

const upload = multer({ dest: 'uploads/' });

module.exports = (server) => {
  server.post('/showcase/artist/image', upload.single('image'), showcaseController.addArtistImage);
  server.get('/showcase/image', showcaseController.getImage);
  server.delete('/showcase/:uid', showcaseController.deleteImage);
};
