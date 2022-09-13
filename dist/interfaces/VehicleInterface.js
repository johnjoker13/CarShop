"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleInterface = void 0;
const zod_1 = require("zod");
const VehicleInterface = zod_1.z.object({
    model: zod_1.z.string().min(3),
    year: zod_1.z.number().int().gte(1900).lte(2022),
    color: zod_1.z.string().min(3),
    status: zod_1.z.boolean().optional(),
    buyValue: zod_1.z.number().int(),
});
exports.VehicleInterface = VehicleInterface;
