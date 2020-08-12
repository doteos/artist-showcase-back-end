import {ShowcaseFacade} from "../main/ShowcaseFacade";
import {Router} from "express";
import {SessionManager} from "../helper/SessionManager";

export interface IControllerBase {
    router: Router;

    initRoutes(facade: ShowcaseFacade, sessionManager: SessionManager): any;
}

export interface IAddArtistModel {
    email: string
    artistName: string
    actualName: string
    clickUrl: string
    password: string
}

export interface IUser {
    email: string
    artistName: string
    actualName: string
    clickUrl: string
    hashed: string
}

export interface IAddArtistImageModel {
    artistName: string
    imageName: string
    clickUrl: string
    imageType: string
    image: Express.Multer.File
}

export interface IDatabase {
    data: IDatabaseArtist[]
}

export interface IDatabaseArtist {
    folder: string
    portfolio: IDatabaseArtistImage[]
    link: string
    name: string
}

export interface IDatabaseArtistImage {
    name: string
    filename: string
}

export interface IArtistImageModel {
    imageUrl: string
    imageName: string
    clickUrl: string
    artistName: string
}
