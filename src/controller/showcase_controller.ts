import addHelper from "./add_image_helper";
import * as exp from "express";
import {AddArtistImageModel} from "../model/CustomTypes";
import GitHubHelper from "./github_helper";

export default {
    /**
     * Adds a valid artist image.
     * @returns {Promise<void>}
     */
    addArtistImage: async function (req: exp.Request, res: exp.Response, next: Function) {
        // TODO: Each artist gets a UID, each image also gets UID
        // TODO: Make a PR to add image file to git repo
        // TODO: If PR merged, make db entry
        try {
            const model: AddArtistImageModel = new AddArtistImageModel(req);
            await GitHubHelper.pushToGitHub(model);
            res.status(200);
            res.send(model);
        } catch (e) {
            res.status(400);
            res.send(e);
        }
        addHelper.removeImageUpload(req.file.filename);
        next();
    },

    /**
     * Returns a random image;
     * @returns {Promise<void>}
     */
    getImage: async function (req: exp.Request, res: exp.Response, next: Function) {
        // TODO: Returns a random entry from database
        // TODO: Return format is JSONObject with imageUrl, imageName, clickUrl, artistName
        res.send('Received a GET HTTP method for getImage');
        next();
    },

    /**
     * Deletes an image;
     * @returns {Promise<void>}
     */
    deleteImage: async function (req: exp.Request, res: exp.Response, next: Function) {
        // TODO: deletes a database entry based on uidArtist and uidImage
        res.send('Received a DELETE HTTP method for deleteImage');
        next();
    },
};
