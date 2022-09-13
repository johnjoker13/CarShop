"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carModel = exports.carSchema = void 0;
const mongoose_1 = require("mongoose");
const CustomModel_1 = __importDefault(require("./CustomModel"));
exports.carSchema = new mongoose_1.Schema({
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: Boolean,
    buyValue: { type: Number, required: true },
    doorsQty: { type: Number, required: true },
    seatsQty: { type: Number, required: true },
}, { versionKey: false });
exports.carModel = (0, mongoose_1.model)('Car', exports.carSchema);
class CarsModel extends CustomModel_1.default {
    constructor(model = exports.carModel) {
        super(model);
    }
}
exports.default = CarsModel;
