"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomController_1 = __importDefault(require("./CustomController"));
const Cars_service_1 = __importDefault(require("../services/Cars.service"));
const utils_1 = require("../utils");
class CarController extends CustomController_1.default {
    _route;
    _notfound = this.errors.notFound;
    _internal = this.errors.internal;
    _idlength = this.errors.idLength;
    _requiredid = this.errors.requiredId;
    _badrequest = this.errors.badRequest;
    _nocontent = this.errors.noContent;
    constructor(service = new Cars_service_1.default(), route = '/cars') {
        super(service);
        this._route = route;
    }
    get route() { return this._route; }
    create = async (req, res) => {
        const { body } = req;
        try {
            const car = await this.service.create(body);
            if (!car) {
                return res.status(utils_1.INTERNAL_SERVER_ERROR)
                    .json({ error: this._internal });
            }
            if ('error' in car) {
                return res.status(utils_1.BAD_REQUEST).json(car);
            }
            return res.status(utils_1.CREATED).json(car);
        }
        catch (err) {
            return res.status(utils_1.INTERNAL_SERVER_ERROR).json({ error: this._internal });
        }
    };
    readOne = async (req, res) => {
        const { id } = req.params;
        try {
            if (id.length !== 24) {
                return res.status(utils_1.BAD_REQUEST)
                    .json({ error: this._idlength });
            }
            const car = await this.service.readOne(id);
            return car
                ? res.status(utils_1.OK).json(car)
                : res.status(utils_1.NOT_FOUND).json({ error: this._notfound });
        }
        catch (error) {
            return res.status(utils_1.INTERNAL_SERVER_ERROR).json({ error: this._internal });
        }
    };
    update = async (req, res) => {
        const { body, params: { id } } = req;
        if (!id)
            return res.status(utils_1.BAD_REQUEST).json({ error: this._requiredid });
        if (Object.keys(body).length === 0) {
            return res.status(utils_1.BAD_REQUEST).json({ error: this._badrequest });
        }
        if (id.length !== 24) {
            return res.status(utils_1.BAD_REQUEST)
                .json({ error: this._idlength });
        }
        const car = await this.service.update(id, body);
        if (!car)
            return res.status(utils_1.NOT_FOUND).json({ error: this._notfound });
        return res.status(utils_1.OK).json(car);
    };
    delete = async (req, res) => {
        const { params: { id } } = req;
        if (id.length !== 24) {
            return res.status(utils_1.BAD_REQUEST)
                .json({ error: this._idlength });
        }
        const car = await this.service.delete(id);
        if (!car)
            return res.status(utils_1.NOT_FOUND).json({ error: this._notfound });
        if ('error' in car) {
            return res.status(utils_1.BAD_REQUEST).json({ error: this._badrequest });
        }
        return res.status(utils_1.NO_CONTENT).json({ error: this._nocontent });
    };
}
exports.default = CarController;
