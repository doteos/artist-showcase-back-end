import {
    IAddArtistImageModel,
    IArtistImageModel,
    IDatabase,
    IDatabaseArtist,
    IDatabaseArtistImage
} from "../custom/CustomInterfaces";
import * as fs from "fs";
import {
    ImageExistsInDatabaseError,
    NoArtistsInDatabaseError,
    NoImageByArtistInDatabaseError
} from "../custom/CustomErrors";
import {Constants} from "./Constants";

export class DataManager {
    private database: IDatabase;

    constructor() {
        this.loadDatabaseFromLocalRepo();
    }

    public loadDatabaseFromLocalRepo() {
        const json = fs.readFileSync(`${Constants.REPO_PATH}/db.json`, "utf8");
        this.database = JSON.parse(json);
    }

    public addDatabaseEntry(model: IAddArtistImageModel) {
        this.loadDatabaseFromLocalRepo();
        const databaseCopy: IDatabase = JSON.parse(JSON.stringify(this.database));
        let artist: IDatabaseArtist;
        const containsArtist: IDatabaseArtist[] = databaseCopy.data.filter(artist => artist.name === model.artistName);
        if (containsArtist.length === 0) {
            artist = {
                folder: model.artistName.toLowerCase().replace(/ /g, '_'),
                portfolio: [],
                link: model.clickUrl,
                name: model.artistName,
            };
            databaseCopy.data.push(artist);
        } else {
            artist = containsArtist[0];
        }
        const image: IDatabaseArtistImage = {
            name: model.imageName,
            filename: `${model.image.filename}.${model.imageType}`
        };
        const containsImage: IDatabaseArtistImage[] = artist.portfolio.filter(i => i.filename === image.filename);
        if (containsImage.length === 0) {
            artist.portfolio.push(image);
            fs.writeFileSync(`${Constants.REPO_PATH}/db.json`, JSON.stringify(databaseCopy, null, 2));
        } else {
            throw new ImageExistsInDatabaseError(`${model.imageName} by ${model.artistName} already exists.`);
        }
    }

    public getRandomImage(): IArtistImageModel {
        if (this.database.data.length === 0) {
            throw new NoArtistsInDatabaseError('There are no artists to get artwork from.');
        }
        const artist: IDatabaseArtist = this.database.data[Math.floor(Math.random() * this.database.data.length)];
        if (artist.portfolio.length === 0) {
            throw new NoImageByArtistInDatabaseError('There is no artwork by this artist.');
        }
        const artwork: IDatabaseArtistImage = artist.portfolio[Math.floor(Math.random() * artist.portfolio.length)];
        return {
            artistName: artist.name,
            clickUrl: artist.link,
            imageName: artwork.name,
            imageUrl: `${Constants.DATABASE_URI}${artist.folder}/${artwork.filename}`
        };
    }
}
