import * as express from 'express'
import {ShowcaseFacade} from "../main/ShowcaseFacade";
import {IControllerBase} from "../custom/CustomInterfaces";
import {Authenticator} from "../middleware/Authenticator";
import {SessionManager} from "../helper/SessionManager";

export class ArtistLoginController implements IControllerBase {
    public static path = '/showcase/artist/login';
    public router = express.Router();

    constructor(facade: ShowcaseFacade, sessionManager: SessionManager) {
        this.initRoutes(facade, sessionManager);
    }

    public initRoutes(facade: ShowcaseFacade, sessionManager: SessionManager) {
        this.router.post(ArtistLoginController.path,
            [facade.checkIfReady(), Authenticator.authenticateEmailAndPassword()],
            (req, res, next) =>
                facade.getSessionToken(req, res, next));
    }
}
