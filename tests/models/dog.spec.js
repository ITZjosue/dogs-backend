const { Dog, Temperament , conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('New Dog', () => {
    beforeEach(() => Dog.sync({ force: true }));
    
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
    describe('weight',()=>{
      it('should throw an error if weight is null',(done)=>{
        Dog.create({id:'998',name:'Drako',height:'25 - 69',weight:null,life_span:'9-18 years',database:true})
          .then(()=>done(new Error('It requires a valid range of weight')))
          .catch(()=>done())
      })
      it('should work when is a valid weight',()=>{
        Dog.create({id:'998',name:'Drako',height:'25 - 69',weight:'8 - 15',life_span:'9-18 years',database:true})
      })
    })

    describe('height',()=>{
      it('should throw an error if height is null',(done)=>{
        Dog.create({id:'998',name:'Drako',height:null,weight:'8 - 15',life_span:'9-18 years',database:true})
          .then(()=>done(new Error('It requires a valid range of weight')))
          .catch(()=>done())
      })
      it('should work when is a valid height',()=>{
        Dog.create({id:'998',name:'Drako',height:'20 - 50',weight:'8 - 15',life_span:'9-18 years',database:true})
      })
    })

    describe('life_span',()=>{
      it('should throw an error if life span is null',(done)=>{
        Dog.create({id:'998',name:'Drako',height:'20 - 50',weight:'8 - 15',life_span:null,database:true})
          .then(()=>done(new Error('It requires a valid life span')))
          .catch(()=>done())
      })

      it('should work when is a valid life span',()=>{
        Dog.create({id:'998',name:'Drako',height:'20 - 50',weight:'8 - 15',life_span:'9 - 18 years',database:true})
      })
    })
    
  });
});
