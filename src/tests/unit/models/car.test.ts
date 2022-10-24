import * as sinon from 'sinon';
import chai from 'chai';
const { expect, use } = chai;
import CarModel from '../../../models/Car.model'
import { Model } from 'mongoose';
import {
  carMock,
  carMockWithId,
  carMockUpdate,
  carMockUpdateWithId,
  arrayCars,
  invalidID,
  validID,
} from '../../mocks/car.mock'

import chaiAsPromised from 'chai-as-promised';

use(chaiAsPromised)

describe('Teste Model de Cars', () => {
  const carModel = new CarModel();

  afterEach(()=>{
    sinon.restore();
  })

  describe('Criação de um novo caro', () => {
    it('É possível adicionar um carro corretamente', async () => {
      sinon.stub(Model, 'create').resolves(carMockWithId);
      const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
    });
  })

  describe('Buscando apenas um carro', () => {
    it('Buscando por um id valido', async () => {
      sinon.stub(Model, 'findOne').resolves(carMockWithId);
      const car = await carModel.readOne(validID);
      expect(car).to.be.deep.equal(carMockWithId);
    })

    it('É retornado um erro ao buscar por um id invalido', async () => {
      const findOne = sinon.spy(Model, 'findOne');
      try {
        await carModel.readOne(invalidID);
      } catch (error: any) {
        expect(findOne.notCalled).to.be.true;
        expect(error.message).to.be.equal('InvalidMongoId');
      }
    })
  })

  describe('Buscando por todos os carros', () => {
    it('É retornando um array com todos os carros',async () => {
      sinon.stub(Model, 'find').resolves(arrayCars);
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal(arrayCars);
    })
  })

  describe('Edição de dados de carros', () => {
    it('Editando corretamente os dados', async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdateWithId);
      const car = await carModel.update(validID, carMockUpdate);
      expect(car).to.be.deep.equal(carMockUpdateWithId);
    })

    it('É retornado um erro ao tentar editar um carro com id invalido', async () => {
      const update = sinon.spy(Model, 'findByIdAndUpdate');
      try {
        await carModel.update(invalidID, carMockUpdate);
      } catch (error: any) {
        expect(update.notCalled).to.be.true;
        expect(error.message).to.be.equal('InvalidMongoId');
      }
    })
  })

  describe('Deletar um carro', () => {
    it('É possível deletar um carro corretamente',async () => {
      sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
      const car = await carModel.delete(validID);
      expect(car).to.be.deep.equal(carMockWithId);
    })

    it('É retornado um erro ao tentar editar um carro com id invalido', async () => {
      const remove = sinon.spy(Model, 'findByIdAndDelete');
      try {
        await carModel.delete(invalidID);
      } catch (error: any) {
        expect(remove.notCalled).to.be.true;
        expect(error.message).to.be.equal('InvalidMongoId');
      }
    })
  })
});