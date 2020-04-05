import * as fs from "fs";
import {Constants} from "./Constants";
import {IUser} from "../custom/CustomInterfaces";
import {AccountWithEmailExistsError, NoArtistAccountExistsError} from "../custom/CustomErrors";

export class AuthManager {
    public static authenticateUser(email: string, password: string) {
        const json = fs.readFileSync(Constants.USER_CRED, "utf8");
        const users: IUser[] = JSON.parse(json);
        const user = users.find(u => u.email === email && u.password === password);
        if (user === null) {
            throw new NoArtistAccountExistsError();
        }
    }

    public static validateNewUser(email: string, password: string) {
        const json = fs.readFileSync(Constants.USER_CRED, "utf8");
        const users: IUser[] = JSON.parse(json);
        const user = users.find(u => u.email === email);
        if (user) {
            throw new AccountWithEmailExistsError();
        }
    }
}
