import {App} from "./app";
import {ArtistImageController} from "./controller/ArtistImageController";
import {ShowcaseFacade} from "./main/ShowcaseFacade";
import {SpecificImageController} from "./controller/SpecificImageController";

const facade = new ShowcaseFacade();
const app = new App({
    port: 3000,
    controllers: [
        new ArtistImageController(facade),
        new SpecificImageController(facade)
    ],
    middleWares: []
});

app.listen();
