import * as Express from "express";

import {IAddArtistImageModel, IArtistImageModel, IAddArtistModel} from "../custom/CustomInterfaces";
import {AddImageHelper} from "../helper/AddImageHelper";
import {GitManager} from "../helper/GitManager";
import {DataManager} from "../helper/DataManager";
import {AuthenticationHelper} from "../helper/AuthenticationHelper";
import {SessionManager} from "../helper/SessionManager";

export class ShowcaseFacade {
    private gitHubHelper: GitManager;
    private isSetup: boolean = false;
    private dataManager: DataManager;
    private sessionManager: SessionManager;

    constructor(sessionManager: SessionManager) {
        this.setupDatabase().then(() => this.isSetup = true);
        this.sessionManager = sessionManager;
        AuthenticationHelper.generateSecret();
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
            await AuthenticationHelper.addNewUser(model);
            model.password = model.password.substring(0, 1).padEnd(model.password.length, "*");
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
    public getSessionToken(req: Express.Request, res: Express.Response, next: Function) {
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

    /**
     * Changes the secret key if it has not been recreated within 30 minutes.
     * @returns {Promise<void>}
     */
    public async changeSecret(req: Express.Request, res: Express.Response, next: Function) {
        const isChanged: boolean = AuthenticationHelper.generateSecret();
        if (isChanged) {
            res.status(200);
            res.send('Successfully changed.');
        } else {
            res.status(204);
            res.send('Did not change.');
        }
        next();
    }
}
