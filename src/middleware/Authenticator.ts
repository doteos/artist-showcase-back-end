import * as Express from "express";
import {AuthManager} from "../helper/AuthManager";
import {IncomingHttpHeaders} from "http";
import {MissingAuthHeaderError} from "../custom/CustomErrors";

export class Authenticator {
    public static validate() {
        return (req: Express.Request, res: Express.Response, next: Function) => {
            try {
                const {email} = Authenticator.parseEmailAndPassword(req.headers);
                AuthManager.validateNewUser(email);
            } catch (e) {
                return res.status(401).json({error: e.toString()});
            }
            next();
        };
    }

    public static authenticateEmailAndPassword() {
        return async (req: Express.Request, res: Express.Response, next: Function) => {
            try {
                const {email, password} = Authenticator.parseEmailAndPassword(req.headers);
                await AuthManager.authenticateEmailAndPassword(email, password);
            } catch (e) {
                return res.status(401).json({error: e.toString()});
            }
            next();
        };
    }

    public static parseEmailAndPassword(headers: IncomingHttpHeaders): { email: string, password: string } {
        if (!headers.authorization || headers.authorization.indexOf('Basic ') === -1) {
            throw new MissingAuthHeaderError('Missing authentication header.');
        }
        const base64Credentials = headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password] = credentials.split(':');
        return {email: email, password: password};
    }
}
