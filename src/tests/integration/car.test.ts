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

chai.use(chaiHttp);
const { expect } = chai;

const { model, ...noModel} = carMock;
const { year, ...noYear} = carMock;
const { color, ...noColor} = carMock;
const { buyValue, ...noBuyValue} = carMock;
const { doorsQty, ...noDoorsQty} = carMock;
const { seatsQty, ...noSeatsQty} = carMock;

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
      const tests = [{}, noModel, noColor, noBuyValue, noYear, noDoorsQty, noSeatsQty]
      const create = sinon.spy(Model, 'create');
      // forEach não funcionou
      for(let i = 0; i < tests.length; i += 1) {
        const response = await chai.request(app).post('/cars').send(tests[i]);
        expect(response.status).to.be.equal(400);
        expect(create.notCalled).to.be.true;
      }
    })

    it('Os campos devem seguir os padrões de valor',async () => {
      const tests = [{model: 'oi'}, {model: 8}, {year: 1899}, {year: 2023},
      {year: '2015'}, {color: 'ab'}, {color: 12}, {buyValue: 1234.56},
      {buyValue: 'texto'}, {doorsQty: 1}, {doorsQty: 5}, {doorsQty: 2.6},
      {doorsQty: 'texto'}, {seatsQty: 1}, {seatsQty: 8}, {seatsQty: 2.6},
      {seatsQty: 'texto'}];
      const create = sinon.spy(Model, 'create');

      for(let i = 0; i < tests.length; i += 1) {
        const response = await chai
          .request(app)
          .post('/cars')
          .send({ ...carMock, ...tests[i]});
        expect(response.status).to.be.equal(400);
        expect(create.notCalled).to.be.true
      }
    })
  })
})
