import * as express from 'express'
import {ShowcaseFacade} from "../main/ShowcaseFacade";
import {IControllerBase} from "../custom/CustomInterfaces";

export class SpecificImageController implements IControllerBase {
    public static path = '/showcase/:uid';
    public router = express.Router();

    constructor(facade: ShowcaseFacade) {
        this.initRoutes(facade);
    }

    public initRoutes(facade: ShowcaseFacade) {
        this.router.delete(SpecificImageController.path, facade.deleteImage);
    }
}
