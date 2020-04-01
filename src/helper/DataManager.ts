import {IAddArtistImageModel, IDatabase, IDatabaseArtist, IDatabaseArtistImage} from "../model/CustomInterfaces";
import * as fs from "fs";
import {GitManager} from "./GitManager";
import {ImageExistsInDatabaseError} from "../model/CustomErrors";

export class DataManager {
    private database: IDatabase;

    constructor() {
        this.loadDatabaseFromLocalRepo();
    }

    public loadDatabaseFromLocalRepo() {
        const json = fs.readFileSync(`${GitManager.PATH}/db.json`, "utf8");
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
        if (!artist.portfolio.includes(image)) {
            artist.portfolio.push(image);
            fs.writeFileSync(`${GitManager.PATH}/db.json`, JSON.stringify(databaseCopy, null, 2));
        } else {
            throw new ImageExistsInDatabaseError(`${model.imageName} by ${model.artistName} already exists.`);
        }
    }
}
