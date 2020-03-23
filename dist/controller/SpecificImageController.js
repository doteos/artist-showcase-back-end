"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class SpecificImageController {
    constructor(showcaseController) {
        this.path = '/showcase/:uid';
        this.router = express.Router();
        this.initRoutes(showcaseController);
    }
    initRoutes(showcaseController) {
        this.router.delete(this.path, showcaseController.deleteImage);
    }
}
exports.SpecificImageController = SpecificImageController;
//# sourceMappingURL=SpecificImageController.js.map