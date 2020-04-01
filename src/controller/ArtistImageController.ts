import * as express from 'express'
import {ShowcaseFacade} from "../main/ShowcaseFacade";
import * as multer from "multer";
import {IControllerBase} from "../custom/CustomInterfaces";
import * as Joi from "joi";
import Validator from "../middleware/Validator";

export class ArtistImageController implements IControllerBase {
    public static path = '/showcase/artist/image';
    public router = express.Router();
    private schemaQuery = Joi.object().keys({
        artistName: Joi.string().min(1).max(18).required(),
        imageName: Joi.string().min(1).max(18).required(),
        clickUrl: Joi.string().uri().required(),
        image: Joi.required()
    });

    constructor(facade: ShowcaseFacade) {
        this.initRoutes(facade);
    }

    public initRoutes(facade: ShowcaseFacade) {
        const upload = multer({dest: 'uploads/'});
        this.router.get(ArtistImageController.path, (req, res, next) =>
            facade.getArtistImage(req, res, next));
        this.router.post(ArtistImageController.path, [Validator.validateJoi(this.schemaQuery, 'body'),
                upload.single('image'), Validator.validateImageFile()],
            (req, res, next) => facade.addArtistImage(req, res, next));
    }
}
