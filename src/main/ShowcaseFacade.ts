import * as Express from "express";

import {IAddArtistImageModel, IArtistImageModel, IAddArtistModel} from "../custom/CustomInterfaces";
import {AddImageHelper} from "../helper/AddImageHelper";
import {GitManager} from "../helper/GitManager";
import {DataManager} from "../helper/DataManager";
import {AuthManager} from "../helper/AuthManager";
import {SessionManager} from "../helper/SessionManager";

export class ShowcaseFacade {
    private gitHubHelper: GitManager;
    private isSetup: boolean = false;
    private dataManager: DataManager;
    private sessionManager: SessionManager;

    constructor(sessionManager: SessionManager) {
        this.setupDatabase().then(() => this.isSetup = true);
        this.sessionManager = sessionManager;
    }

    private async setupDatabase() {
        this.gitHubHelper = await GitManager.getGitHubHelper();
        this.dataManager = new DataManager();
    }

    public checkIfReady() {
        return (req: Express.Request, res: Express.Response, next: Function) => {
            if (!this.isSetup) {
                res.status(503);
                res.send({error: 'Server is not ready yet, give it a moment.'});
            }
            next();
        };
    }

    /**
     * Adds a valid artist image.
     * @returns {Promise<void>}
     */
    public async addArtistImage(req: Express.Request, res: Express.Response, next: Function) {
        let filename = req.file.filename;
        try {
            const model: IAddArtistImageModel = req.body;
            model.image = req.file;
            model.imageType = model.image.mimetype.replace('image/', '');
            filename = AddImageHelper.renameFile(model);
            await this.gitHubHelper.addArtistImageBranch(model, this.dataManager);
            res.status(200);
            res.send(model);
        } catch (e) {
            res.status(400);
            res.send({error: e.toString()});
        }
        AddImageHelper.removeImageUpload(filename);
        next();
    }

    /**
     * Creates an artist account.
     * @returns {Promise<void>}
     */
    public async addArtistAccount(req: Express.Request, res: Express.Response, next: Function) {
        try {
            const model: IAddArtistModel = req.body;
            const base64Credentials = req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            model.password = credentials.split(':')[1];
            await AuthManager.addNewUser(model);
            res.status(200);
            res.send(model);
        } catch (e) {
            res.status(400);
            res.send({error: e.toString()});
        }
        next();
    }

    /**
     * Returns a session token for an authenticated user.
     * @returns {Promise<void>}
     */
    public async getSessionToken(req: Express.Request, res: Express.Response, next: Function) {
        const token: String = this.sessionManager.generateToken();
        res.status(200);
        res.send({token: token});
        next();
    }

    /**
     * Returns a random image from the database.
     * @returns {Promise<void>}
     */
    public async getArtistImage(req: Express.Request, res: Express.Response, next: Function) {
        try {
            const model: IArtistImageModel = this.dataManager.getRandomImage();
            res.status(200);
            res.send(model);
        } catch (e) {
            res.status(400);
            res.send({error: e.toString()});
        }
        next();
    }

    /**
     * Deletes an image;
     * @returns {Promise<void>}
     */
    public async deleteImage(req: Express.Request, res: Express.Response, next: Function) {
        // TODO: deletes a dataManager entry based on uidArtist and uidImage
        res.send('Received a DELETE HTTP method for deleteImage');
        next();
    }
}
