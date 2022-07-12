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
  });
});
