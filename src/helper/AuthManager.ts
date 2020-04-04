import * as fs from "fs";
import {Constants} from "./Constants";
import {IUser} from "../custom/CustomInterfaces";

export class AuthManager {
    public static authenticateUser(username: string, password: string): string {
        const json = fs.readFileSync(Constants.USER_CRED, "utf8");
        const users: IUser[] = JSON.parse(json);
        const user = users.find(u => u.username === username && u.password === password);
        return user ? username : null;
    }
}
