import {AddArtistImageModel} from "../model/CustomInterfaces";
import * as SimpleGit from "simple-git/promise";
import * as fs from "fs";
import {PushToGitHubError} from "../model/CustomErrors";

class GitHub {
    static ORIGIN: string = 'git@github.com:doteos/artist-showcase-images.git';
    static BRANCH: string = 'test-master';
    static PATH: string = 'repo';
}

export default {
    addArtistImageBranch: async function (model: AddArtistImageModel) {
        const sGit: SimpleGit.SimpleGit = SimpleGit(GitHub.PATH);
        const isRepo: Boolean = await sGit.checkIsRepo();
        if (!isRepo) {
            throw new PushToGitHubError(`'repo/' is not a repo`);
        }
        try {
            await sGit.checkout(GitHub.BRANCH);
            await sGit.pull(GitHub.ORIGIN, GitHub.BRANCH);
            const branch = await sGit.branchLocal().then((res) => res.all);
            if (branch.includes(model.image.filename)) {
                await sGit.checkout(model.image.filename);
                await sGit.reset(['--hard', GitHub.BRANCH]);
            } else {
                await sGit.checkoutBranch(model.image.filename, GitHub.BRANCH);
            }
            const artistPath = model.artistName.toLowerCase().replace(/ /g, '_');
            if (!fs.existsSync(`${GitHub.PATH}/${artistPath}`)) {
                fs.mkdirSync(`${GitHub.PATH}/${artistPath}`);
            }
            const imageType = model.image.mimetype.replace('image/', '');
            fs.renameSync(`uploads/${model.image.filename}`, `${GitHub.PATH}/${artistPath}/${model.image.filename}.${imageType}`);
            await sGit.add(`${artistPath}/${model.image.filename}.${imageType}`);
            await sGit.commit(`Add ${model.imageName} by ${model.artistName}`);
            await sGit.raw(['push', GitHub.ORIGIN, model.image.filename, '-f']);
            await sGit.checkout(GitHub.BRANCH);
            await sGit.pull(GitHub.ORIGIN, GitHub.BRANCH);
            await sGit.reset("hard");
            await sGit.clean("f");
        } catch (e) {
            await sGit.reset("hard");
            await sGit.clean("f");
            await sGit.checkout(GitHub.BRANCH);
            throw new PushToGitHubError(`${e.message}`);
        }
    }
}
