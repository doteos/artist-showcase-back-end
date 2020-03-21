import {ShowcaseController} from "../controller/ShowcaseController";

export interface IControllerBase {
    initRoutes(showcaseController: ShowcaseController): any
}
