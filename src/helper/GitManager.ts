import {IAddArtistImageModel} from "../custom/CustomInterfaces";
import * as SimpleGit from "simple-git/promise";
import * as fs from "fs";
import {ImageExistsInDatabaseError, PushToGitHubError} from "../custom/CustomErrors";
import {DataManager} from "./DataManager";
import {Constants} from "./Constants";

export class GitManager {
    private git: SimpleGit.SimpleGit = SimpleGit(Constants.PATH);

    constructor() {
        if (!fs.existsSync(Constants.PATH)) {
            fs.mkdirSync(Constants.PATH);
        }
    }

    public static async getGitHubHelper(): Promise<GitManager> {
        const helper = new GitManager();
        await helper.setupGitHubHelper();
        return helper;
    }

    private async setupGitHubHelper() {
        this.git = SimpleGit(Constants.PATH);
        const isRepo: Boolean = await this.git.checkIsRepo();
        if (!isRepo) {
            await this.git.init();
            await this.git.addRemote('origin', Constants.ORIGIN);
            await this.git.fetch();
            await this.git.checkoutLocalBranch(Constants.BRANCH);
        } else {
            await this.git.checkout(Constants.BRANCH);
        }
        await this.git.pull(Constants.ORIGIN, Constants.BRANCH);
    }

    public async addArtistImageBranch(model: IAddArtistImageModel, database: DataManager) {
        try {
            await this.git.checkout(Constants.BRANCH);
            await this.git.pull(Constants.ORIGIN, Constants.BRANCH);
            database.addDatabaseEntry(model);
            const branch = await this.git.branchLocal().then((res) => res.all);
            if (branch.includes(model.image.filename)) {
                await this.git.raw(['branch', '-D', model.image.filename]);
            }
            await this.git.checkoutBranch(model.image.filename, Constants.BRANCH);
            const artistPath = model.artistName.toLowerCase().replace(/ /g, '_');
            if (!fs.existsSync(`${Constants.PATH}/${artistPath}`)) {
                fs.mkdirSync(`${Constants.PATH}/${artistPath}`);
            }
            fs.renameSync(`uploads/${model.image.filename}`,
                `${Constants.PATH}/${artistPath}/${model.image.filename}.${model.imageType}`);
            await this.git.add(`${artistPath}/${model.image.filename}.${model.imageType}`);
            await this.git.add(`db.json`);
            await this.git.commit(`Add ${model.imageName} by ${model.artistName}`);
            await this.git.raw(['push', Constants.ORIGIN, model.image.filename, '-f']);
            await this.git.checkout(Constants.BRANCH);
            await this.git.pull(Constants.ORIGIN, Constants.BRANCH);
            await this.git.reset("hard");
            await this.git.clean("f");
        } catch (e) {
            await this.git.reset("hard");
            await this.git.clean("f");
            await this.git.checkout(Constants.BRANCH);
            if (e instanceof ImageExistsInDatabaseError) {
                throw e;
            }
            throw new PushToGitHubError(`${e.message}`);
        }
    }
}
