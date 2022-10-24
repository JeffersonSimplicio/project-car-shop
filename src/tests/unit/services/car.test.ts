import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import CarModel from '../../../models/Car.model'
import CarService from '../../../services/Car.service';
import {
  carMock,
  carMockWithId,
  carMockUpdate,
  carMockUpdateWithId,
  arrayCars,
  validID,
  nonExistentId,
} from '../../mocks/car.mock'
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';

describe('Testes de Services de Car', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  afterEach(()=>{
    sinon.restore();
  })

  describe('Criando carro', () => {
    it('É possível criar um carro',async () => {
      sinon.stub(carModel, 'create').resolves(carMockWithId);
      const frameCreated = await carService.create(carMock);
			expect(frameCreated).to.be.deep.equal(carMockWithId);
    })

    it('É retornado um erro caso algum informação obrigatória não seja passada', async () => {
      const create = sinon.spy(carModel, 'create')
			try {
				await carService.create({});
			} catch (err) {
        expect(create.notCalled).to.be.true;
        expect(err).to.be.instanceOf(ZodError);
			}
    })
  })

  describe('Buscando por apenas um carro', () => {
    it('Ao passar um id valido, é retornado o carro correspondente', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMockWithId);
      const car = await carService.readOne(validID);
      expect(car).to.be.deep.equal(carMockWithId);
    })

    it('Ao passar um id inexistente, um erro é disparado', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);
      try {
        await carService.readOne(nonExistentId);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    })
  })

  describe('Buscando todos os carros', () => {
    it('É retornado um array com todos os carros',async () => {
      sinon.stub(carModel, 'read').resolves(arrayCars);
      const cars = await carService.read();
      expect(cars).to.be.deep.equal(arrayCars);
    })
  })

  describe('Editando dados de carro', () => {
    it('É possível editar um carro corretamente', async () => {
      sinon.stub(carModel, 'update').resolves(carMockUpdateWithId);
      const car = await carService.update(validID, carMockUpdate);
      expect(car).to.be.deep.equal(carMockUpdateWithId);
    })

    it('Caso o objeto passado não esteja correto um erro é disparado', async () => {
      const update = sinon.spy(carModel, 'update')
      try {
				await carService.update(validID, {});
			} catch (err) {
        expect(update.notCalled).to.be.true;
        expect(err).to.be.instanceOf(ZodError);
			}
    })

    it('Se o id passado não possuir correspondência, um erro é disparado', async () => {
      sinon.stub(carModel, 'update').resolves(null);
      try {
        await carService.update(nonExistentId, carMockUpdate);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    })
  })

  describe('Deletando um carro', () => {
    it('É possível deletar um carro', async () => {
      sinon.stub(carModel, 'delete').resolves(carMockWithId);
      const car = await carService.delete(validID);
      expect(car).to.be.deep.equal(carMockWithId);
    })

    it('Se o id passado não possuir correspondência, um erro é disparado', async () => {
      sinon.stub(carModel, 'delete').resolves(null);
      try {
        await carService.delete(nonExistentId);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      }
    })
  })
});