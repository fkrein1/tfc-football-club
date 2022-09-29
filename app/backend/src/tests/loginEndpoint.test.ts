import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { app } from '../app';
import User from '../database/models/User';
import { login, user } from './mocks/users';

// @ts-ignore
import chaiHttp = require('chai-http')
// @ts-ignore
import Sinon = require('sinon');


chai.use(chaiHttp);
const { request, expect } = chai;

describe('Test login endpoint', () => {
  describe('Valid User', () => {
    before(async () => {
      Sinon.stub(User, 'findOne').resolves(user.validUser as User)
    })
    after(async () => {
      (User.findOne as sinon.SinonStub).restore();
    });
    
    it('should return token and 200', async () => {
      const response = await request(app).post('/login').send(login.validUser);
      expect(response).to.have.status(200)
      expect(response.body).to.have.property('token')
    })
  })

  describe('Invalid Email', () => {
    before(async () => {
      Sinon.stub(User, 'findOne').resolves()
    })
    after(async () => {
      (User.findOne as sinon.SinonStub).restore();
    });
    
    it('should return correct error message and 400', async () => {
      const response = await request(app).post('/login').send(login.invalidEmail);
      expect(response).to.have.status(400)
      expect(response.body.message).to.eq('All fields must be filled')
    })
  })

  describe('User without email on DB', () => {
    before(async () => {
      Sinon.stub(User, 'findOne').resolves(null)
    })
    after(async () => {
      (User.findOne as sinon.SinonStub).restore();
    });
    
    it('should return correct error message and 401', async () => {
      const response = await request(app).post('/login').send(login.invalidUser);
      expect(response).to.have.status(401)
      expect(response.body.message).to.eq('Incorrect email or password')
    })
  })

  describe('User with email on DB but wrong password', () => {
    before(async () => {
      Sinon.stub(User, 'findOne').resolves(user.validUser as User)
    })
    after(async () => {
      (User.findOne as sinon.SinonStub).restore();
    });
    
    it('should return correct error message and 401', async () => {
      const response = await request(app).post('/login').send(login.invalidPassword);
      expect(response).to.have.status(401)
      expect(response.body.message).to.eq('Incorrect email or password')
    })
  })

  describe('Invalid token', () => {
    before(async () => {
      Sinon.stub(User, 'findOne').resolves()
      Sinon.stub(jwt, 'verify').resolves()
    })
    after(async () => {
      (User.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });
    
    it('should return status 401 and correct message', async () => {
      const response = await request(app).get('/login/validate').send();
      expect(response).to.have.status(401)
      expect(response.body.message).to.eql({message: 'Token must be a valid token'})
    })
  })

  describe('Validate token', () => {
    before(async () => {
      Sinon.stub(User, 'findOne').resolves(user.validUser as User)
      Sinon.stub(jwt, 'verify').resolves({ data: login.validUser})
    })
    after(async () => {
      (User.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });
    
    it('should return status 200 and role as user', async () => {
      const response = await request(app)
        .get('/login/validate')
        .auth('authorization', 'xablau')
        .send();
      expect(response).to.have.status(200)
      expect(response.body.message).to.eql({role: 'user'})
    })
  })
})