import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { carMock, createdCarMock, readCarsOne } from '../../../mocks';
import sinon from 'sinon';
import { Request, Response } from 'express';
import CarController from '../../../controllers/Cars.controller';
import { RequestWithBody, ResponseError } from '../../../controllers/CustomController';
import { Car } from '../../../interfaces/CarInterface';

chai.use(chaiHttp);

const req = {} as Request;
const res = {} as Response<Car | ResponseError>;

const carController = new CarController();

describe('Car Controller', () => {
  describe('Create Car', () => {
    before(async () => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    describe('Request without body:', () => {
      it('Returns status: 400', async () => {
        req.body = {};
        await carController.create(req, res);

        expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      });
    });
  });
  describe('Request with a valid body:', () => {
    it('Returns status 201', async () => {
      const req = {} as RequestWithBody<Car>
      const res = {} as Response<Car | ResponseError>
      sinon
        .stub(carController.service, 'create')
        .resolves(createdCarMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock as Car

      await carController.create(req, res)
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(createdCarMock)).to.be.true
      sinon.restore();
    });

    it('Find by id', async () => {
      const req = { params: {
        id: '4edd40c86762e0fb12000003'
      } } as Request<{ id: string }>
      const res = {} as Response<Car | ResponseError>
      sinon
        .stub(carController.service, 'readOne')
        .resolves(readCarsOne)
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(readCarsOne)).to.be.true
      sinon.restore();
    });

    it('Update by id', async () => {
      const req = {  params: {
        id: '4edd40c86762e0fb12000003',
      }, body: { readCarsOne } } as Request<{ id: string }, { body: Car }>
      const res = {} as Response<Car | ResponseError>
      sinon
        .stub(carController.service, 'update')
        .resolves(readCarsOne)
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await carController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true
      expect((res.json as sinon.SinonStub).calledWith(readCarsOne)).to.be.true
      sinon.restore();
    });

    it('Delete by id', async () => {
      const req = {  params: {
        id: '4edd40c86762e0fb12000003',
      }} as Request<{ id: string }>
      const res = {} as Response<Car | ResponseError>
      sinon
        .stub(carController.service, 'delete')
        .resolves(readCarsOne)
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await carController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true
      sinon.restore();
    });
  });
});
