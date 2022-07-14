import { expect } from 'chai';
import { model } from 'mongoose';
import sinon, { SinonStub } from 'sinon';
import { Car } from '../../../interfaces/CarInterface';
import CarsModel, { carSchema } from '../../../models/Cars.model';
import { carMock } from '../../../mocks';

describe('Car Model', () => {
  const carMongooseModel = model<Car>('Cars', carSchema);

  describe('Create car', () => {
    before(() => {
      sinon.stub(carMongooseModel, 'create').resolves(carMock);
    });

    after(() => {
      (carMongooseModel.create as SinonStub).restore();
    });

    it('1 - New car successfully created returns a new car obj', async () => {
      const carModel = new CarsModel();
      const carCreated = await carModel.create(carMock);
      expect(carCreated).to.be.deep.equal(carMock);
    });

    it('2 - New car has a property called "model"', async () => {
      const carModel = new CarsModel();
      const carCreated = await carModel.create(carMock);
      expect(carCreated).to.have.property('model');
    });
  });

  describe('Read cars', () => {
    before(() => {
      sinon.stub(carMongooseModel, 'find').resolves([]);
    });

    after(() => {
      (carMongooseModel.find as SinonStub).restore();
    });

    it('1 - Returns an array of cars', async () => {
      const carModel = new CarsModel();
      const carCreated = await carModel.read();
      expect(carCreated).to.be.deep.equal([]);
    });
  });

});
