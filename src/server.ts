import {App} from "./app";
import {ArtistImageController} from "./controller/ArtistImageController";
import {SpecificImageController} from "./controller/SpecificImageController";
import {ArtistRegisterController} from "./controller/ArtistRegisterController";
import {ArtistLoginController} from "./controller/ArtistLoginController";

const app = new App({
    port: 3000,
    controllers: [
        ArtistImageController,
        SpecificImageController,
        ArtistRegisterController,
        ArtistLoginController
    ],
    middleWares: []
});

app.listen();
