"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
class App {
    constructor(appInit) {
        this.app = Express();
        this.port = appInit.port;
        this.middleWares(appInit.middleWares);
        this.routes(appInit.controllers);
        this.assets();
        this.template();
    }
    middleWares(middleWares) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        });
    }
    routes(controllers) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }
    assets() {
        this.app.use(Express.static('public'));
        this.app.use(Express.static('views'));
    }
    template() {
        this.app.set('view engine', 'pug');
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map