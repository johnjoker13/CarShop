import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import CarsModel, { carModel as mongoModel } from '../../../models/Cars.model';
import { carMock, createdCarMock, readCarsOne } from '../../../mocks';
import CarDocument from '../../../interfaces/CardDocument';

const carModel = new CarsModel();

describe('Car Model', () => {
  describe('Create car', () => {
    before(() => {
      sinon.stub(mongoModel, 'create').resolves(carMock);
    });

    after(() => {
      (mongoModel.create as SinonStub).restore();
    });

    it('1 - New car successfully created returns a new car obj', async () => {
      const carCreated = await carModel.create(carMock);
      expect(carCreated).to.be.deep.equal(carMock);
    });

    it('2 - New car has a property called "model"', async () => {
      const carCreated = await carModel.create(carMock);
      expect(carCreated).to.have.property('model');
    });
  });

  describe('Read cars', () => {
    before(() => {
      sinon.stub(mongoModel, 'find').resolves([]);
    });

    after(() => {
      (mongoModel.find as SinonStub).restore();
    });

    it('1 - Returns an array of cars', async () => {
      const carCreated = await carModel.read();
      expect(carCreated).to.be.deep.equal([]);
    });
  });

  describe('ReadOne car', () => {
    before(() => {
      sinon.stub(mongoModel, 'findOne').resolves(readCarsOne as (CarDocument & { _id: any }));
    });

    after(() => {
      (mongoModel.findOne as SinonStub).restore();
    });

    it('1 - Returns matched car', async () => {
      const carCreated = await carModel.readOne('4edd40c86762e0fb12000003');
      expect(carCreated).to.be.equal(readCarsOne);
    });
  });

  describe('update car', () => {
    before(() => {
      sinon.stub(mongoModel, 'findOneAndUpdate').resolves(createdCarMock as (CarDocument & { _id: any }));
    });

    after(() => {
      (mongoModel.findOneAndUpdate as SinonStub).restore();
    });

    it('1 - Returns updated car', async () => {
      const carUpdated = await carModel.update('4edd40c86762e0fb12000003', createdCarMock);
      expect(carUpdated).to.be.equal(createdCarMock);
    });
  });

  describe('delete car', () => {
    before(() => {
      sinon.stub(mongoModel, 'findOneAndDelete')
        .resolves(readCarsOne as (CarDocument & { _id: any }));
    });

    after(() => {
      (mongoModel.findOneAndDelete as SinonStub).restore();
    });

    it('1 - Returns deleted car', async () => {
      const carDeleted = await carModel.delete('4edd40c86762e0fb12000003');
      expect(carDeleted).to.be.equal(readCarsOne);
    });
  });

});
