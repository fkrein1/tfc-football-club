// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import { app } from '../app';
// import UserModel from '../database/models/SequelizeUser';
// // @ts-ignore
// import chaiHttp = require('chai-http');
// import { invalidadPasswordResponse, invalidPassword, invalidUser, loginUserRequest, oneUser, withoutEmail } from './mocks/users.mock';
// import { Response } from 'superagent';
// const { expect } = chai;

// chai.use(chaiHttp);

// describe('Test the auth controller', () => {
//   let chaiHttpResponse: Response;
//   let error: { message: string };

//   describe('Test if is possible to make login', () => {
//     before(async () => {
//       sinon.stub(UserModel, 'findOne').resolves(oneUser as UserModel);

//       chaiHttpResponse = await chai.request(app).post('/login').send(loginUserRequest);
//     });

//     after(async () => {
//       (UserModel.findOne as sinon.SinonStub).restore();
//     });

//     it('Should respond with status code 200', () => {
//       expect(chaiHttpResponse).to.have.status(200);
//     });

//     it('Should respond with a token', () => {
//       expect(chaiHttpResponse.body).to.have.property('token');
//       expect(chaiHttpResponse.body.token).to.be.a('string');
//     });
//   });

//   describe('Test if is not possible to login without an email', () => {
//     before(async () => {
//       chaiHttpResponse = await chai.request(app).post('/login').send(withoutEmail);
//     });

//     it('Should respond with status code "400"', () => {
//       expect(chaiHttpResponse).to.have.status(400);
//     });

//     it('Should respond with the error "All fields must be filled"', () => {
//       error = { message: 'All fields must be filled' };

//       expect(chaiHttpResponse.body).to.be.eqls(error);
//     });
//   });

//   describe('Test if is not possible to login with an invalid email', () => {
//     before(async () => {
//       sinon.stub(UserModel, 'findOne').resolves(null);
//       chaiHttpResponse = await chai.request(app).post('/login').send(invalidUser);
//     });

//     after(() => {
//       (UserModel.findOne as sinon.SinonStub).restore();
//     });

//     it('Should respond with status code "401"', () => {
//       expect(chaiHttpResponse).to.have.status(401);
//     });

//     it('Should respond with the error "Incorrect email or password"', () => {
//       error = { message: 'Incorrect email or password' };

//       expect(chaiHttpResponse.body).to.be.eqls(error);
//     });
//   });

//    describe('Test if is not possible to login with an invalid password', () => {
//      before(async () => {
//        sinon.stub(UserModel, 'findOne').resolves(invalidadPasswordResponse as UserModel);
//        chaiHttpResponse = await chai.request(app).post('/login').send(invalidPassword);
//      });

//      after(() => {
//        (UserModel.findOne as sinon.SinonStub).restore();
//      });

//      it('Should respond with status code "401"', () => {
//        expect(chaiHttpResponse).to.have.status(401);
//      });

//      it('Should respond with the error "Incorrect email or password"', () => {
//        error = { message: 'Incorrect email or password' };

//        expect(chaiHttpResponse.body).to.be.eqls(error);
//      });
//    });
// });