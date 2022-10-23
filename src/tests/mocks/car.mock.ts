import { ICar } from '../../interfaces/ICar';

const validID: string = '6353fbad449d70068466565c';

const invalidID: string = '12idInvalido34';

const carMock: ICar = {
  model: 'Honda Civic',
  color: 'Black',
  year: 2022,
  status: true,
  buyValue: 170000,
  doorsQty: 4,
  seatsQty: 5,
}

const carMockWithId: ICar & { _id: string } = {
  _id: validID,
  ...carMock,
}

const carMockUpdate: ICar = {
  model: 'Honda Civic',
  color: 'Red',
  year: 2022,
  status: true,
  buyValue: 160000,
  doorsQty: 4,
  seatsQty: 5,
}

const carMockUpdateWithId: ICar & { _id: string } = {
  _id: validID,
  ...carMockUpdate,
}

const arrayCars: (ICar & { _id: string })[] = [
  carMockWithId,
  {
    _id: '62cf1fc6498565d94eba52cd',
    model: 'BMW M5',
    color: 'Silver',
    year: 2020,
    status: true,
    buyValue: 760000,
    doorsQty: 4,
    seatsQty: 5,
  }
]

export {
  carMock,
  carMockWithId,
  carMockUpdate,
  carMockUpdateWithId,
  arrayCars,
  validID,
  invalidID,
}