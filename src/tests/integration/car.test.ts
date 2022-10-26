import * as sinon from 'sinon';
// import * as chai from 'chai';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import 'dotenv/config';
import { Response } from 'superagent';
import app from '../../app';
import { Model } from 'mongoose';
import {
  carMock,
  carMockWithId,
  carMockUpdate,
  carMockUpdateWithId,
  arrayCars,
  nonExistentId,
  invalidID,
  validID,
} from '../mocks/car.mock'
import { clear } from 'console';

chai.use(chaiHttp);
const { expect } = chai;

const { model, ...noModel} = carMock;
const { year, ...noYear} = carMock;
const { color, ...noColor} = carMock;
const { buyValue, ...noBuyValue} = carMock;
const { doorsQty, ...noDoorsQty} = carMock;
const { seatsQty, ...noSeatsQty} = carMock;

const invalidMongoId = { error: 'Id must have 24 hexadecimal characters' };
const entityNotFound = { error: 'Object not found' };

const dataTests = [{model: 'oi'}, {model: 8}, {year: 1899}, {year: 2023},
{year: '2015'}, {color: 'ab'}, {color: 12}, {buyValue: 1234.56},
{buyValue: 'texto'}, {doorsQty: 1}, {doorsQty: 5}, {doorsQty: 2.6},
{doorsQty: 'texto'}, {seatsQty: 1}, {seatsQty: 8}, {seatsQty: 2.6},
{seatsQty: 'texto'}];
const incompleteMocks = [{}, noModel, noColor, noBuyValue, noYear, noDoorsQty, noSeatsQty]
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
  'Value should be greater than or equal to 2',
  'Value should be less than or equal to 4',
  'Expected integer, received float',
  'Expected number, received string',
  'Value should be greater than or equal to 2',
  'Value should be less than or equal to 7',
  'Expected integer, received float',
  'Expected number, received string'
]

describe('Teste da rota "/cars"', () => {
  afterEach(()=>{
    sinon.restore();
  })

  describe('Criação de um novo carro', () => {
    it('É possível cria um carro com sucesso', async () => {
      sinon.stub(Model, 'create').resolves(carMockWithId);
      const response = await chai
        .request(app)
        .post('/cars')
        .send(carMock);
      
      expect(response.status).to.be.equal(201);
      expect(response.body)
        .to.be.an('object')
        .and.to.deep.equal(carMockWithId);
    })

    it('Não é possível criar um novo carro, sem algum dos campos obrigatórios', async () => {
      const create = sinon.spy(Model, 'create');
      // forEach não funcionou
      for(let i = 0; i < incompleteMocks.length; i += 1) {
        const response = await chai
          .request(app)
          .post('/cars')
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
          .post('/cars')
          .send({ ...carMock, ...dataTests[i]});
        expect(response.status).to.be.equal(400);
        const erroMessage = response.body.error[0].message;  
        expect(typeof(erroMessage) === 'string').to.be.true;
        expect(erroMessage).to.be.equal(erroMessageTest[i]);
        expect(create.notCalled).to.be.true;
      }
    })
  })

  describe('Possível pegar um carro', () => {
    it('É retornado um carro correspondente ao id passado', async () => {
      sinon.stub(Model, 'findOne').resolves(carMockWithId);
      const response = await chai
        .request(app)
        .get(`/cars/${validID}`);
      expect(response.status).to.be.equal(200);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(carMockWithId);
    })

    it('Ao passar o id errado é retornado uma mensagem de erro', async () => {
      const findOne = sinon.spy(Model, 'findOne');
      const response = await chai
        .request(app)
        .get(`/cars/${invalidID}`);
      expect(response.status).to.be.equal(400);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(invalidMongoId);
      expect(findOne.notCalled).to.be.true;
    })

    it('Caso não exista a um carro correspondente ao id, é retornado uma mensagem de erro', async () => {
      sinon.stub(Model, 'findOne').resolves(null);
      const response = await chai
        .request(app)
        .get(`/cars/${nonExistentId}`);
      expect(response.status).to.be.equal(404);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(entityNotFound);
    })
  })

  describe('Pegando todos os carros', () => {
    it('É retornado um array com todos os carros', async () => {
      sinon.stub(Model, 'find').resolves(arrayCars);
      const response = await chai
        .request(app)
        .get(`/cars`);
      expect(response.status).to.be.equal(200);
      expect(response.body)
        .to.be.an('array')
        .to.be.deep.equal(arrayCars);
    })

    it('Caso não haja nenhum carro cadastrado, é retornado um array vazio', async () => {
      sinon.stub(Model, 'find').resolves([]);
      const response = await chai
        .request(app)
        .get(`/cars`);
      expect(response.status).to.be.equal(200);
      expect(response.body)
        .to.be.an('array')
        .to.be.deep.equal([]);
    })
  })

  describe('Edição de carro', () => {
    it('É possível editar um carro corretamente', async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdateWithId);
      const response = await chai
        .request(app)
        .put(`/cars/${validID}`)
        .send(carMockUpdate);
      expect(response.status).to.be.equal(200);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(carMockUpdateWithId);
    })

    it('É retornado um erro caso não tenha um carro correspondência', async () => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      const response = await chai
        .request(app)
        .put(`/cars/${nonExistentId}`)
        .send(carMockUpdate);
      expect(response.status).to.be.equal(404);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(entityNotFound);
    })

    it('Ao passar o id errado é retornado uma mensagem de erro', async () => {
      const update = sinon.spy(Model, 'findByIdAndUpdate');
      const response = await chai
        .request(app)
        .put(`/cars/${invalidID}`)
        .send(carMockUpdate);
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
          .put(`/cars/${validID}`)
          .send({ ...carMock, ...dataTests[i]});
        expect(response.status).to.be.equal(400);
        const erroMessage = response.body.error[0].message;  
        expect(typeof(erroMessage) === 'string').to.be.true;
        expect(erroMessage).to.be.equal(erroMessageTest[i]);
        expect(update.notCalled).to.be.true;
      }
    })

    it('Não é possível criar um novo carro, sem algum dos campos obrigatórios', async () => {
      const create = sinon.spy(Model, 'create');
      // forEach não funcionou
      for(let i = 0; i < incompleteMocks.length; i += 1) {
        const response = await chai
          .request(app)
          .post('/cars')
          .send(incompleteMocks[i]);
        expect(response.status).to.be.equal(400);
        expect(create.notCalled).to.be.true;
      }
    })
  })

  describe('Deletando um carro', () => {
    it('É possível deletar um carro corretamente', async () => {
      sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
      const response = await chai
        .request(app)
        .delete(`/cars/${validID}`);
      expect(response.status).to.be.equal(204);
    })

    it('É retornado um erro caso não tenha um carro correspondência', async () => {
      sinon.stub(Model, 'findByIdAndDelete').resolves(null);
      const response = await chai
        .request(app)
        .delete(`/cars/${nonExistentId}`);
      expect(response.status).to.be.equal(404);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(entityNotFound);
    })

    it('Ao passar o id errado é retornado uma mensagem de erro', async () => {
      const remove = sinon.spy(Model, 'findByIdAndDelete');
      const response = await chai
        .request(app)
        .delete(`/cars/${invalidID}`);
      expect(response.status).to.be.equal(400);
      expect(response.body)
        .to.be.an('object')
        .to.be.deep.equal(invalidMongoId);
      expect(remove.notCalled).to.be.true;
    })
  })
})
