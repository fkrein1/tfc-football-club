import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import { app } from '../app';

chai.use(chaiHttp);
const { request, expect } = chai;

describe('Hello API Request', () => {
  it('should return response on call', async () => {
    const response = await request(app).get('/')
    expect(response).to.have.status(200)
    expect(response).to.have.property('ok')
  })
})