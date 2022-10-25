import * as sinon from 'sinon';
// import * as chai from 'chai';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import 'dotenv/config';
// import { Response } from 'superagent';
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
  })
})
