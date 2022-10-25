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
      const create = sinon.spy(Model, 'create');

      let response = await chai.request(app).post('/cars').send({});
      expect(response.status).to.be.equal(400);
      expect(create.notCalled).to.be.true;


      // Sem 'model'
      response = await chai.request(app).post('/cars').send(noModel);
      expect(response.status).to.be.equal(400);
      expect(create.notCalled).to.be.true;

      // Sem 'color'
      response = await chai.request(app).post('/cars').send(noModel);
      expect(response.status).to.be.equal(400);
      expect(create.notCalled).to.be.true;

      // Sem 'buyValue'
      response = await chai.request(app).post('/cars').send(noBuyValue);
      expect(response.status).to.be.equal(400);
      expect(create.notCalled).to.be.true;

      // Sem 'year'
      response = await chai.request(app).post('/cars').send(noYear);
      expect(response.status).to.be.equal(400);
      expect(create.notCalled).to.be.true;

      // Sem 'doorsQty'
      response = await chai.request(app).post('/cars').send(noDoorsQty);
      expect(response.status).to.be.equal(400);
      expect(create.notCalled).to.be.true;

      // Sem 'seatsQty'
      response = await chai.request(app).post('/cars').send(noSeatsQty);
      expect(response.status).to.be.equal(400);
      expect(create.notCalled).to.be.true;
    })
  })
})
