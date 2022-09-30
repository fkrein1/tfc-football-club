import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { app } from '../app';
import Match from '../database/models/Match';
import { matches, matchResCreate, matchReqCreate, matchReqPatch } from './mocks/matches';
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');
import { login } from './mocks/users';


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

  describe('Post /matches', () => {
    before(() => {
      Sinon.stub(Match, 'create').resolves(matchResCreate as Match)
      Sinon.stub(jwt, 'verify').returns({ data: login.validUser} as any)
    })
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (Match.create as sinon.SinonStub).restore();
    });
    
    it('should return status 201 and created match', async () => {
      const response = await request(app)
      .post('/matches')
      .set('Authorization', 'r3fsdfsdfsf2342')
      .send(matchReqCreate);
      expect(response).to.have.status(201)
      expect(response.body).to.eql(matchResCreate)

    })
  })

  describe('Patch /matches/:id/finish', () => {
    before(() => {
      Sinon.stub(Match, 'update').resolves([1] as any)
      Sinon.stub(jwt, 'verify').returns({ data: login.validUser} as any)
    })
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (Match.update as sinon.SinonStub).restore();
    });
    
    it('should return status 201 and finished message', async () => {
      const response = await request(app)
      .patch('/matches/1/finish')
      .set('Authorization', 'r3fsdfsdfsf2342')
      .send();
      expect(response).to.have.status(200)
      expect(response.body.message).to.eql('Finished')
    })
  })

  describe('Patch /matches/:id', () => {
    before(() => {
      Sinon.stub(Match, 'update').resolves([1] as any)
      Sinon.stub(jwt, 'verify').returns({ data: login.validUser} as any)
    })
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (Match.update as sinon.SinonStub).restore();
    });
    
    it('should return status 201 and finished message', async () => {
      const response = await request(app)
      .patch('/matches/1')
      .set('Authorization', 'r3fsdfsdfsf2342')
      .send(matchReqPatch);
      expect(response).to.have.status(200)
      expect(response.body.message).to.eql('Finished')
    })
  })
})