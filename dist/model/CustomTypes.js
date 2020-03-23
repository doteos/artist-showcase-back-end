"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export class AddArtistImageModel {
//     artistName: string;
//     imageName: string;
//     clickUrl: string;
//     fileName: string;
//     file: Express.Multer.File;
//
//     constructor(req: exp.Request) {
//         // try {
//         //     this.artistName = req.body.artistName;
//         //     this.imageName = req.body.imageName;
//         //     this.clickUrl = req.body.clickUrl;
//         //     this.file = req.file;
//         // } catch (e) {
//         //     throw new BodyParamsError(e.toString());
//         // }
//         // if (this.artistName.length > 18) {
//         //     throw new BodyParamsError('artistName length is not <= 18');
//         // }
//         // if (this.imageName.length > 18) {
//         //     throw new BodyParamsError('imageName length is not <= 18');
//         // }
//         // if (!validUrl.isUri(this.clickUrl)) {
//         //     throw new BodyParamsError('clickUrl is not valid');
//         // }
//         // let imageStats: Stats;
//         // try {
//         //     imageStats = fs.statSync(`uploads/${this.file.filename}`);
//         // } catch (e) {
//         //     throw new BodyParamsError(`${e.toString()} with image file`);
//         // }
//         // if (imageStats.size > 3000000) {
//         //     throw new BodyParamsError('image size is over 3 megabytes');
//         // }
//         // this.fileName = `${this.imageName.replace(/ /g, '_')}_by_${this.artistName.replace(/ /g, '_')}`;
//         // try {
//         //     fs.renameSync(`uploads/${this.file.filename}`, `uploads/${this.fileName}`);
//         // } catch (e) {
//         //     throw new BodyParamsError(`${e.toString()} with image file`);
//         // }
//     }
// }
class BodyParamsError extends Error {
}
exports.BodyParamsError = BodyParamsError;
class PushToGitHubError extends Error {
}
exports.PushToGitHubError = PushToGitHubError;
//# sourceMappingURL=CustomTypes.js.map