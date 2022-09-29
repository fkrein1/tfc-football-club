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
  // before(async () => {
  //   Sinon.stub(userModel, 'findOne').resolves(user.validUser)
  // })
  // after(async () => {
  //   (userModel.findOne as sinon.SinonStub).restore();
  // });
  
  it('valid user should return token and 200', async () => {
    const response = await request(app).post('/login').send(login.validUser);
    expect(response).to.have.status(200)
    expect(response.body).to.have.property('token')
  })

  it('invalid email should return correct error message and 400', async () => {
    const response = await request(app).post('/login').send(login.invalidEmail);
    expect(response).to.have.status(400)
    expect(response.body.message).to.eq('All fields must be filled')
  })

  it('invalid user should return correct error message and 401', async () => {
    const response = await request(app).post('/login').send(login.invalidUser);
    expect(response).to.have.status(401)
    expect(response.body.message).to.eq('Incorrect email or password')
  })

  it('invalid password should return correct error message and 401', async () => {
    const response = await request(app).post('/login').send(login.invalidPassword);
    expect(response).to.have.status(401)
    expect(response.body.message).to.eq('Incorrect email or password')
  })
})