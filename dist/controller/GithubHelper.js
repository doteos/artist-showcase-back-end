"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class GitHub {
}
GitHub.ORIGIN = 'git@github.com:doteos/artist-showcase-back-end.git';
GitHub.BRANCH = 'master';
exports.default = {
    addArtistImageBranch: function (model) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('YES WE MADE IT');
            console.log(model.imageName);
            console.log(model.artistName);
            console.log(model.clickUrl);
            console.log(model.image.filename);
            // const sGit: SimpleGit.SimpleGit = SimpleGit("repo");
            // const isRepo: Boolean = await sGit.checkIsRepo();
            // if (!isRepo) {
            //     throw new PushToGitHubError(`'repo/' is not a repo`);
            // }
            // try {
            //     await sGit.checkoutLocalBranch(GitHub.MASTER);
            //     await sGit.pull(GitHub.ORIGIN, GitHub.MASTER);
            //     await sGit.checkoutBranch(model.image.filename, GitHub.MASTER);
            //     const artistPath = `repo/${model.artistName.toLowerCase().replace(/ /g, '_')}`;
            //     if (!fs.existsSync(artistPath)) {
            //         fs.mkdirSync(artistPath);
            //     }
            //     fs.renameSync(`uploads/${model.image.filename}`, `${artistPath}/${model.image.filename}`);
            //     await sGit.add(model.image.filename);
            //     await sGit.commit(`Add ${model.imageName} by ${model.artistName}`);
            //     await sGit.push(GitHub.ORIGIN, model.image.filename);
            //     await sGit.checkoutLocalBranch(GitHub.MASTER);
            //     await sGit.pull(GitHub.ORIGIN, GitHub.MASTER);
            // } catch (e) {
            //     await sGit.reset("hard");
            //     await sGit.clean("f");
            //     await sGit.checkoutLocalBranch(GitHub.MASTER);
            //     throw new PushToGitHubError(`${e.message}`);
            // }
        });
    }
};
//# sourceMappingURL=GithubHelper.js.map
