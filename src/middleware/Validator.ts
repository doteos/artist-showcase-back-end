import AddImageHelper from "../controller/AddImageHelper";
import * as Express from "express";
import * as Joi from "joi";
import {ObjectSchema} from "joi";
import * as fs from "fs";

export default {
    validateJoi: function (schema: ObjectSchema, property: string) {
        return (req: Express.Request, res: Express.Response, next: Function) => {
            const {error} = Joi.validate(req[property], schema);
            const valid = error == null;

            if (valid) {
                next();
            } else {
                const {details} = error;
                const message = details.map(i => i.message).join(',');

                console.log('error', message);
                return res.status(422).json({error: message});
            }
        };
    },

    validateImageFile: function () {
        return (req: Express.Request, res: Express.Response, next: Function) => {
            try {
                const imageStats = fs.statSync(`uploads/${req.file.filename}`);
                if (imageStats.size > 3000000) {
                    return res.status(422).json({error: 'image size is over 3 megabytes'});
                }
                next();
            } catch (e) {
                AddImageHelper.removeImageUpload(req.file.filename);
                return res.status(422).json({error: `${e.toString()} with image file`});
            }
        };
    }
}
