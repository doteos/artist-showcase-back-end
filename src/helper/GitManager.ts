import {IAddArtistImageModel} from "../custom/CustomInterfaces";
import * as SimpleGit from "simple-git/promise";
import * as fs from "fs";
import {ImageExistsInDatabaseError, PushToGitHubError} from "../custom/CustomErrors";
import {DataManager} from "./DataManager";
import {Constants} from "./Constants";

export class GitManager {
    private git: SimpleGit.SimpleGit = SimpleGit(Constants.REPO_PATH);

    constructor() {
        if (!fs.existsSync(Constants.REPO_PATH)) {
            fs.mkdirSync(Constants.REPO_PATH);
        }
    }

    public static async getGitHubHelper(): Promise<GitManager> {
        const helper = new GitManager();
        await helper.setupGitHubHelper();
        return helper;
    }

    private async setupGitHubHelper() {
        this.git = SimpleGit(Constants.REPO_PATH);
        const isRepo: Boolean = await this.git.checkIsRepo();
        if (!isRepo) {
            await this.git.init();
            await this.git.addRemote('origin', Constants.REPO_ORIGIN);
            await this.git.fetch();
            await this.git.checkoutLocalBranch(Constants.REPO_BRANCH);
        } else {
            await this.git.checkout(Constants.REPO_BRANCH);
        }
        await this.git.pull(Constants.REPO_ORIGIN, Constants.REPO_BRANCH);
    }

    public async addArtistImageBranch(model: IAddArtistImageModel, database: DataManager) {
        try {
            await this.git.checkout(Constants.REPO_BRANCH);
            await this.git.pull(Constants.REPO_ORIGIN, Constants.REPO_BRANCH);
            database.addDatabaseEntry(model);
            const branch = await this.git.branchLocal().then((res) => res.all);
            if (branch.includes(model.image.filename)) {
                await this.git.raw(['branch', '-D', model.image.filename]);
            }
            await this.git.checkoutBranch(model.image.filename, Constants.REPO_BRANCH);
            const artistPath = model.artistName.toLowerCase().replace(/ /g, '_');
            if (!fs.existsSync(`${Constants.REPO_PATH}/${artistPath}`)) {
                fs.mkdirSync(`${Constants.REPO_PATH}/${artistPath}`);
            }
            fs.renameSync(`uploads/${model.image.filename}`,
                `${Constants.REPO_PATH}/${artistPath}/${model.image.filename}.${model.imageType}`);
            await this.git.add(`${artistPath}/${model.image.filename}.${model.imageType}`);
            await this.git.add(`db.json`);
            await this.git.commit(`Add ${model.imageName} by ${model.artistName}`);
            await this.git.raw(['push', Constants.REPO_ORIGIN, model.image.filename, '-f']);
            await this.git.checkout(Constants.REPO_BRANCH);
            await this.git.pull(Constants.REPO_ORIGIN, Constants.REPO_BRANCH);
            await this.git.reset("hard");
            await this.git.clean("f");
        } catch (e) {
            await this.git.reset("hard");
            await this.git.clean("f");
            await this.git.checkout(Constants.REPO_BRANCH);
            if (e instanceof ImageExistsInDatabaseError) {
                throw e;
            }
            throw new PushToGitHubError(`${e.message}`);
        }
    }
}
