"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CarInterface_1 = require("../interfaces/CarInterface");
const CustomService_1 = __importDefault(require("./CustomService"));
const Cars_model_1 = __importDefault(require("../models/Cars.model"));
class CarService extends CustomService_1.default {
    constructor(model = new Cars_model_1.default()) {
        super(model);
    }
    create = async (obj) => {
        const parsed = CarInterface_1.CarInterface.safeParse(obj);
        if (!parsed.success) {
            return { error: parsed.error };
        }
        return this.model.create(obj);
    };
}
exports.default = CarService;
