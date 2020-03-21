import {AddArtistImageModel, PushToGitHubError} from "../model/CustomTypes";
import * as SimpleGit from "simple-git/promise";
import * as fs from "fs";

class GitHub {
    static ORIGIN: string = 'git@github.com:doteos/artist-showcase-back-end.git';
    static MASTER: string = 'master';
}

export default {
    addArtistImageBranch: async function (model: AddArtistImageModel) {
        const sGit: SimpleGit.SimpleGit = SimpleGit("repo");
        const isRepo: Boolean = await sGit.checkIsRepo();
        if (!isRepo) {
            throw new PushToGitHubError(`'repo/' is not a repo`);
        }
        try {
            await sGit.checkoutLocalBranch(GitHub.MASTER);
            await sGit.pull(GitHub.ORIGIN, GitHub.MASTER);
            await sGit.checkoutBranch(model.fileName, GitHub.MASTER);
            const artistPath = `repo/${model.artistName.toLowerCase().replace(/ /g, '_')}`;
            if (!fs.existsSync(artistPath)) {
                fs.mkdirSync(artistPath);
            }
            fs.renameSync(`uploads/${model.fileName}`, `${artistPath}/${model.fileName}`);
            await sGit.add(model.fileName);
            await sGit.commit(`Add ${model.imageName} by ${model.artistName}`);
            await sGit.push(GitHub.ORIGIN, model.fileName);
            await sGit.checkoutLocalBranch(GitHub.MASTER);
            await sGit.pull(GitHub.ORIGIN, GitHub.MASTER);
        } catch (e) {
            await sGit.reset("hard");
            await sGit.clean("f");
            await sGit.checkoutLocalBranch(GitHub.MASTER);
            throw new PushToGitHubError(`${e.message}`);
        }
    }
}
