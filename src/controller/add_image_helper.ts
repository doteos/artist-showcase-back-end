import * as fs from "fs";
import {Stats} from "fs";
import * as validUrl from "valid-url";
import {AddArtistImageModel, BodyParamsError} from "../model/CustomTypes";
import * as exp from "express";

export default {
    /**
     * Validates the req body params and returns them from as a file.
     * @returns {string|{clickUrl: *, imageName: *, artistName: *, newFilePath: string}}
     * @param req
     */
    createAddArtistImageModel: function (req: exp.Request): AddArtistImageModel {
        let model: AddArtistImageModel;
        try {
            model = req.body;
            model.file = req.file;
        } catch (e) {
            throw new BodyParamsError(e.toString());
        }
        if (model.artistName.length > 18) {
            throw new BodyParamsError('artistName length is not <= 18');
        }
        if (model.imageName.length > 18) {
            throw new BodyParamsError('imageName length is not <= 18');
        }
        if (!validUrl.isUri(model.clickUrl)) {
            throw new BodyParamsError('clickUrl is not valid');
        }
        let imageStats: Stats;
        try {
            imageStats = fs.statSync(`uploads/${model.file.filename}`);
        } catch (e) {
            throw new BodyParamsError(`${e.toString()} with image file`);
        }
        if (imageStats.size > 3000000) {
            throw new BodyParamsError('image size is over 3 megabytes');
        }
        model.fileName = `uploads/${model.imageName.replace(/ /g, '_')}_by_${model.artistName.replace(/ /g, '_')}`;
        try {
            fs.renameSync(`uploads/${model.file.filename}`, model.fileName);
        } catch (e) {
            throw new BodyParamsError(`${e.toString()} with image file`);
        }
        return model;
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
