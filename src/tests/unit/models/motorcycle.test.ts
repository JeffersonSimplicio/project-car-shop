import * as sinon from 'sinon';
import chai from 'chai';
const { expect, use } = chai;
import MotorcycleModel from '../../../models/Motorcycle.model'
import { Model } from 'mongoose';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockUpdate,
  motorcycleMockUpdateWithId,
  arrayMotorcycles,
  invalidID,
  validID,
} from '../../mocks/motorcycle.mock'

describe('Teste Model de Motorcycles', () => {
  const motorcycleModel = new MotorcycleModel();

  afterEach(()=>{
    sinon.restore();
  })

  describe('Criação de uma nova moto', () => {
    it('É possível adicionar uma moto corretamente', async () => {
      sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);
			expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  })

  describe('Buscando apenas um moto', () => {
    it('Buscando por um id valido', async () => {
      sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
      const motorcycle = await motorcycleModel.readOne(validID);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    })

    it('É retornado um erro ao buscar por um id invalido', async () => {
      const findOne = sinon.spy(Model, 'findOne');
      try {
        await motorcycleModel.readOne(invalidID);
      } catch (error: any) {
        expect(findOne.notCalled).to.be.true;
        expect(error.message).to.be.equal('InvalidMongoId');
      }
    })
  })

  describe('Buscando por todas as motos', () => {
    it('É retornando um array com todas as motos',async () => {
      sinon.stub(Model, 'find').resolves(arrayMotorcycles);
      const motorcycles = await motorcycleModel.read();
      expect(motorcycles).to.be.deep.equal(arrayMotorcycles);
    })
  })

  describe('Edição de dados de uma moto', () => {
    it('Editando corretamente os dados', async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockUpdateWithId);
      const motorcycle = await motorcycleModel.update(validID, motorcycleMockUpdate);
      expect(motorcycle).to.be.deep.equal(motorcycleMockUpdateWithId);
    })

    it('É retornado um erro ao tentar editar uma moto com id invalido', async () => {
      const update = sinon.spy(Model, 'findByIdAndUpdate');
      try {
        await motorcycleModel.update(invalidID, motorcycleMockUpdate);
      } catch (error: any) {
        expect(update.notCalled).to.be.true;
        expect(error.message).to.be.equal('InvalidMongoId');
      }
    })
  })

  describe('Deletar uma moto', () => {
    it('É possível deletar uma moto corretamente',async () => {
      sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
      const motorcycle = await motorcycleModel.delete(validID);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    })

    it('É retornado um erro ao tentar editar uma moto com id invalido', async () => {
      const remove = sinon.spy(Model, 'findByIdAndDelete');
      try {
        await motorcycleModel.delete(invalidID);
      } catch (error: any) {
        expect(remove.notCalled).to.be.true;
        expect(error.message).to.be.equal('InvalidMongoId');
      }
    })
  })
});