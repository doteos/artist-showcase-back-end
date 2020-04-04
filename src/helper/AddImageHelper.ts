import * as fs from "fs";
import {IAddArtistImageModel} from "../custom/CustomInterfaces";
import {BodyParamsError} from "../custom/CustomErrors";

export class AddImageHelper {
    public static renameFile(model: IAddArtistImageModel): string {
        const fileName = `${model.imageName.replace(/ /g, '_')}_by_${model.artistName.replace(/ /g, '_')}`;
        try {
            fs.renameSync(`uploads/${model.image.filename}`, `uploads/${fileName}`);
            model.image.filename = fileName;
        } catch (e) {
            throw new BodyParamsError(`${e.toString()} with image file`);
        }
        return fileName;
    }

    public static removeImageUpload(filename: String): boolean | String {
        try {
            fs.unlinkSync(`uploads/${filename}`);
        } catch (e) {
            return `${e.toString()} when removing ${filename}`;
        }
        return true;
    }
}
