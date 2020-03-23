"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const CustomTypes_1 = require("../model/CustomTypes");
exports.default = {
    renameFile: function (model) {
        const fileName = `${model.imageName.replace(/ /g, '_')}_by_${model.artistName.replace(/ /g, '_')}`;
        try {
            fs.renameSync(`uploads/${model.image.filename}`, `uploads/${fileName}`);
        }
        catch (e) {
            throw new CustomTypes_1.BodyParamsError(`${e.toString()} with image file`);
        }
    },
    removeImageUpload: function (filename) {
        try {
            fs.unlinkSync(`uploads/${filename}`);
        }
        catch (e) {
            return `${e.toString()} when removing ${filename}`;
        }
        return true;
    },
};
//# sourceMappingURL=AddImageHelper.js.map