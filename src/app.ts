import * as Express from 'express'
import {Application} from 'express'

export class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number, middleWares: any, controllers: any }) {
        this.app = Express();
        this.port = appInit.port;

        this.middleWares(appInit.middleWares);
        this.routes(appInit.controllers);
        this.assets();
        this.template();
    }

    private middleWares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    private assets() {
        this.app.use(Express.static('public'));
        this.app.use(Express.static('views'));
    }

    private template() {
        this.app.set('view engine', 'pug');
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}