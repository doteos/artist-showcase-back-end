"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const ArtistImageController_1 = require("./controller/ArtistImageController");
const ShowcaseController_1 = require("./controller/ShowcaseController");
const SpecificImageController_1 = require("./controller/SpecificImageController");
const showcaseController = new ShowcaseController_1.ShowcaseController();
const app = new app_1.App({
    port: 3000,
    controllers: [
        new ArtistImageController_1.ArtistImageController(showcaseController),
        new SpecificImageController_1.SpecificImageController(showcaseController)
    ],
    middleWares: []
});
app.listen();
//# sourceMappingURL=server.js.map