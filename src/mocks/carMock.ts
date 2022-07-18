import { Car } from '../interfaces/CarInterface';

const carMock: Car = {
  model: 'Tesla Model X',
  year: 2022,
  color: 'Blue',
  status: true,
  buyValue: 500000,
  doorsQty: 4,
  seatsQty: 5,  
};

const createdCarMock = {
  _id: '4edd40c86762e0fb12000003',
  __v: 0,
  model: 'Tesla Model X',
  year: 2022,
  color: 'Blue',
  status: true,
  buyValue: 500000,
  doorsQty: 4,
  seatsQty: 5,
};

const readCarsOne = {
  _id: '4edd40c86762e0fb12000003',
  __v: 0,
  model: 'Ferrari Maranello',
  year: 1963,
  color: 'red',
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
};
export { carMock, createdCarMock, readCarsOne };
