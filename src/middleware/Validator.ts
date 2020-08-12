import * as Express from "express";
import {ObjectSchema} from "joi";
import * as fs from "fs";
import {AddImageHelper} from "../helper/AddImageHelper";

export default {
    validateJoi: function (schema: ObjectSchema, property: string) {
        return (req: Express.Request, res: Express.Response, next: Function) => {
            const {error} = schema.validate(req[property]);
            const valid = error == null;

            if (valid) {
                next();
            } else {
                const {details} = error;
                const message = details.map(i => i.message).join(',');
                return res.status(422).json({error: message});
            }
        };
    },

    validateImageFile: function () {
        return (req, res, next) => {
            try {
                const imageStats = fs.statSync(`uploads/${req.file.filename}`);
                if (imageStats.size > 3000000) {
                    return res.status(422).json({error: 'Image size is over 3 megabytes'});
                }
                if (!(req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpg'
                    || req.file.mimetype == 'image/jpeg')) {
                    return res.status(422).json({error: 'Only .png, .jpg and .jpeg format allowed!'});
                }
                next();
            } catch (e) {
                AddImageHelper.removeImageUpload(req.file.filename);
                return res.status(422).json({error: `${e.toString()} with image file.`});
            }
        }
    }
}
