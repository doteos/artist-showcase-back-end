import {App} from "./app";
import {ArtistImageController} from "./controller/ArtistImageController";
import {ShowcaseController} from "./controller/ShowcaseController";
import {SpecificImageController} from "./controller/SpecificImageController";

const showcaseController = new ShowcaseController();
const app = new App({
    port: 3000,
    controllers: [
        new ArtistImageController(showcaseController),
        new SpecificImageController(showcaseController)
    ],
    middleWares: []
});

app.listen();
