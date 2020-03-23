"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AddImageHelper_1 = require("../controller/AddImageHelper");
const Joi = require("joi");
const fs = require("fs");
exports.default = {
    validateJoi: function (schema, property) {
        return (req, res, next) => {
            const { error } = Joi.validate(req[property], schema);
            const valid = error == null;
            if (valid) {
                next();
            }
            else {
                const { details } = error;
                const message = details.map(i => i.message).join(',');
                console.log('error', message);
                return res.status(422).json({ error: message });
            }
        };
    },
    validateImageFile: function () {
        return (req, res, next) => {
            try {
                const imageStats = fs.statSync(`uploads/${req.file.filename}`);
                if (imageStats.size > 3000000) {
                    return res.status(422).json({ error: 'image size is over 3 megabytes' });
                }
                next();
            }
            catch (e) {
                AddImageHelper_1.default.removeImageUpload(req.file.filename);
                return res.status(422).json({ error: `${e.toString()} with image file` });
            }
        };
    }
};
//# sourceMappingURL=Validator.js.map