import * as express from 'express'
import {Application} from 'express'
import {ShowcaseFacade} from "./main/ShowcaseFacade";
import * as http from "http";
import {SessionManager} from "./helper/SessionManager";

export class App {
    private readonly app: Application;
    private readonly port: number;
    private readonly sessionManager: SessionManager;
    private readonly facade: ShowcaseFacade;

    constructor(appInit: { port: number, middleWares: any, controllers: any[] }) {
        this.app = express();
        this.port = appInit.port;
        this.middleWares(appInit.middleWares);
        this.routes(appInit.controllers);
        this.assets();
        this.template();
        this.sessionManager = new SessionManager();
        this.facade = new ShowcaseFacade(this.sessionManager);
    }

    private middleWares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            const inst = new controller(this.facade, this.sessionManager);
            this.app.use('/', inst.router);
        });
    }

    private assets() {
        this.app.use(express.static('public'));
        this.app.use(express.static('views'));
    }

    private template() {
        this.app.set('view engine', 'pug');
    }

    public listen(): http.Server {
        return this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
