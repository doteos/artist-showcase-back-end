import * as express from 'express'
import {ShowcaseFacade} from "../main/ShowcaseFacade";
import {IControllerBase} from "../custom/CustomInterfaces";
import {Authenticator} from "../middleware/Authenticator";
import {SessionManager} from "../helper/SessionManager";
import * as Express from "express";

export class SpecificImageController implements IControllerBase {
    public static path = '/showcase/:uid';
    public router = express.Router();

    constructor(facade: ShowcaseFacade, sessionManager: SessionManager) {
        this.initRoutes(facade, sessionManager);
    }

    public initRoutes(facade: ShowcaseFacade, sessionManager: SessionManager) {
        this.router.delete(SpecificImageController.path,
            [sessionManager.authenticateToken(), facade.checkIfReady()],
            (req: Express.Request, res: Express.Response, next: Function) =>
                facade.deleteImage(req, res, next));
    }
}
