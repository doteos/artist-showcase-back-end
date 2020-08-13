import * as Express from "express";
import {AuthenticationHelper} from "../helper/AuthenticationHelper";
import {IncomingHttpHeaders} from "http";
import {MissingAuthBodyError, MissingAuthHeaderError} from "../custom/CustomErrors";

export class Authenticator {
    public static validateEmailAndPassword() {
        return (req: Express.Request, res: Express.Response, next: Function) => {
            try {
                const {email} = Authenticator.parseEmailAndPasswordFromBody(req.body);
                AuthenticationHelper.validateNewUser(email);
            } catch (e) {
                return res.status(401).json({error: e.toString()});
            }
            next();
        }
    }

    public static authenticateEmailAndPassword() {
        return async (req: Express.Request, res: Express.Response, next: Function) => {
            try {
                const {email, password} = Authenticator.parseEmailAndPasswordFromHeaders(req.headers);
                await AuthenticationHelper.authenticateEmailAndPassword(email, password);
            } catch (e) {
                return res.status(401).json({error: e.toString()});
            }
            next();
        }
    }

    private static parseEmailAndPasswordFromBody(body: any): { email: string, password: string } {
        if (!body || !body.email || !body.password) {
            throw new MissingAuthBodyError('Missing email and password from body.');
        }
        return {email: body.email, password: body.password};
    }

    private static parseEmailAndPasswordFromHeaders(headers: IncomingHttpHeaders): { email: string, password: string } {
        if (!headers.authorization || headers.authorization.indexOf('Basic ') === -1) {
            throw new MissingAuthHeaderError('Missing authentication header.');
        }
        const base64Credentials = headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [email, password] = credentials.split(':');
        return {email: email, password: password};
    }
}
