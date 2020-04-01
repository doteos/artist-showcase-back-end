import {IAddArtistImageModel} from "../model/CustomInterfaces";
import * as SimpleGit from "simple-git/promise";
import * as fs from "fs";
import {ImageExistsInDatabaseError, PushToGitHubError} from "../model/CustomErrors";
import {DataManager} from "./DataManager";

export class GitManager {
    private static ORIGIN: string = 'git@github.com:doteos/artist-showcase-images.git';
    private static BRANCH: string = 'master';
    static PATH: string = 'repo';
    private git: SimpleGit.SimpleGit = SimpleGit(GitManager.PATH);

    constructor() {
        if (!fs.existsSync(GitManager.PATH)) {
            fs.mkdirSync(GitManager.PATH);
        }
    }

    public static async getGitHubHelper(): Promise<GitManager> {
        const helper = new GitManager();
        await helper.setupGitHubHelper();
        return helper;
    }

    private async setupGitHubHelper() {
        this.git = SimpleGit(GitManager.PATH);
        const isRepo: Boolean = await this.git.checkIsRepo();
        if (!isRepo) {
            await this.git.init();
            await this.git.addRemote('origin', GitManager.ORIGIN);
            await this.git.fetch();
            await this.git.checkoutLocalBranch(GitManager.BRANCH);
        } else {
            await this.git.checkout(GitManager.BRANCH);
        }
        await this.git.pull(GitManager.ORIGIN, GitManager.BRANCH);
    }

    public async addArtistImageBranch(model: IAddArtistImageModel, database: DataManager) {
        try {
            await this.git.checkout(GitManager.BRANCH);
            await this.git.pull(GitManager.ORIGIN, GitManager.BRANCH);
            database.addDatabaseEntry(model);
            const branch = await this.git.branchLocal().then((res) => res.all);
            if (branch.includes(model.image.filename)) {
                await this.git.raw(['branch', '-D', model.image.filename]);
            }
            await this.git.checkoutBranch(model.image.filename, GitManager.BRANCH);
            const artistPath = model.artistName.toLowerCase().replace(/ /g, '_');
            if (!fs.existsSync(`${GitManager.PATH}/${artistPath}`)) {
                fs.mkdirSync(`${GitManager.PATH}/${artistPath}`);
            }
            fs.renameSync(`uploads/${model.image.filename}`,
                `${GitManager.PATH}/${artistPath}/${model.image.filename}.${model.imageType}`);
            await this.git.add(`${artistPath}/${model.image.filename}.${model.imageType}`);
            await this.git.add(`db.json`);
            await this.git.commit(`Add ${model.imageName} by ${model.artistName}`);
            await this.git.raw(['push', GitManager.ORIGIN, model.image.filename, '-f']);
            await this.git.checkout(GitManager.BRANCH);
            await this.git.pull(GitManager.ORIGIN, GitManager.BRANCH);
            await this.git.reset("hard");
            await this.git.clean("f");
        } catch (e) {
            await this.git.reset("hard");
            await this.git.clean("f");
            await this.git.checkout(GitManager.BRANCH);
            if (e instanceof ImageExistsInDatabaseError) {
                throw e;
            }
            throw new PushToGitHubError(`${e.message}`);
        }
    }
}
