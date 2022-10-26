import * as sinon from 'sinon';
// import * as chai from 'chai';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import 'dotenv/config';
import app from '../../app';
import { Model } from 'mongoose';
import {
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleMockUpdate,
  motorcycleMockUpdateWithId,
  arrayMotorcycles,
  validID,
  nonExistentId,
  invalidID
} from '../mocks/motorcycle.mock';

chai.use(chaiHttp);
const { expect } = chai;

const { model, ...noModel} = motorcycleMock;
const { year, ...noYear} = motorcycleMock;
const { color, ...noColor} = motorcycleMock;
const { buyValue, ...noBuyValue} = motorcycleMock;
const { category, ...noCategory} = motorcycleMock;
const { engineCapacity, ...noEngineCapacity} = motorcycleMock;

const invalidMongoId = { error: 'Id must have 24 hexadecimal characters' };
const entityNotFound = { error: 'Object not found' };

const dataTests = [{model: 'oi'}, {model: 8}, {year: 1899}, {year: 2023},
{year: '2015'}, {color: 'ab'}, {color: 12}, {buyValue: 1234.56},
{buyValue: 'texto'}, {category: 1}, {category: 'texto'}, {engineCapacity: -1}, {engineCapacity: 2501}, {engineCapacity: 2.6}, {engineCapacity: 'texto'}];

const incompleteMocks = [{}, noModel, noColor, noBuyValue, noYear, noCategory, noEngineCapacity];

const erroMessageTest = [
  'Should be at least 3 characters',
  'Expected string, received number',
  'Value should be greater than or equal to 1900',
  'Value should be less than or equal to 2022',
  'Expected number, received string',
  'Should be at least 3 characters',
  'Expected string, received number',
  'Expected integer, received float',
  'Expected number, received string',
  `Invalid enum value. Expected 'Street' | 'Custom' | 'Trail', received 1`,
  `Invalid enum value. Expected 'Street' | 'Custom' | 'Trail', received 'texto'`,
  'Value should be greater than 0',
  'Value should be less than or equal to 2500',
  'Expected integer, received float',
  'Expected number, received string'
];

