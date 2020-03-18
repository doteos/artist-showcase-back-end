import * as exp from 'express'
import router from './router';

const server: exp.Express = exp();
const port = process.env.PORT || 3000;
server.use(exp.json());
router(server);

server.listen(port);
