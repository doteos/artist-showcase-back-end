import * as express from 'express'
import {ShowcaseFacade} from "../main/ShowcaseFacade";
import {IControllerBase} from "../custom/CustomInterfaces";
import {Authenticator} from "../middleware/Authenticator";

export class ArtistLoginController implements IControllerBase {
    public static path = '/showcase/artist/login';
    public router = express.Router();

    constructor(facade: ShowcaseFacade) {
        this.initRoutes(facade);
    }

    public initRoutes(facade: ShowcaseFacade) {
        this.router.post(ArtistLoginController.path,
            [Authenticator.authenticateEmailAndPassword()],
            (req, res, next) =>
                facade.getSessionToken(req, res, next));
    }
}
