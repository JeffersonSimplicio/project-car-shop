import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { NextFunction, Request, Response } from 'express';
import CarModel from '../../../models/Car.model'
import CarService from '../../../services/Car.service';
import CarController from '../../../controllers/car.controller';
import {
  carMock,
  carMockWithId,
  carMockUpdate,
  carMockUpdateWithId,
  arrayCars,
  validID,
  nonExistentId,
  invalidID,
} from '../../mocks/car.mock';

describe('Testes do Controller de car', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request; 
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(()=>{
    sinon.restore();
  })

  describe('Criado novo carro', () => {
    it('É possível criar um novo carro', async () => {
      req.body = carMock;
      sinon.stub(carService, 'create').resolves(carMockWithId); 
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    })
  })

  // describe('Buscando apenas um carro', () => {
  //   it('É retornando um objeto com os dados do carro',async () => {
  //     req.params = { id: validID };
  //     sinon.stub(carService, 'readOne').resolves(carMockWithId);
  //     await carController.readOne(req, res);
  //     expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
  //     expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
  //   })
  // })

  // describe('Buscando todos os carros', () => {
  //   it('É retornando um array de objetos, com todos os carros',async () => {
  //     sinon.stub(carService, 'read').resolves(arrayCars);
  //     await carController.read(req, res);
  //     expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
  //     expect((res.json as sinon.SinonStub).calledWith(arrayCars)).to.be.true;
  //   })
  // })

  // describe('Editando um carro', () => {
  //   it('É retornado um objeto com os dados atualizados',async () => {
  //     req.params = { id: validID };
  //     req.body = carMockUpdate;
  //     sinon.stub(carService, 'update').resolves(carMockUpdateWithId);
  //     await carController.update(req, res);
  //     expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
  //     expect((res.json as sinon.SinonStub).calledWith(carMockUpdateWithId)).to.be.true;
  //   })
  // })

  // describe.skip('Deletando um carro', () => {
  //   it('É possível deletar um carro com sucesso',async () => {
  //     req.params = { id: validID };
  //     sinon.stub(carService, 'delete').resolves();
  //     await carController.delete(req, res);
  //     expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
  //     expect((res.json as sinon.SinonStub)).to.be.undefined;
  //   })
  // })
});