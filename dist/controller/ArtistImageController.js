"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const Joi = require("joi");
const Validator_1 = require("../middleware/Validator");
class ArtistImageController {
    constructor(showcaseFacade) {
        this.path = '/showcase/artist/image';
        this.router = express.Router();
        this.schemaQuery = Joi.object().keys({
            artistName: Joi.string().min(1).max(18).required(),
            imageName: Joi.string().min(1).max(18).required(),
            clickUrl: Joi.string().uri().required(),
            image: Joi.required()
        });
        this.initRoutes(showcaseFacade);
    }
    initRoutes(showcaseFacade) {
        const upload = multer({ dest: 'uploads/' });
        this.router.get(this.path, showcaseFacade.getArtistImage);
        this.router.post(this.path, [Validator_1.default.validateJoi(this.schemaQuery, 'body'),
            upload.single('image'), Validator_1.default.validateImageFile], showcaseFacade.addArtistImage);
    }
}
exports.ArtistImageController = ArtistImageController;
//# sourceMappingURL=ArtistImageController.js.map