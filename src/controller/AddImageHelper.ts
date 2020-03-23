import * as fs from "fs";
import {AddArtistImageModel} from "../model/CustomInterfaces";
import {BodyParamsError} from "../model/CustomTypes";

export default {
    renameFile: function (model: AddArtistImageModel): string {
        const fileName = `${model.imageName.replace(/ /g, '_')}_by_${model.artistName.replace(/ /g, '_')}`;
        try {
            fs.renameSync(`uploads/${model.image.filename}`, `uploads/${fileName}`);
            model.image.filename = fileName;
        } catch (e) {
            throw new BodyParamsError(`${e.toString()} with image file`);
        }
        return fileName;
    },

    removeImageUpload: function (filename: String): boolean | String {
        try {
            fs.unlinkSync(`uploads/${filename}`);
        } catch (e) {
            return `${e.toString()} when removing ${filename}`;
        }
        return true;
    },
};
