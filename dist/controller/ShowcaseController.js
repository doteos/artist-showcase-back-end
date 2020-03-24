"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddImageHelper_1 = require("./AddImageHelper");
const GithubHelper_1 = require("./GithubHelper");
class showcaseFacade {
    /**
     * Adds a valid artist image.
     * @returns {Promise<void>}
     */
    addArtistImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Each artist gets a UID, each image also gets UID
            // TODO: Make a PR to add image file to git repo
            // TODO: If PR merged, make db entry
            try {
                const model = req.body;
                model.image = req.file;
                AddImageHelper_1.default.renameFile(model);
                yield GithubHelper_1.default.addArtistImageBranch(model);
                res.status(200);
                res.send(model);
            }
            catch (e) {
                res.status(400);
                res.send(e);
            }
            AddImageHelper_1.default.removeImageUpload(req.file.filename);
            next();
        });
    }
    /**
     * Returns a random image;
     * @returns {Promise<void>}
     */
    getArtistImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: Returns a random entry from database
            // TODO: Return format is JSONObject with imageUrl, imageName, clickUrl, artistName
            res.send('Received a GET HTTP method for getImage');
            next();
        });
    }
    /**
     * Deletes an image;
     * @returns {Promise<void>}
     */
    deleteImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: deletes a database entry based on uidArtist and uidImage
            res.send('Received a DELETE HTTP method for deleteImage');
            next();
        });
    }
}
exports.ShowcaseController = ShowcaseController;
//# sourceMappingURL=ShowcaseFacade.js.map
