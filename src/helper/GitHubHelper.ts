import {IAddArtistImageModel} from "../model/CustomInterfaces";
import * as SimpleGit from "simple-git/promise";
import * as fs from "fs";
import {PushToGitHubError} from "../model/CustomErrors";

export class GitHubHelper {
    private static ORIGIN: string = 'git@github.com:doteos/artist-showcase-images.git';
    private static BRANCH: string = 'test-master';
    private static PATH: string = 'repo';

    public static async addArtistImageBranch(model: IAddArtistImageModel) {
        const sGit: SimpleGit.SimpleGit = SimpleGit(GitHubHelper.PATH);
        const isRepo: Boolean = await sGit.checkIsRepo();
        if (!isRepo) {
            throw new PushToGitHubError(`'repo/' is not a repo`);
        }
        try {
            await sGit.checkout(GitHubHelper.BRANCH);
            await sGit.pull(GitHubHelper.ORIGIN, GitHubHelper.BRANCH);
            const branch = await sGit.branchLocal().then((res) => res.all);
            if (branch.includes(model.image.filename)) {
                await sGit.checkout(model.image.filename);
                await sGit.reset(['--hard', GitHubHelper.BRANCH]);
            } else {
                await sGit.checkoutBranch(model.image.filename, GitHubHelper.BRANCH);
            }
            const artistPath = model.artistName.toLowerCase().replace(/ /g, '_');
            if (!fs.existsSync(`${GitHubHelper.PATH}/${artistPath}`)) {
                fs.mkdirSync(`${GitHubHelper.PATH}/${artistPath}`);
            }
            const imageType = model.image.mimetype.replace('image/', '');
            fs.renameSync(`uploads/${model.image.filename}`, `${GitHubHelper.PATH}/${artistPath}/${model.image.filename}.${imageType}`);
            await sGit.add(`${artistPath}/${model.image.filename}.${imageType}`);
            await sGit.commit(`Add ${model.imageName} by ${model.artistName}`);
            await sGit.raw(['push', GitHubHelper.ORIGIN, model.image.filename, '-f']);
            await sGit.checkout(GitHubHelper.BRANCH);
            await sGit.pull(GitHubHelper.ORIGIN, GitHubHelper.BRANCH);
            await sGit.reset("hard");
            await sGit.clean("f");
        } catch (e) {
            await sGit.reset("hard");
            await sGit.clean("f");
            await sGit.checkout(GitHubHelper.BRANCH);
            throw new PushToGitHubError(`${e.message}`);
        }
    }
}

export default {}
