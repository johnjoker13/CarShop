"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
var ControllerErrors;
(function (ControllerErrors) {
    ControllerErrors["internal"] = "Internal Server Error";
    ControllerErrors["notFound"] = "Object not found";
    ControllerErrors["requiredId"] = "Id is required";
    ControllerErrors["badRequest"] = "Bad request";
    ControllerErrors["noContent"] = "No content";
    ControllerErrors["idLength"] = "Id must have 24 hexadecimal characters";
})(ControllerErrors || (ControllerErrors = {}));
class CustomController {
    service;
    errors = ControllerErrors;
    constructor(service) {
        this.service = service;
    }
    read = async (_req, res) => {
        try {
            const objs = await this.service.read();
            return res.status(utils_1.OK).json(objs);
        }
        catch (err) {
            return res.status(utils_1.INTERNAL_SERVER_ERROR)
                .json({ error: this.errors.internal });
        }
    };
}
exports.default = CustomController;
