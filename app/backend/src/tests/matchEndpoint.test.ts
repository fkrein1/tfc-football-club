import * as chai from 'chai';
import { app } from '../app';
import Match from '../database/models/Match';
import {matches} from './mocks/matches'
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');


chai.use(chaiHttp);
const { request, expect } = chai;

describe('Test match endpoint', () => {
  describe('Get /matches', () => {
    before(async () => {
      Sinon.stub(Match, 'findAll').resolves(matches as Match[])
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Should return the correct matches teams', async () => {
      const response = await request(app).get('/matches').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(matches)
    })
  })

  describe('Get /matches/:id', () => {
    before(async () => {
      Sinon.stub(Match, 'findAll').resolves(matches as Match[])
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Should return the correct matches teams', async () => {
      const response = await request(app).get('/matches').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(matches)
    })
  })
})