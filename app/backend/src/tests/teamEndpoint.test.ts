import * as chai from 'chai';
import { app } from '../app';
import Team from '../database/models/Team';
import { teams } from './mocks/teams';
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');


chai.use(chaiHttp);
const { request, expect } = chai;

describe('Test team endpoint', () => {
  describe('Get /teams endpoint', () => {
    before(async () => {
      Sinon.stub(Team, 'findAll').resolves(teams as Team[])
    })
    after(async () => {
      (Team.findAll as sinon.SinonStub).restore();
    });

    it('Should return all teams', async () => {
      const response = await request(app).get('/teams').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(teams)
    })
  })

  describe('Get /teams/:id endpoint with correct id', () => {
    before(async () => {
      Sinon.stub(Team, 'findByPk').resolves(teams[0] as Team)
    })
    after(async () => {
      (Team.findByPk as sinon.SinonStub).restore();
    });

    it('Should return one team', async () => {
      const response = await request(app).get('/teams/1').send();
      expect(response).to.have.status(200)
      expect(response.body).to.eql(teams[0])
    })
  })

  describe('Get /teams/:id endpoint with incorrect id', () => {
    before(async () => {
      Sinon.stub(Team, 'findByPk').resolves(null)
    })
    after(async () => {
      (Team.findByPk as sinon.SinonStub).restore();
    });

    it('Should return correct error message and 401', async () => {
      const response = await request(app).get('/teams/1234523131').send();
      expect(response).to.have.status(401)
      expect(response.body.message).to.eq('Invalid team id')
    })
  })


})