import * as chai from 'chai';
import { app } from '../app';
import Match from '../database/models/Match';
import { awayLeaderboard, homeLeaderboard, leaderBoard } from './mocks/leaderboard';
import {matches} from './mocks/matches'
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');


chai.use(chaiHttp);
const { request, expect } = chai;

describe('Test leaderboard endpoint', () => {
  describe('Get /leaderboard', () => {
    before(async () => {
      Sinon.stub(Match, 'findAll').resolves(matches as Match[])
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Should return the correct leaderboard teams', async () => {
      const response = await request(app).get('/leaderboard').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(leaderBoard)
    })
  })

  describe('Get /leaderboard/away', () => {
    before(async () => {
      Sinon.stub(Match, 'findAll').resolves(matches as Match[])
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Should return the correct leaderboard teams', async () => {
      const response = await request(app).get('/leaderboard/away').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(awayLeaderboard)
    })
  })

  describe('Get /leaderboard/home', () => {
    before(async () => {
      Sinon.stub(Match, 'findAll').resolves(matches as Match[])
    })
    after(async () => {
      (Match.findAll as sinon.SinonStub).restore();
    });

    it('Should return the correct leaderboard teams', async () => {
      const response = await request(app).get('/leaderboard/home').send();
      expect(response).to.have.status(200)
      expect(response.body).to.be.eql(homeLeaderboard)
    })
  })
})