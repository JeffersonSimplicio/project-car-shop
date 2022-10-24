// import * as sinon from 'sinon';
// import chai from 'chai';
// const { expect } = chai;
// import { Request, Response } from 'express';
// import MotorcycleModel from '../../../models/Motorcycle.model'
// import MotorcycleService from '../../../services/Motorcycle.service';
// import MotorcycleController from '../../../controllers/Motorcycle.controller';
// import {
//   motorcycleMock,
//   motorcycleMockWithId,
//   motorcycleMockUpdate,
//   motorcycleMockUpdateWithId,
//   arrayMotorcycles,
//   validID,
// } from '../../mocks/motorcycle.mock';

// describe('Testes do Controller de car', () => {
//   const motorcycleModel = new MotorcycleModel();
//   const motorcycleService = new MotorcycleService(motorcycleModel);
//   const motorcycleController = new MotorcycleController(motorcycleService);

//   const req = {} as Request; 
//   const res = {} as Response;

//   beforeEach(() => {
//     res.status = sinon.stub().returns(res);
//     res.json = sinon.stub().returns(res);
//   });

//   afterEach(()=>{
//     sinon.restore();
//   })

//   describe('Criado novo carro', () => {
//     it('É possível criar um novo carro', async () => {
//       req.body = motorcycleMock;
//       sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId); 
//       await motorcycleController.create(req, res);
//       expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
//       expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
//     })
//   })

//   describe('Buscando apenas um carro', () => {
//     it('É retornando um objeto com os dados do carro',async () => {
//       req.params = { id: validID };
//       sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
//       await motorcycleController.readOne(req, res);
//       expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
//       expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
//     })
//   })

//   describe('Buscando todos os carros', () => {
//     it('É retornando um array de objetos, com todos os carros',async () => {
//       sinon.stub(motorcycleService, 'read').resolves(arrayMotorcycles);
//       await motorcycleController.read(req, res);
//       expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
//       expect((res.json as sinon.SinonStub).calledWith(arrayMotorcycles)).to.be.true;
//     })
//   })

//   describe('Editando um carro', () => {
//     it('É retornado um objeto com os dados atualizados',async () => {
//       req.params = { id: validID };
//       req.body = motorcycleMockUpdate;
//       sinon.stub(motorcycleService, 'update').resolves(motorcycleMockUpdateWithId);
//       await motorcycleController.update(req, res);
//       expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
//       expect((res.json as sinon.SinonStub).calledWith(motorcycleMockUpdateWithId)).to.be.true;
//     })
//   })

//   describe('Deletando um carro', () => {
//     it('É possível deletar um carro com sucesso',async () => {
//       res.end = sinon.stub().returns(null);
//       req.params = { id: validID };
//       sinon.stub(motorcycleService, 'delete').resolves();
//       await motorcycleController.delete(req, res);
//       expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
//     })
//   })
// });