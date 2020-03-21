import * as express from 'express'
import {ShowcaseController} from "./ShowcaseController";
import {IControllerBase} from "../model/CustomInterfaces";

export class SpecificImageController implements IControllerBase {
    public path = '/showcase/:uid';
    public router = express.Router();

    constructor(showcaseController: ShowcaseController) {
        this.initRoutes(showcaseController);
    }

    public initRoutes(showcaseController: ShowcaseController) {
        this.router.delete(this.path, showcaseController.deleteImage);
    }
}
