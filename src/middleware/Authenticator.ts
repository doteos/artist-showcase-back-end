import * as Express from "express";
import {AuthManager} from "../helper/AuthManager";

export default {
    authenticate: function () {
        return (req: Express.Request, res: Express.Response, next: Function) => {
            if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
                return res.status(401).json({error: 'Missing authentication header'});
            }
            const base64Credentials = req.headers.authorization.split(' ')[1];
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
            const [username, password] = credentials.split(':');
            const user = AuthManager.authenticateUser(username, password);
            if (user === null) {
                return res.status(401).json({error: 'Invalid authentication credentials.'});
            }
            next();
        };
    },
}
