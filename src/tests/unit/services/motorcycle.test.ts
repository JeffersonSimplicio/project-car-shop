// import * as sinon from 'sinon';
// import chai from 'chai';
// const { expect } = chai;
// import MotorcycleModel from '../../../models/Motorcycle.model'
// import MotorcycleService from '../../../services/Motorcycle.service';
// import {
//   motorcycleMock,
//   motorcycleMockWithId,
//   motorcycleMockUpdate,
//   motorcycleMockUpdateWithId,
//   arrayMotorcycles,
//   validID,
//   nonExistentId,
// } from '../../mocks/motorcycle.mock';
// import { ZodError } from 'zod';
// import { ErrorTypes } from '../../../errors/catalog';

// describe('Testes de Services de Car', () => {
//   const motorcycleModel = new MotorcycleModel();
//   const motorcycleService = new MotorcycleService(motorcycleModel);

//   afterEach(()=>{
//     sinon.restore();
//   })

//   describe('Criando carro', () => {
//     it('É possível criar uma moto',async () => {
//       sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
//       const motorcycleCreated = await motorcycleService.create(motorcycleMock);
// 			expect(motorcycleCreated).to.be.deep.equal(motorcycleMockWithId);
//     })

//     it('É retornado um erro caso algum informação obrigatória não seja passada', async () => {
//       const create = sinon.spy(motorcycleModel, 'create')
// 			try {
// 				await motorcycleService.create({});
// 			} catch (err) {
//         expect(create.notCalled).to.be.true;
//         expect(err).to.be.instanceOf(ZodError);
// 			}
//     })
//   })

//   describe('Buscando por apenas uma moto', () => {
//     it('Ao passar um id valido, é retornada a moto correspondente', async () => {
//       sinon.stub(motorcycleModel, 'readOne').resolves(motorcycleMockWithId);
//       const motorcycle = await motorcycleService.readOne(validID);
//       expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
//     })

//     it('Ao passar um id inexistente, um erro é disparado', async () => {
//       sinon.stub(motorcycleModel, 'readOne').resolves(null);
//       try {
//         await motorcycleService.readOne(nonExistentId);
//       } catch (error: any) {
//         expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
//       }
//     })
//   })

//   describe('Buscando todas as motos', () => {
//     it('É retornado um array com todas as motos',async () => {
//       sinon.stub(motorcycleModel, 'read').resolves(arrayMotorcycles);
//       const motorcycles = await motorcycleService.read();
//       expect(motorcycles).to.be.deep.equal(arrayMotorcycles);
//     })
//   })

//   describe('Editando dados da moto', () => {
//     it('É possível editar uma moto corretamente', async () => {
//       sinon.stub(motorcycleModel, 'update').resolves(motorcycleMockUpdateWithId);
//       const motorcycle = await motorcycleService.update(validID, motorcycleMockUpdate);
//       expect(motorcycle).to.be.deep.equal(motorcycleMockUpdateWithId);
//     })

//     it('Caso o objeto passado não esteja correto um erro é disparado', async () => {
//       const update = sinon.spy(motorcycleModel, 'update')
//       try {
// 				await motorcycleService.update(validID, {});
// 			} catch (err) {
//         expect(update.notCalled).to.be.true;
//         expect(err).to.be.instanceOf(ZodError);
// 			}
//     })

//     it('Se o id passado não possuir correspondência, um erro é disparado', async () => {
//       sinon.stub(motorcycleModel, 'update').resolves(null);
//       try {
//         await motorcycleService.update(nonExistentId, motorcycleMockUpdate);
//       } catch (error: any) {
//         expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
//       }
//     })
//   })

//   describe('Deletando uma moto', () => {
//     it('É possível deletar uma moto', async () => {
//       sinon.stub(motorcycleModel, 'delete').resolves(motorcycleMockWithId);
//       const motorcycle = await motorcycleService.delete(validID);
//       expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
//     })

//     it('Se o id passado não possuir correspondência, um erro é disparado', async () => {
//       sinon.stub(motorcycleModel, 'delete').resolves(null);
//       try {
//         await motorcycleService.delete(nonExistentId);
//       } catch (error: any) {
//         expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
//       }
//     })
//   })
// });