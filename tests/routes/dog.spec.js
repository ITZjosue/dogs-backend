/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id:999,
  name: 'Pug',
  height:'15 - 26',
  weight:'5 - 25',
  life_span:'9 - 14 years',
  database:true
};

describe('Dog routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));

  describe('GET /dogs',()=>{
    it('It should receive 200',()=>{
      agent.get('/dogs').expect(200)
    })
  })

  describe('POST /dog',()=>{
    it('should get 201',()=>{
      agent.post('/dog')
      .send({nombre:'Pug',alturaMin:'15',alturaMax:'25',pesoMin:'5',pesoMax:'25',temperamento:[]})
      .expect(201)
    })
    it('should get 400',()=>{
      agent.post('/dog')
        .send({nombre:'Perro pomtski',alturaMin:null,alturaMax:'25',pesoMin:'5',pesoMax:'25',temperamento:[]})
        .expect(400)
    })
  })

  describe('GET /temperament',()=>{
    it('should get 200',()=>{
      agent.get('/temperament').expect(200)
    })
  })
});
