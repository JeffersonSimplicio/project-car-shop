import { IMotorcycle } from '../../interfaces/IMotorcycle';

const validID: string = '6353fbad449d70068466565c';

const invalidID: string = '12idInvalido34';

const nonExistentId: string = '62cf1fc6498565d94eba52cd';

const motorcycleMock: IMotorcycle = {
  model: 'Harley-Davidson Fat Bob',
  color: 'Black',
  year: 2022,
  status: true,
  buyValue: 102000,
  category: 'Custom',
  engineCapacity: 1868,
}

const motorcycleMockWithId: IMotorcycle & { _id: string } = {
  _id: validID,
  ...motorcycleMock,
}

const motorcycleMockUpdate: IMotorcycle = {
  model: 'Harley-Davidson Fat Bob',
  color: 'Gray',
  year: 2022,
  status: true,
  buyValue: 98000,
  category: 'Custom',
  engineCapacity: 1868,
}

const motorcycleMockUpdateWithId: IMotorcycle & { _id: string } = {
  _id: validID,
  ...motorcycleMockUpdate,
}

const arrayMotorcycles: (IMotorcycle & { _id: string })[] = [
  motorcycleMockWithId,
  {
    _id: '62cf1fc6498565d94eba52cd',
    model: 'BMW R 1250 GS ADVENTURE',
    color: 'White',
    year: 2020,
    status: true,
    buyValue: 92000,
    category: 'Custom',
    engineCapacity: 1250,
  }
]

export {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockUpdate,
  motorcycleMockUpdateWithId,
  arrayMotorcycles,
  validID,
  nonExistentId,
  invalidID,
}