import * as Crypto from "crypto";

export class SessionManager {
    private tokenAndTime: Map<String, number> = new Map<String, number>();

    public generateToken(): String {
        this.clearExpiredTokens();
        const token = Crypto.randomBytes(16).toString('base64');
        const time = new Date().getTime();
        this.tokenAndTime.set(token, time);
        return token;
    }

    public authenticateToken() {
        return (req, res, next) => {
            this.clearExpiredTokens();
            const token: String = req.headers.authorization.split(' ')[1];
            if (!this.tokenAndTime.has(token)) {
                return res.status(401).json({error: 'Token expired.'});
            }
            const time = new Date().getTime();
            this.tokenAndTime.set(token, time);
            next();
        };
    }

    private clearExpiredTokens() {
        const keys = this.tokenAndTime.keys();
        const time = new Date().getTime();
        for (const token of keys) {
            const prevTime = this.tokenAndTime.get(token);
            const differenceInMin = (time - prevTime) / 1000 / 60;
            if (differenceInMin > 30) {
                this.tokenAndTime.delete(token);
            }
        }
    }
}