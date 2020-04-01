import * as Express from "express";

import {IAddArtistImageModel} from "../model/CustomInterfaces";
import {AddImageHelper} from "../helper/AddImageHelper";
import {GitManager} from "../helper/GitManager";
import {DataManager} from "../helper/DataManager";

export class ShowcaseFacade {
    private gitHubHelper: GitManager;
    private _isSetup: boolean = false;
    private dataManager: DataManager;

    constructor() {
        this.setupDatabase().then(() => this._isSetup = true);
    }

    get isSetup(): boolean {
        return this._isSetup;
    }

    private async setupDatabase() {
        this.gitHubHelper = await GitManager.getGitHubHelper();
        this.dataManager = new DataManager();
    }

    /**
     * Adds a valid artist image.
     * @returns {Promise<void>}
     */
    public async addArtistImage(req: Express.Request, res: Express.Response, next: Function) {
        if (!this._isSetup) {
            res.status(503);
            res.send('Server is not ready yet, give it a moment.');
        }
        let fileName = req.file.filename;
        try {
            const model: IAddArtistImageModel = req.body;
            model.image = req.file;
            model.imageType = model.image.mimetype.replace('image/', '');
            fileName = AddImageHelper.renameFile(model);
            await this.gitHubHelper.addArtistImageBranch(model, this.dataManager);
            res.status(200);
            res.send(model);
        } catch (e) {
            res.status(400);
            res.send(e.message);
        }
        AddImageHelper.removeImageUpload(fileName);
        next();
    }

    /**
     * Returns a random image;
     * @returns {Promise<void>}
     */
    public async getArtistImage(req: Express.Request, res: Express.Response, next: Function) {
        // TODO: Returns a random entry from dataManager
        // TODO: Return format is JSONObject with imageUrl, imageName, clickUrl, artistName
        if (!this._isSetup) {
            res.status(503);
            res.send('Server is not ready yet, give it a moment.');
        }
        res.send('Received a GET HTTP method for getImage');
        next();
    }

    /**
     * Deletes an image;
     * @returns {Promise<void>}
     */
    public async deleteImage(req: Express.Request, res: Express.Response, next: Function) {
        // TODO: deletes a dataManager entry based on uidArtist and uidImage
        if (!this._isSetup) {
            res.status(503);
            res.send('Server is not ready yet, give it a moment.');
        }
        res.send('Received a DELETE HTTP method for deleteImage');
        next();
    }
}
