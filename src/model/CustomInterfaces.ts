import {ShowcaseFacade} from "../main/ShowcaseFacade";

export interface IControllerBase {
    initRoutes(facade: ShowcaseFacade): any
}

export interface AddArtistImageModel {
    artistName: string
    imageName: string
    clickUrl: string
    image: Express.Multer.File
}
