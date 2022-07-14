import { expect } from 'chai';
import CarService from '../../../services/Cars.service';
import { carMock } from '../../../mocks';
import sinon, { SinonStub } from 'sinon';

describe('Car Controller', () => {
  const carService = new CarService();
  describe('Create Car', () => {
    before(() => {
      sinon.stub(carService, 'create').resolves(carMock);
    });

    after(() => {
      (carService.create as SinonStub).restore();
    });
    
    it('1 - Success on creating a new car', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.be.deep.equal(carMock);
    });

    it('2 - New car has a property called model', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.have.property('model');
    });
  });

  describe('Read Cars', () => {
    before(() => {
      sinon.stub(carService, 'read').resolves([]);
    });

    after(() => {
      (carService.read as SinonStub).restore();
    });
    
    it('1 - Success on reading all cars', async () => {
      const carCreated = await carService.read();
      expect(carCreated).to.be.deep.equal([]);
    });
  });

  describe('readOne Car', () => {
    before(() => {
      sinon.stub(carService, 'readOne').resolves(carMock);
    });

    after(() => {
      (carService.readOne as SinonStub).restore();
    });
    
    it('1 - Success on creating a new car', async () => {
      const car = await carService.readOne('1');
      expect(car).to.be.deep.equal(carMock);
    });

    it('2 - New car has a property called model', async () => {
      const car = await carService.readOne('1');
      expect(car).to.have.property('model');
    });
  });
});
