// import { expect } from "chai";
// import { Request, Response } from 'express';
// import UserController from '../controllers/UserController';
// import UserService from '../services/UserService';
// import Sinon from "sinon";


// describe("UserController.ts", () => {
//   const tokenMockJSON = {
//     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
//   }
  
//   const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  
//   describe("gera o token sucesso", () => {
//     const res = {} as Request;
//     const req = {} as Response;
//     const controller = new UserController()

//     beforeAll(() => {
//       res.status = Sinon.stub().returns(res);
//       res.json = Sinon.stub().returns();
//       Sinon.stub(UserService, 'login').resolves(tokenMock);
//     });

//     afterAll(() => {
//       controller.login.restore();
//     });

//     it("retorna status 200 e tokem com os produtos", async () => {
//       await userController.login(req, res);
//       expect(res.status.calledWith(200)).to.be.equal(true);
//       expect(res.json.calledWith(result)).to.be.equal(true);
//     });
//   });