import * as chai from 'chai';
import { app } from '../app';
import UserModel from '../models/UserModel';
import { login, user } from './mocks/users';
// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');


chai.use(chaiHttp);
const { request, expect } = chai;
const userModel = new UserModel();

describe('Test login endpoint', () => {
  describe('Valid Login information', () => {
    before(async () => {
      Sinon.stub(userModel, 'findOne').resolves(user.validUser)
    })
    after(async () => {
      (userModel.findOne as sinon.SinonStub).restore();
    });
    
    it('should return response on call', async () => {
      const response = await request(app).post('/login').send(login.validUser);
      expect(response).to.have.status(200)
      expect(response).to.have.property('token')
    })

  })
})