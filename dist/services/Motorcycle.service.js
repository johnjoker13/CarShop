"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.motorCycleModel = void 0;
const MotorcycleInterface_1 = require("../interfaces/MotorcycleInterface");
const CustomService_1 = __importDefault(require("./CustomService"));
const Motorcycle_model_1 = __importDefault(require("../models/Motorcycle.model"));
exports.motorCycleModel = new Motorcycle_model_1.default();
class MotorcycleService extends CustomService_1.default {
    constructor(model = exports.motorCycleModel) {
        super(model);
    }
    create = async (obj) => {
        const parsed = MotorcycleInterface_1.MotorcycleInterface.safeParse(obj);
        if (!parsed.success) {
            return { error: parsed.error };
        }
        return this.model.create(obj);
    };
    read = async () => this.model.read();
}
exports.default = MotorcycleService;
