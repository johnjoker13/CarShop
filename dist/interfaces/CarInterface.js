"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarInterface = void 0;
const zod_1 = require("zod");
const VehicleInterface_1 = require("./VehicleInterface");
const CarInterface = VehicleInterface_1.VehicleInterface.extend({
    doorsQty: zod_1.z.number().int().gte(2).lte(4),
    seatsQty: zod_1.z.number().int().gte(2).lte(7),
});
exports.CarInterface = CarInterface;
