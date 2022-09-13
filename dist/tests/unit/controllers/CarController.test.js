"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importStar(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const mocks_1 = require("../../../mocks");
const sinon_1 = __importDefault(require("sinon"));
const Cars_controller_1 = __importDefault(require("../../../controllers/Cars.controller"));
chai_1.default.use(chai_http_1.default);
const req = {};
const res = {};
const carController = new Cars_controller_1.default();
describe('Car Controller', () => {
    describe('Create Car', () => {
        before(async () => {
            res.status = sinon_1.default.stub().returns(res);
            res.json = sinon_1.default.stub().returns(res);
        });
        describe('Request without body:', () => {
            it('Returns status: 400', async () => {
                req.body = {};
                await carController.create(req, res);
                (0, chai_1.expect)(res.status.calledWith(400)).to.be.true;
            });
        });
    });
    describe('Request with a valid body:', () => {
        it('Returns status 201', async () => {
            const req = {};
            const res = {};
            sinon_1.default
                .stub(carController.service, 'create')
                .resolves(mocks_1.createdCarMock);
            res.status = sinon_1.default.stub().returns(res);
            res.json = sinon_1.default.stub().returns(res);
            req.body = mocks_1.carMock;
            await carController.create(req, res);
            (0, chai_1.expect)(res.status.calledWith(201)).to.be.true;
            (0, chai_1.expect)(res.json.calledWith(mocks_1.createdCarMock)).to.be.true;
            sinon_1.default.restore();
        });
        it('Find by id', async () => {
            const req = { params: {
                    id: '4edd40c86762e0fb12000003'
                } };
            const res = {};
            sinon_1.default
                .stub(carController.service, 'readOne')
                .resolves(mocks_1.readCarsOne);
            res.status = sinon_1.default.stub().returns(res);
            res.json = sinon_1.default.stub().returns(res);
            await carController.readOne(req, res);
            (0, chai_1.expect)(res.status.calledWith(200)).to.be.true;
            (0, chai_1.expect)(res.json.calledWith(mocks_1.readCarsOne)).to.be.true;
            sinon_1.default.restore();
        });
        it('Update by id', async () => {
            const req = { params: {
                    id: '4edd40c86762e0fb12000003',
                }, body: { readCarsOne: mocks_1.readCarsOne } };
            const res = {};
            sinon_1.default
                .stub(carController.service, 'update')
                .resolves(mocks_1.readCarsOne);
            res.status = sinon_1.default.stub().returns(res);
            res.json = sinon_1.default.stub().returns(res);
            await carController.update(req, res);
            (0, chai_1.expect)(res.status.calledWith(200)).to.be.true;
            (0, chai_1.expect)(res.json.calledWith(mocks_1.readCarsOne)).to.be.true;
            sinon_1.default.restore();
        });
        it('Delete by id', async () => {
            const req = { params: {
                    id: '4edd40c86762e0fb12000003',
                } };
            const res = {};
            sinon_1.default
                .stub(carController.service, 'delete')
                .resolves(mocks_1.readCarsOne);
            res.status = sinon_1.default.stub().returns(res);
            res.json = sinon_1.default.stub().returns(res);
            await carController.delete(req, res);
            (0, chai_1.expect)(res.status.calledWith(204)).to.be.true;
            sinon_1.default.restore();
        });
    });
});
