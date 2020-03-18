// index.ts
import * as multer from "multer";
import ShowcaseController from "../controller/showcase_controller";
import {Express} from "express";

const upload = multer({dest: 'uploads/'});

export default (server: Express) => {
    server.post('/showcase/artist/image', upload.single('image'), ShowcaseController.addArtistImage);
    server.get('/showcase/image', ShowcaseController.getImage);
    server.delete('/showcase/:uid', ShowcaseController.deleteImage);
}
