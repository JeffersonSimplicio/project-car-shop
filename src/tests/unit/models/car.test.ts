import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
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

describe('Teste Model de Cars', () => {
  const carModel = new CarModel();

  describe('Criação de um novo caro', () => {
    // after(()=>{
    //   sinon.restore();
    // })

    it('É possível adicionar um carro corretamente', async () => {
      sinon.stub(Model, 'create').resolves(carMockWithId);
      const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
    });
  })

  describe('Buscando apenas um carro', () => {
    // after(()=>{
    //   sinon.restore();
    // })

    it('Buscando por um id valido', async () => {
      sinon.stub(Model, 'findOne').resolves(carMockWithId);
      const car = await carModel.readOne(validID);
      expect(car).to.be.deep.equal(carMockWithId);
    })

    it('É retornado um erro ao buscar por um id invalido', async () => {
      try {
        await carModel.readOne(invalidID);
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId');
      }
    })
  })

  describe('Buscando por todos os carros', () => {
    // after(()=>{
    //   sinon.restore();
    // })

    it('É retornando um array com todos os carros',async () => {
      sinon.stub(Model, 'find').resolves(arrayCars);
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal(arrayCars);
    })
  })

  describe('Edição de dados de carros', () => {
    // after(()=>{
    //   sinon.restore();
    // })

    it('Editando corretamente os dados', async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdateWithId);
      const car = await carModel.update(validID, carMockUpdate);
      expect(car).to.be.deep.equal(carMockUpdateWithId);
    })

    it('É retornado um erro ao tentar editar um carro com id invalido', async () => {
      try {
        await carModel.readOne(invalidID);
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
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
      try {
        await carModel.delete(invalidID);
      } catch (error: any) {
        expect(error.message).to.be.equal('InvalidMongoId');
      }
    })
  })
});