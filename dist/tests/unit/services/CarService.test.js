"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const Cars_service_1 = __importDefault(require("../../../services/Cars.service"));
const mocks_1 = require("../../../mocks");
const sinon_1 = __importDefault(require("sinon"));
describe('Car Service', () => {
    const carService = new Cars_service_1.default();
    describe('Create Car', () => {
        before(() => {
            sinon_1.default.stub(carService, 'create').resolves(mocks_1.carMock);
        });
        after(() => {
            carService.create.restore();
        });
        it('1 - Success on creating a new car', async () => {
            const carCreated = await carService.create(mocks_1.carMock);
            (0, chai_1.expect)(carCreated).to.be.deep.equal(mocks_1.carMock);
        });
        it('2 - New car has a property called model', async () => {
            const carCreated = await carService.create(mocks_1.carMock);
            (0, chai_1.expect)(carCreated).to.have.property('model');
        });
        it('3 - New car has a property called status', async () => {
            const carCreated = await carService.create(mocks_1.carMock);
            (0, chai_1.expect)(carCreated).to.have.property('status');
        });
        it('4 - New car has a property called status', async () => {
            const carCreated = await carService.create(mocks_1.carMock);
            (0, chai_1.expect)(carCreated).to.have.property('doorsQty');
        });
        it('5 - New car has a property called status', async () => {
            const carCreated = await carService.create(mocks_1.carMock);
            (0, chai_1.expect)(carCreated).to.have.property('seatsQty');
        });
    });
    describe('Read Car', () => {
        before(() => {
            sinon_1.default.stub(carService, 'read').resolves([]);
        });
        after(() => {
            carService.read.restore();
        });
        it('1 - Success finding a car', async () => {
            const car = await carService.read();
            (0, chai_1.expect)(car).to.be.deep.equal([]);
        });
    });
    describe('FindOne Car', () => {
        before(() => {
            sinon_1.default.stub(carService, 'readOne').resolves(mocks_1.carMock);
        });
        after(() => {
            carService.readOne.restore();
        });
        it('1 - Success finding a car', async () => {
            const car = await carService.readOne('1');
            (0, chai_1.expect)(car).to.be.deep.equal(mocks_1.carMock);
        });
        it('2 - car has a property called model', async () => {
            const car = await carService.readOne('1');
            (0, chai_1.expect)(car).to.have.property('model');
        });
        it('3 - car has a property called status', async () => {
            const car = await carService.readOne('1');
            (0, chai_1.expect)(car).to.have.property('status');
        });
        it('4 - car has a property called status', async () => {
            const car = await carService.readOne('1');
            (0, chai_1.expect)(car).to.have.property('doorsQty');
        });
        it('5 - car has a property called status', async () => {
            const car = await carService.readOne('1');
            (0, chai_1.expect)(car).to.have.property('seatsQty');
        });
    });
    describe('update Car', () => {
        before(() => {
            sinon_1.default.stub(carService, 'update').resolves(mocks_1.readCarsOne);
        });
        after(() => {
            carService.update.restore();
        });
        it('1 - Success updating a car', async () => {
            const car = await carService
                .update('4edd40c86762e0fb12000003', mocks_1.readCarsOne);
            (0, chai_1.expect)(car).to.be.equal(mocks_1.readCarsOne);
        });
    });
    describe('delete Car', () => {
        before(() => {
            sinon_1.default.stub(carService, 'delete').resolves(mocks_1.readCarsOne);
        });
        after(() => {
            carService.delete.restore();
        });
        it('1 - Success deleting a car', async () => {
            const car = await carService
                .delete('4edd40c86762e0fb12000003');
            (0, chai_1.expect)(car).to.be.equal(mocks_1.readCarsOne);
        });
    });
});
