"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.motorcycleModel = exports.motorcycleSchema = void 0;
const mongoose_1 = require("mongoose");
const CustomModel_1 = __importDefault(require("./CustomModel"));
exports.motorcycleSchema = new mongoose_1.Schema({
    model: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    status: Boolean,
    buyValue: { type: Number, required: true },
    category: { type: String, required: true },
    engineCapacity: { type: Number, required: true },
}, { versionKey: false });
exports.motorcycleModel = (0, mongoose_1.model)('Motorcycle', exports.motorcycleSchema);
class MotorcycleModel extends CustomModel_1.default {
    constructor(model = exports.motorcycleModel) {
        super(model);
    }
}
exports.default = MotorcycleModel;
