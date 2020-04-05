import * as express from 'express'
import {ShowcaseFacade} from "../main/ShowcaseFacade";
import {IControllerBase} from "../custom/CustomInterfaces";
import * as Joi from "joi";
import Validator from "../middleware/Validator";
import {Authenticator} from "../middleware/Authenticator";

export class ArtistController implements IControllerBase {
    public static path = '/showcase/artist';
    public router = express.Router();
    private postSchemaQuery = Joi.object().keys({
        artistName: Joi.string().min(1).max(18).required(),
        actualName: Joi.string().min(1).max(18).required(),
        clickUrl: Joi.string().uri().required(),
    });

    constructor(facade: ShowcaseFacade) {
        this.initRoutes(facade);
    }

    public initRoutes(facade: ShowcaseFacade) {
        this.router.post(ArtistController.path, [
                Validator.validateJoi(this.postSchemaQuery, 'body'),
                Authenticator.validate()],
            (req, res, next) =>
                facade.addArtistAccount(req, res, next));
    }
}
