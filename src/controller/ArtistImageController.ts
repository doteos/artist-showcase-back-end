import * as express from 'express'
import {ShowcaseFacade} from "../main/ShowcaseFacade";
import * as multer from "multer";
import {IControllerBase} from "../custom/CustomInterfaces";
import * as Joi from "joi";
import Validator from "../middleware/Validator";
import {Authenticator} from "../middleware/Authenticator";
import {SessionManager} from "../helper/SessionManager";

export class ArtistImageController implements IControllerBase {
    public static path = '/showcase/artist/image';
    public router = express.Router();
    private postSchemaQuery = Joi.object().keys({
        artistName: Joi.string().min(1).max(18).required(),
        imageName: Joi.string().min(1).max(18).required(),
        clickUrl: Joi.string().uri().required(),
        image: Joi.required()
    });

    constructor(facade: ShowcaseFacade, sessionManager: SessionManager) {
        this.initRoutes(facade, sessionManager);
    }

    public initRoutes(facade: ShowcaseFacade, sessionManager: SessionManager) {
        const upload = multer({dest: 'uploads/'});
        this.router.get(ArtistImageController.path,
            [facade.checkIfReady()],
            (req, res, next) =>
                facade.getArtistImage(req, res, next));
        this.router.post(ArtistImageController.path,
            [facade.checkIfReady(), sessionManager.authenticateToken(),
                Validator.validateJoi(this.postSchemaQuery, 'body'),
                upload.single('image'), Validator.validateImageFile()],
            (req, res, next) =>
                facade.addArtistImage(req, res, next));
    }
}
