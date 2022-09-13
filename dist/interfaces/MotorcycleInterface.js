"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotorcycleInterface = void 0;
const zod_1 = require("zod");
const VehicleInterface_1 = require("./VehicleInterface");
exports.MotorcycleInterface = VehicleInterface_1.VehicleInterface.extend({
    category: zod_1.z.enum(['Street', 'Custom', 'Trail']),
    engineCapacity: zod_1.z.number().int().positive().lte(2500),
});
