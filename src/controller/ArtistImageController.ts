import * as express from 'express'
import {ShowcaseFacade} from "../main/ShowcaseFacade";
import * as multer from "multer";
import {IControllerBase} from "../custom/CustomInterfaces";
import * as Joi from "joi";
import Validator from "../middleware/Validator";
import {SessionManager} from "../helper/SessionManager";
import * as Express from "express";

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
            [facade.checkIfReady(), sessionManager.authenticateToken()],
            (req: Express.Request, res: Express.Response, next: Function) =>
                facade.getArtistImage(req, res, next));
        this.router.post(ArtistImageController.path,
            [facade.checkIfReady(), sessionManager.authenticateToken(),
                Validator.validateJoi(this.postSchemaQuery, 'body'),
                upload.single('image'), Validator.validateImageFile()],
            (req: Express.Request, res: Express.Response, next: Function) =>
                facade.addArtistImage(req, res, next));
    }
}
