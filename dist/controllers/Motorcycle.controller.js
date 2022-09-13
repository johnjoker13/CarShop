"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Motorcycle_service_1 = __importDefault(require("../services/Motorcycle.service"));
const CustomController_1 = __importDefault(require("./CustomController"));
const utils_1 = require("../utils");
class MotorcycleController extends CustomController_1.default {
    _route;
    _notfound = this.errors.notFound;
    _internal = this.errors.internal;
    _idlength = this.errors.idLength;
    _requiredid = this.errors.requiredId;
    _badrequest = this.errors.badRequest;
    constructor(service = new Motorcycle_service_1.default(), route = '/motorcycles') {
        super(service);
        this._route = route;
    }
    get route() { return this._route; }
    create = async (req, res) => {
        const { body } = req;
        try {
            const moto = await this.service.create(body);
            if (!moto) {
                return res.status(utils_1.INTERNAL_SERVER_ERROR)
                    .json({ error: this._internal });
            }
            if ('error' in moto) {
                return res.status(utils_1.BAD_REQUEST).json(moto);
            }
            return res.status(utils_1.CREATED).json(moto);
        }
        catch (err) {
            return res.status(utils_1.INTERNAL_SERVER_ERROR)
                .json({ error: this._internal });
        }
    };
    readOne = async (req, res) => {
        const { id } = req.params;
        try {
            if (id.length !== 24) {
                return res.status(utils_1.BAD_REQUEST)
                    .json({ error: this._idlength });
            }
            const moto = await this.service.readOne(id);
            return moto
                ? res.status(utils_1.OK).json(moto)
                : res.status(utils_1.NOT_FOUND).json({ error: this._notfound });
        }
        catch (error) {
            return res.status(utils_1.INTERNAL_SERVER_ERROR)
                .json({ error: this._internal });
        }
    };
    update = async (req, res) => {
        const { body, params: { id } } = req;
        if (!id) {
            return res.status(utils_1.BAD_REQUEST)
                .json({ error: this._requiredid });
        }
        if (Object.keys(body).length === 0) {
            return res.status(utils_1.BAD_REQUEST).json({ error: this._badrequest });
        }
        if (id.length !== 24) {
            return res.status(utils_1.BAD_REQUEST)
                .json({ error: this._idlength });
        }
        const moto = await this.service.update(id, body);
        if (!moto)
            return res.status(utils_1.NOT_FOUND).json({ error: this._notfound });
        return res.status(utils_1.OK).json(moto);
    };
    delete = async (req, res) => {
        const { params: { id } } = req;
        if (id.length !== 24) {
            return res.status(utils_1.BAD_REQUEST)
                .json({ error: this._idlength });
        }
        const moto = await this.service.delete(id);
        if (!moto)
            return res.status(utils_1.NOT_FOUND).json({ error: this._notfound });
        if ('error' in moto) {
            return res.status(utils_1.BAD_REQUEST).json(moto);
        }
        return res.status(utils_1.NO_CONTENT).json(moto);
    };
}
exports.default = MotorcycleController;
