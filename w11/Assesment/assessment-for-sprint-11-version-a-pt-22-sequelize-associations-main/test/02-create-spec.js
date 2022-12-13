const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
let chaiHttp = require('chai-http');
let server = require('../app');
chai.use(chaiHttp);
const expect = chai.expect;

const { resetDB, seedAllDB } = require('./utils/test-utils');
const { Entree, EntreeType } = require('../db/models');

describe('Create with Associations Specs - Entree from EntreeType', () => {
  before(async () => {
    const processArgs = process.argv;
    const lastArg = processArgs[processArgs.length - 1];
    if (lastArg.startsWith('test/02-create-spec')) {
      await resetDB();
      return await seedAllDB();
    }
  });

  describe('POST /entreeTypes/:type/entrees', () => {
    it('passes the API specs', async () => {
      const beefEntreeType = await EntreeType.findOne({
        where: { type: 'Beef' }
      });
      expect(beefEntreeType, "Something went wrong with seeding the test database").to.not.be.null;
      const lastEntree = await Entree.create({
        name: 'Last Entree Created',
        description: 'last entree created before post request',
        price: 111.11,
        entreeTypeId: beefEntreeType.id,
      });
      let reqBody = {
        name: 'Beef Stew',
        description: 'Warm, hearty beef stew',
        price: 19.99
      };
      await chai.request(server)
        .post(`/entreeTypes/${beefEntreeType.type}/entrees`)
        .send(reqBody)
        .then((res) => {
          expect(res.status).to.be.within(200, 201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.own.property('id');
          expect(res.body.id).to.eq(lastEntree.id + 1);
          expect(res.body).to.have.own.property('name');
          expect(res.body.name).to.be.a('string');
          expect(res.body.name).to.eq(reqBody.name);
          expect(res.body).to.have.own.property('description');
          expect(res.body.description).to.eq(reqBody.description);
          expect(res.body).to.have.own.property('price');
          expect(res.body.price).to.eq(reqBody.price);
          expect(res.body).to.have.own.property('entreeTypeId');
          expect(res.body.entreeTypeId).to.eq(beefEntreeType.id);
        });

      const newEntreeType = await EntreeType.create({
        type: 'EntreeType Test 6',
        isVegetarian: true,
      });
      reqBody = {
        name: 'Entree Test 8',
        description: 'Entree Test 8 description',
        price: 19.99
      };
      return await chai.request(server)
        .post(`/entreeTypes/${newEntreeType.type}/entrees`)
        .send(reqBody)
        .then((res) => {
          expect(res.status).to.be.within(200, 201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.own.property('id');
          expect(res.body.id).to.eq(lastEntree.id + 2);
          expect(res.body).to.have.own.property('name');
          expect(res.body.name).to.be.a('string');
          expect(res.body.name).to.eq(reqBody.name);
          expect(res.body).to.have.own.property('description');
          expect(res.body.description).to.eq(reqBody.description);
          expect(res.body).to.have.own.property('price');
          expect(res.body.price).to.eq(reqBody.price);
          expect(res.body).to.have.own.property('entreeTypeId');
          expect(res.body.entreeTypeId).to.eq(newEntreeType.id);
        });
    });
  });
});