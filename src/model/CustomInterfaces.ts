import {ShowcaseController} from "../controller/ShowcaseController";

export interface IControllerBase {
    initRoutes(showcaseController: ShowcaseController): any
}

export interface AddArtistImageModel {
    artistName: string
    imageName: string
    clickUrl: string
    image: Express.Multer.File
}
