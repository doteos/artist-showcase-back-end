import * as express from 'express'
import {ShowcaseFacade} from "../main/ShowcaseFacade";
import {IControllerBase} from "../model/CustomInterfaces";

export class SpecificImageController implements IControllerBase {
    public path = '/showcase/:uid';
    public router = express.Router();

    constructor(facade: ShowcaseFacade) {
        this.initRoutes(facade);
    }

    public initRoutes(facade: ShowcaseFacade) {
        this.router.delete(this.path, facade.deleteImage);
    }
}
