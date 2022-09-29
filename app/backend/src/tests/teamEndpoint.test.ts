import * as chai from 'chai';
import { app } from '../app';
import { teams } from './mocks/teams';
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');


chai.use(chaiHttp);
const { request, expect } = chai;

describe('Test team endpoint', () => {

  
  it('Should return all teams', async () => {
    const response = await request(app).get('/teams').send();
    expect(response).to.have.status(200)
    expect(response.body).to.be.eql(teams)
  })

  it('Should return one team', async () => {
    const response = await request(app).get('/teams/1').send();
    expect(response).to.have.status(200)
    expect(response.body).to.eql(teams[0])
  })

  it('invalid user should return correct error message and 401', async () => {
    const response = await request(app).get('/teams/1234523131').send();
    expect(response).to.have.status(401)
    expect(response.body.message).to.eq('Invalid team id')
  })

})