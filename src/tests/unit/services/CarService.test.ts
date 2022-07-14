import { expect } from 'chai';
import CarService from '../../../services/Cars.service';
import { carMock } from '../../../mocks';
import sinon, { SinonStub } from 'sinon';

describe('Car Service', () => {
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

    it('3 - New car has a property called status', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.have.property('status');
    });

    it('4 - New car has a property called status', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.have.property('doorsQty');
    });

    it('5 - New car has a property called status', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.have.property('seatsQty');
    });
  });

  describe('Read Car', () => {
    before(() => {
      sinon.stub(carService, 'read').resolves([]);
    });

    after(() => {
      (carService.read as SinonStub).restore();
    });
    
    it('1 - Success finding a car', async () => {
      const car = await carService.read();
      expect(car).to.be.deep.equal([]);
    });
  });


  describe('FindOne Car', () => {
    before(() => {
      sinon.stub(carService, 'readOne').resolves(carMock);
    });

    after(() => {
      (carService.readOne as SinonStub).restore();
    });
    
    it('1 - Success finding a car', async () => {
      const car = await carService.readOne('1');
      expect(car).to.be.deep.equal(carMock);
    });

    it('2 - car has a property called model', async () => {
      const car = await carService.readOne('1');
      expect(car).to.have.property('model');
    });

    it('3 - car has a property called status', async () => {
      const car = await carService.readOne('1');
      expect(car).to.have.property('status');
    });

    it('4 - car has a property called status', async () => {
      const car = await carService.readOne('1');
      expect(car).to.have.property('doorsQty');
    });

    it('5 - car has a property called status', async () => {
      const car = await carService.readOne('1');
      expect(car).to.have.property('seatsQty');
    });
  });
});
