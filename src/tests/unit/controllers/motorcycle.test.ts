import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Request, Response } from 'express';
import MotorcycleModel from '../../../models/Motorcycle.model'
import MotorcycleService from '../../../services/Motorcycle.service';
import MotorcycleController from '../../../controllers/Motorcycle.controller';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockUpdate,
  motorcycleMockUpdateWithId,
  arrayMotorcycles,
  validID,
} from '../../mocks/motorcycle.mock';

describe('Testes do Controller de Motorcycle', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request; 
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(()=>{
    sinon.restore();
  })

  describe('Criado uma nova moto', () => {
    it('É possível criar uma nova moto', async () => {
      req.body = motorcycleMock;
      sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId); 
      await motorcycleController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    })
  })

  describe('Buscando apenas uma moto', () => {
    it('É retornando um objeto com os dados da moto',async () => {
      req.params = { id: validID };
      sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
      await motorcycleController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    })
  })

  describe('Buscando todas as motos', () => {
    it('É retornando um array de objetos, com todas as motos',async () => {
      sinon.stub(motorcycleService, 'read').resolves(arrayMotorcycles);
      await motorcycleController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(arrayMotorcycles)).to.be.true;
    })
  })

  describe('Editando uma moto', () => {
    it('É retornado um objeto com os dados atualizados',async () => {
      req.params = { id: validID };
      req.body = motorcycleMockUpdate;
      sinon.stub(motorcycleService, 'update').resolves(motorcycleMockUpdateWithId);
      await motorcycleController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockUpdateWithId)).to.be.true;
    })
  })

  describe('Deletando uma moto', () => {
    it('É possível deletar um carro com sucesso',async () => {
      res.end = sinon.stub().returns(null);
      req.params = { id: validID };
      sinon.stub(motorcycleService, 'delete').resolves();
      await motorcycleController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    })
  })
});