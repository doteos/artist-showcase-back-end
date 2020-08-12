import * as express from 'express'
import {ShowcaseFacade} from "../main/ShowcaseFacade";
import {IControllerBase} from "../custom/CustomInterfaces";
import * as Joi from "joi";
import Validator from "../middleware/Validator";
import {Authenticator} from "../middleware/Authenticator";

export class ArtistRegisterController implements IControllerBase {
    public static path = '/showcase/artist/register';
    public router = express.Router();
    private postSchemaQuery = Joi.object().keys({
        email: Joi.string().email().required(),
        artistName: Joi.string().min(1).max(18).required(),
        actualName: Joi.string().min(1).max(18).required(),
        clickUrl: Joi.string().uri().required(),
    });

    constructor(facade: ShowcaseFacade) {
        this.initRoutes(facade);
    }

    public initRoutes(facade: ShowcaseFacade) {
        this.router.use(ArtistRegisterController.path, express.urlencoded({extended: true}));
        this.router.use(ArtistRegisterController.path, express.json());
        this.router.post(ArtistRegisterController.path, [
                facade.checkIfReady(),
                Authenticator.validate(),
                Validator.validateJoi(this.postSchemaQuery, 'body')],
            (req, res, next) =>
                facade.addArtistAccount(req, res, next));
    }
}
