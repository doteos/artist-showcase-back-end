import * as fs from "fs";
import {Constants} from "./Constants";
import {IAddArtistModel, IUser} from "../custom/CustomInterfaces";
import {
    AccountWithEmailExistsError,
    NoArtistAccountExistsError,
    PasswordHashingError,
    UserCredentialDatabaseNotFoundError
} from "../custom/CustomErrors";
import SecurePassword = require("secure-password");

export class AuthManager {
    public static async authenticateEmailAndPassword(email: string, password: string) {
        const json = fs.readFileSync(Constants.USER_CRED, "utf8");
        const users: IUser[] = JSON.parse(json);
        const user = users.find((u) => u.email === email);
        if (user === null) {
            throw new NoArtistAccountExistsError('Could not find an account with this email.');
        }
        const pwd = new SecurePassword();
        const userPassword = Buffer.from(password);
        const actualPassword = Buffer.from(user.hashed);
        const result = await pwd.verify(userPassword, actualPassword);
        switch (result) {
            case SecurePassword.VALID_NEEDS_REHASH:
                try {
                    const improvedHash = await pwd.hash(userPassword);
                    user.hashed = improvedHash.toString();
                    fs.writeFileSync(Constants.USER_CRED, JSON.stringify(users, null, 2));
                } catch (err) {
                    console.error('You are authenticated, but we could not improve your safety this time around')
                }
                return;
            case SecurePassword.VALID:
                return;
            default:
                throw new PasswordHashingError('Invalid password.');
        }
    }

    public static validateNewUser(email: string) {
        const users: IUser[] = AuthManager.loadUser();
        const user = users.find(u => u.email === email);
        if (user) {
            throw new AccountWithEmailExistsError('An account with this email already exists.');
        }
    }

    public static async addNewUser(model: IAddArtistModel) {
        const pwd = new SecurePassword();
        const users: IUser[] = AuthManager.loadUser();
        const userPassword = Buffer.from(model.password);
        let hash = await pwd.hash(userPassword);
        const result = await pwd.verify(userPassword, hash);
        if (result === SecurePassword.VALID_NEEDS_REHASH) {
            hash = await pwd.hash(userPassword);
        } else if (result !== SecurePassword.VALID) {
            throw new PasswordHashingError(result.toString());
        }
        users.push({
            actualName: model.actualName,
            artistName: model.artistName,
            clickUrl: model.clickUrl,
            email: model.email,
            hashed: hash.toString()
        });
        fs.writeFileSync(Constants.USER_CRED, JSON.stringify(users, null, 2));
    }

    private static loadUser(): IUser[] {
        if (!fs.existsSync(Constants.USER_CRED)) {
            throw new UserCredentialDatabaseNotFoundError('User account database not found.');
        }
        const json = fs.readFileSync(Constants.USER_CRED, "utf8");
        return JSON.parse(json);
    }
}
