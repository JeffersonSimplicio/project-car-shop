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
      for (let i = 0; i < tests.length; i += 1) {
        const response = await chai.request(app).post('/cars').send(tests[i]);
        expect(response.status).to.be.equal(400);
        expect(create.notCalled).to.be.true;
      }
    })

    // it('Os campos devem seguir os padrões de de valor',async () => {
    //   const create = sinon.spy(Model, 'create');

    //   // model
    //   let response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, model: 'oi'});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, model: 8});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   // year
    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, year: 1899});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, year: 2023});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, year: '2015'});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   // color
    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, color: 'ab'});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, color: 12});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   // buyValue
    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, buyValue: 1234.56});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, buyValue: 'texto'});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   // doorsQty
    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, doorsQty: 1});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, doorsQty: 5});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   response = await chai
    //     .request(app)
    //     .post('/cars')
    //     .send({ ...carMock, doorsQty: 'texto'});
    //   expect(response.status).to.be.equal(400);
    //   expect(create.notCalled).to.be.true;

    //   // seatsQty
    // })
  })
})
