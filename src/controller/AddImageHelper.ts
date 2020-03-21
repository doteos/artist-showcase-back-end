import * as fs from "fs";

export default {
    removeImageUpload: function (filename: String): boolean | String {
        try {
            fs.unlinkSync(`uploads/${filename}`);
        } catch (e) {
            return `${e.toString()} when removing ${filename}`;
        }
        return true;
    },
};