describe('Teste da rota "/motorcycles"', () => {
  afterEach(()=>{
    sinon.restore();
  })

  describe('Criação de uma nova moto', () => {
    it('Possível criar uma moto com sucesso', async () => {
      sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
      const response = await chai
        .request(app)
        .post('/motorcycles')
        .send(motorcycleMock);
      
      expect(response.status).to.be.equal(201);
      expect(response.body)
        .to.be.an('object')
        .and.to.deep.equal(motorcycleMockWithId);
    })

    it('Não é possível criar uma moto, sem algum dos campos obrigatórios', async () => {
      const create = sinon.spy(Model, 'create');
      for(let i = 0; i < incompleteMocks.length; i += 1) {
        const response = await chai
          .request(app)
          .post('/motorcycles')
          .send(incompleteMocks[i]);
        expect(response.status).to.be.equal(400);
        expect(create.notCalled).to.be.true;
      }
    })

    it('Os campos devem seguir os padrões de valor',async () => {
      const create = sinon.spy(Model, 'create');
      for(let i = 0; i < dataTests.length; i += 1) {
        const response = await chai
          .request(app)
          .post('/motorcycles')
          .send({ ...motorcycleMock, ...dataTests[i]});
        expect(response.status).to.be.equal(400);
        const erroMessage = response.body.error[0].message;
        expect(typeof(erroMessage) === 'string').to.be.true;
        expect(erroMessage).to.be.equal(erroMessageTest[i]);
        expect(create.notCalled).to.be.true;
      }
    })
  })

  describe('Possível pegar uma única moto', () => {
    it('É retornado uma moto correspondente ao id passado', async () => {
      sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
      const response = await chai
        .request(app)
        .get(`/motorcycles/${validID}`);
      expect(response.status).to.be.equal(200);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(motorcycleMockWithId);
    })

    it('Ao passar o id errado é retornado uma mensagem de erro', async () => {
      const findOne = sinon.spy(Model, 'findOne');
      const response = await chai
        .request(app)
        .get(`/motorcycles/${invalidID}`);
      expect(response.status).to.be.equal(400);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(invalidMongoId);
      expect(findOne.notCalled).to.be.true;
    })

    it('Caso não exista a uma moto correspondente ao id, é retornado uma mensagem de erro', async () => {
      sinon.stub(Model, 'findOne').resolves(null);
      const response = await chai
        .request(app)
        .get(`/motorcycles/${nonExistentId}`);
      expect(response.status).to.be.equal(404);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(entityNotFound);
    })
  })

  describe('Pegando todas as motos', () => {
    it('É retornado um array com todas as motos', async () => {
      sinon.stub(Model, 'find').resolves(arrayMotorcycles);
      const response = await chai
        .request(app)
        .get(`/motorcycles`);
      expect(response.status).to.be.equal(200);
      expect(response.body)
        .to.be.an('array')
        .to.be.deep.equal(arrayMotorcycles);
    })

    it('Caso não haja nenhuma moto cadastrada, é retornado um array vazio', async () => {
      sinon.stub(Model, 'find').resolves([]);
      const response = await chai
        .request(app)
        .get(`/motorcycles`);
      expect(response.status).to.be.equal(200);
      expect(response.body)
        .to.be.an('array')
        .to.be.deep.equal([]);
    })
  })

  describe('Edição de moto', () => {
    it('É possível editar uma moto corretamente', async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockUpdateWithId);
      const response = await chai
        .request(app)
        .put(`/motorcycles/${validID}`)
        .send(motorcycleMockUpdate);
      expect(response.status).to.be.equal(200);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(motorcycleMockUpdateWithId);
    })

    it('É retornado um erro caso não tenha uma moto com correspondência', async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      const response = await chai
        .request(app)
        .put(`/motorcycles/${nonExistentId}`)
        .send(motorcycleMockUpdate);
      expect(response.status).to.be.equal(404);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(entityNotFound);
    })

    it('Ao passar o id errado é retornado uma mensagem de erro', async () => {
      const update = sinon.spy(Model, 'findByIdAndUpdate');
      const response = await chai
        .request(app)
        .put(`/motorcycles/${invalidID}`)
        .send(motorcycleMockUpdate);
      expect(response.status).to.be.equal(400);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(invalidMongoId);
      expect(update.notCalled).to.be.true;
    })

    it('Os campos devem seguir os padrões de valor', async () => {
      const update = sinon.spy(Model, 'findByIdAndUpdate');
      for(let i = 0; i < dataTests.length; i += 1) {
        const response = await chai
          .request(app)
          .put(`/motorcycles/${validID}`)
          .send({ ...motorcycleMock, ...dataTests[i]});
        expect(response.status).to.be.equal(400);
        const erroMessage = response.body.error[0].message;  
        expect(typeof(erroMessage) === 'string').to.be.true;
        expect(erroMessage).to.be.equal(erroMessageTest[i]);
        expect(update.notCalled).to.be.true;
      }
    })

    it('Não é possível editar uma nova moto sem algum dos campos obrigatórios', async () => {
      const create = sinon.spy(Model, 'create');
      for(let i = 0; i < incompleteMocks.length; i += 1) {
        const response = await chai
          .request(app)
          .post('/motorcycles')
          .send(incompleteMocks[i]);
        expect(response.status).to.be.equal(400);
        expect(create.notCalled).to.be.true;
      }
    })
  })

  describe('Deletando uma moto', () => {
    it('É possível deletar uma moto corretamente', async () => {
      sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
      const response = await chai
        .request(app)
        .delete(`/motorcycles/${validID}`);
      expect(response.status).to.be.equal(204);
    })

    it('É retornado um erro caso não tenha uma moto correspondente', async () => {
      sinon.stub(Model, 'findByIdAndDelete').resolves(null);
      const response = await chai
        .request(app)
        .delete(`/motorcycles/${nonExistentId}`);
      expect(response.status).to.be.equal(404);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(entityNotFound);
    })

    it('Ao passar o id errado é retornado uma mensagem de erro', async () => {
      const remove = sinon.spy(Model, 'findByIdAndDelete');
      const response = await chai
        .request(app)
        .delete(`/motorcycles/${invalidID}`);
      expect(response.status).to.be.equal(400);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(invalidMongoId);
      expect(remove.notCalled).to.be.true;
    })
  })
})