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
const chai_1 = require("chai");
const sinon_1 = __importDefault(require("sinon"));
const Cars_model_1 = __importStar(require("../../../models/Cars.model"));
const mocks_1 = require("../../../mocks");
const carModel = new Cars_model_1.default();
describe('Car Model', () => {
    describe('Create car', () => {
        before(() => {
            sinon_1.default.stub(Cars_model_1.carModel, 'create').resolves(mocks_1.carMock);
        });
        after(() => {
            Cars_model_1.carModel.create.restore();
        });
        it('1 - New car successfully created returns a new car obj', async () => {
            const carCreated = await carModel.create(mocks_1.carMock);
            (0, chai_1.expect)(carCreated).to.be.deep.equal(mocks_1.carMock);
        });
        it('2 - New car has a property called "model"', async () => {
            const carCreated = await carModel.create(mocks_1.carMock);
            (0, chai_1.expect)(carCreated).to.have.property('model');
        });
    });
    describe('Read cars', () => {
        before(() => {
            sinon_1.default.stub(Cars_model_1.carModel, 'find').resolves([]);
        });
        after(() => {
            Cars_model_1.carModel.find.restore();
        });
        it('1 - Returns an array of cars', async () => {
            const carCreated = await carModel.read();
            (0, chai_1.expect)(carCreated).to.be.deep.equal([]);
        });
    });
    describe('ReadOne car', () => {
        before(() => {
            sinon_1.default.stub(Cars_model_1.carModel, 'findOne').resolves(mocks_1.readCarsOne);
        });
        after(() => {
            Cars_model_1.carModel.findOne.restore();
        });
        it('1 - Returns matched car', async () => {
            const carCreated = await carModel.readOne('4edd40c86762e0fb12000003');
            (0, chai_1.expect)(carCreated).to.be.equal(mocks_1.readCarsOne);
        });
    });
    describe('update car', () => {
        before(() => {
            sinon_1.default.stub(Cars_model_1.carModel, 'findOneAndUpdate').resolves(mocks_1.createdCarMock);
        });
        after(() => {
            Cars_model_1.carModel.findOneAndUpdate.restore();
        });
        it('1 - Returns updated car', async () => {
            const carUpdated = await carModel.update('4edd40c86762e0fb12000003', mocks_1.createdCarMock);
            (0, chai_1.expect)(carUpdated).to.be.equal(mocks_1.createdCarMock);
        });
    });
    describe('delete car', () => {
        before(() => {
            sinon_1.default.stub(Cars_model_1.carModel, 'findOneAndDelete')
                .resolves(mocks_1.readCarsOne);
        });
        after(() => {
            Cars_model_1.carModel.findOneAndDelete.restore();
        });
        it('1 - Returns deleted car', async () => {
            const carDeleted = await carModel.delete('4edd40c86762e0fb12000003');
            (0, chai_1.expect)(carDeleted).to.be.equal(mocks_1.readCarsOne);
        });
    });
});
