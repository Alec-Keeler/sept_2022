const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
let chaiHttp = require('chai-http');
let server = require('../app');
chai.use(chaiHttp);
const expect = chai.expect;

const { resetDB, seedAllDB } = require('./utils/test-utils');
const { Entree, EntreeType, Ingredient, EntreeIngredient } = require('../db/models');

describe('Read with Associations Specs - Entree Recipes', () => {
  before(async () => {
    const processArgs = process.argv;
    const lastArg = processArgs[processArgs.length - 1];
    if (lastArg.startsWith('test/03-read-spec')) {
      await resetDB();
      return await seedAllDB();
    }
  });

  describe('GET /entrees/recipes', () => {
    it('passes the API specs', async () => {
      const firstEntree = await Entree.findOne();
      await chai.request(server)
        .get('/entrees/recipes')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          const firstIdx = 0;
          expect(res.body[firstIdx]).to.have.own.property('id');
          expect(res.body[firstIdx].id).to.eq(firstEntree.id);
          expect(res.body[firstIdx]).to.have.own.property('name');
          expect(res.body[firstIdx].name).to.eq(firstEntree.name);
          expect(res.body[firstIdx].Ingredients).to.be.an('array');
          expect(res.body[firstIdx].Ingredients.map(ing => ing.name)).to.eql([
            "Impossible Meat",
            "Chopped Lettuce",
            "Tomatoes",
            "Cheese",
          ]);
        });

      const entreeType = await EntreeType.create({
        type: 'EntreeType Test 7',
        isVegetarian: true,
      });
      const entree = await Entree.create({
        name: 'Entree Test 9',
        description: 'Entree test 9 description',
        price: 1.00,
        entreeTypeId: entreeType.id
      });
      const ingredients = await Ingredient.bulkCreate([
        {
          name: 'Ingredient Test 5',
          measurement: 'Ingredient Test 5 measurement',
        },
        {
          name: 'Ingredient Test 6',
          measurement: 'Ingredient Test 6 measurement',
        },
        {
          name: 'Ingredient Test 7',
          measurement: 'Ingredient Test 7 measurement',
        },
      ], { validate: true });
      for (let ingredient of ingredients) {
        await EntreeIngredient.create({
          entreeId: entree.id,
          ingredientId: ingredient.id,
          quantity: 1.2
        });
      }

      return await chai.request(server)
        .get('/entrees/recipes')
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          const lastIdx = res.body.length - 1;
          expect(res.body[lastIdx]).to.have.own.property('id');
          expect(res.body[lastIdx].id).to.eq(entree.id);
          expect(res.body[lastIdx]).to.have.own.property('name');
          expect(res.body[lastIdx].name).to.eq('Entree Test 9');
          expect(res.body[lastIdx].Ingredients).to.be.an('array');
          expect(res.body[lastIdx].Ingredients.map(ing => ing.name)).to.eql([
            'Ingredient Test 5',
            'Ingredient Test 6',
            'Ingredient Test 7',
          ]);
        });
    });
  });
});