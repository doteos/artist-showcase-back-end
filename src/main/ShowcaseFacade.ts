import * as Express from "express";

import {IAddArtistImageModel} from "../model/CustomInterfaces";
import {AddImageHelper} from "../helper/AddImageHelper";
import {GitHubHelper} from "../helper/GitHubHelper";

export class ShowcaseFacade {
    /**
     * Adds a valid artist image.
     * @returns {Promise<void>}
     */
    public async addArtistImage(req: Express.Request, res: Express.Response, next: Function) {
        // TODO: Each artist gets a UID, each image also gets UID
        // TODO: Make a PR to add image file to git repo
        // TODO: If PR merged, make db entry
        let fileName = req.file.filename;
        try {
            const model: IAddArtistImageModel = req.body;
            model.image = req.file;
            fileName = AddImageHelper.renameFile(model);
            await GitHubHelper.addArtistImageBranch(model);
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
        // TODO: Returns a random entry from database
        // TODO: Return format is JSONObject with imageUrl, imageName, clickUrl, artistName
        res.send('Received a GET HTTP method for getImage');
        next();
    }

    /**
     * Deletes an image;
     * @returns {Promise<void>}
     */
    public async deleteImage(req: Express.Request, res: Express.Response, next: Function) {
        // TODO: deletes a database entry based on uidArtist and uidImage
        res.send('Received a DELETE HTTP method for deleteImage');
        next();
    }
}
