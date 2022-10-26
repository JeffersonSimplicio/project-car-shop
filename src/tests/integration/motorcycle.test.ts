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

const erroMessageTest = [];

describe.only('Teste da rota "/motorcycles"', () => {
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
  })
})