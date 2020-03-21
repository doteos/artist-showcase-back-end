import * as express from 'express'
import {ShowcaseController} from "./ShowcaseController";
import * as multer from "multer";
import {IControllerBase} from "../model/CustomInterfaces";

export class ArtistImageController implements IControllerBase {
    public path = '/showcase/artist/image';
    public router = express.Router();

    constructor(showcaseController: ShowcaseController) {
        this.initRoutes(showcaseController);
    }

    public initRoutes(showcaseController: ShowcaseController) {
        const upload = multer({dest: 'uploads/'});
        this.router.get(this.path, showcaseController.getArtistImage);
        this.router.post(this.path, upload.single('image'), showcaseController.addArtistImage);
    }
}
