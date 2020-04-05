import * as Express from "express";
import {AuthManager} from "../helper/AuthManager";
import {IncomingHttpHeaders} from "http";
import {MissingAuthHeaderError} from "../custom/CustomErrors";

export class Authenticator {
    public static validate() {
        return (req: Express.Request, res: Express.Response, next: Function) => {
            try {
                const {email, password} = Authenticator.getEmailAndPassword(req.headers);
                AuthManager.validateNewUser(email, password);
            } catch (e) {
                return res.status(401).json({error: e.toString()});
            }
            next();
        };
    }

    public static authenticate() {
        return (req: Express.Request, res: Express.Response, next: Function) => {
            try {
                const {email, password} = Authenticator.getEmailAndPassword(req.headers);
                AuthManager.authenticateUser(email, password);
            } catch (e) {
                return res.status(401).json({error: e.toString()});
            }
            next();
        };
    }

    private static getEmailAndPassword(headers: IncomingHttpHeaders): { email: string, password: string } {
        if (!headers.authorization || headers.authorization.indexOf('Basic ') === -1) {
            throw new MissingAuthHeaderError();
        }
        const base64Credentials = headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password] = credentials.split(':');
        return {email: email, password: password};
    }
}
