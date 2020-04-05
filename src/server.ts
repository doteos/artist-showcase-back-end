import {App} from "./app";
import {ArtistImageController} from "./controller/ArtistImageController";
import {SpecificImageController} from "./controller/SpecificImageController";
import {ArtistController} from "./controller/ArtistController";

const app = new App({
    port: 3000,
    controllers: [
        ArtistImageController,
        SpecificImageController,
        ArtistController
    ],
    middleWares: []
});

app.listen();
