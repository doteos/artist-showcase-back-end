import {App} from "./app";
import {ArtistImageController} from "./controller/ArtistImageController";
import {SpecificImageController} from "./controller/SpecificImageController";

const app = new App({
    port: 3000,
    controllers: [
        ArtistImageController,
        SpecificImageController
    ],
    middleWares: []
});

app.listen();
