const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const { resetDB, seedDBFile } = require('./utils/test-utils');
const { Entree, EntreeType, Ingredient, EntreeIngredient } = require('../db/models');

describe('Database and Model Specs', () => {
  before(async () => {
    return await resetDB();
  });

  describe('Entree -> EntreeType relationship', () => {
    before(async () => {
      await seedDBFile('20220331154214-entree-types.js');
      return await seedDBFile('20220331154733-entrees.js');
    });

    it('implements the correct association from Entree to EntreeType', async () => {
      const steakEntree = await Entree.findOne({
        where: { name: 'Steak Frites' },
        include: [ EntreeType ]
      });
      expect(steakEntree).to.not.be.null;
      expect(steakEntree.EntreeType).to.be.an('object');
      expect(steakEntree.EntreeType.type).to.eq('Beef');

      const entreeType = await EntreeType.create({
        type: 'EntreeType Test 1',
        isVegetarian: true,
      });
      await Entree.create({
        name: 'Entree Test 1',
        description: 'entree test 1 description',
        price: 1.00,
        entreeTypeId: entreeType.id
      });
      const foundEntree = await Entree.findOne({
        where: { name: 'Entree Test 1' },
        include: [ EntreeType ]
      });
      expect(foundEntree).to.not.be.null;
      expect(foundEntree.EntreeType).to.be.an('object');
      expect(foundEntree.EntreeType.type).to.eq('EntreeType Test 1');
    });

    it('implements the correct association from EntreeType to Entree', async () => {
      const beefEntreeType = await EntreeType.findOne({
        where: { type: 'Beef' },
        include: [ Entree ]
      });
      expect(beefEntreeType).to.not.be.null;
      expect(beefEntreeType.Entrees).to.be.an('array');
      expect(beefEntreeType.Entrees[0].name).to.eq('Steak Frites');

      const entreeType = await EntreeType.create({
        type: 'EntreeType Test 2',
        isVegetarian: true,
      });
      await Entree.create({
        name: 'Entree Test 2',
        description: 'entree test 2 description',
        price: 1.00,
        entreeTypeId: entreeType.id
      });
      const foundEntreeType = await EntreeType.findOne({
        where: { type: 'EntreeType Test 2' },
        include: [ Entree ]
      });
      expect(foundEntreeType).to.not.be.null;
      expect(foundEntreeType.Entrees).to.be.an('array');
      expect(foundEntreeType.Entrees[0].name).to.eq('Entree Test 2');
    });
  });

  describe('entreeTypeId constraint', () => {
    it('allows entreeTypeId on the Entrees table to be null', async () => {
      await seedDBFile('20220331154750-entree-null-entreeTypeId.js');
      const eggSaladEntree = await Entree.findOne({
        where: { name: 'Egg Salad' }
      });
      expect(eggSaladEntree).to.not.be.null;

      await expect(Entree.create({
        name: 'Entree Test 3',
        description: 'entree test 3 description',
        price: 1.00,
      })).to.not.eventually.be.rejectedWith(Error);
    });

    it('deletes all entrees associated with an entree type when that entree type is deleted', async () => {
      await seedDBFile('20220331154850-entreeType-delete-cascade.js');
      const milkBreadEntree = await Entree.findOne({
        where: { name: 'Milk Bread' }
      });
      expect(milkBreadEntree).to.be.null;

      const entreeType = await EntreeType.create({
        type: 'EntreeType Test delete cascade',
        isVegetarian: true,
      });
      await Entree.create({
        name: 'Entree Test delete cascade',
        description: 'entree test delete cascade description',
        price: 1.00,
        entreeTypeId: entreeType.id
      });
      await entreeType.destroy();
      const foundEntree = await Entree.findOne({
        where: { name: 'EntreeType Test delete cascade' },
      });
      expect(foundEntree).to.be.null;
    });
  });

  describe('Entree -> Ingredient relationship', () => {
    before(async () => {
      await seedDBFile('20220331155252-ingredients.js');
      return await seedDBFile('20220331155419-entree-to-ingredient.js');
    });

    it('implements the correct association from Entree to Ingredient', async () => {
      const entreeType = await EntreeType.create({
        type: 'EntreeType Test 4',
        isVegetarian: true,
      });
      const entree = await Entree.create({
        name: 'Entree Test 4',
        description: 'entree test 4 description',
        price: 1.00,
        entreeTypeId: entreeType.id
      });
      const ingredients = await Ingredient.bulkCreate([
        {
          name: 'Ingredient Test 1',
          measurement: 'Ingredient Test 1 measurement',
        },
        {
          name: 'Ingredient Test 2',
          measurement: 'Ingredient Test 2 measurement',
        },
        {
          name: 'Ingredient Test 3',
          measurement: 'Ingredient Test 3 measurement',
        },
      ], { validate: true });
      for (let ingredient of ingredients) {
        await EntreeIngredient.create({
          entreeId: entree.id,
          ingredientId: ingredient.id,
          quantity: 1.2
        });
      }
      const foundEntree = await Entree.findOne({
        where: { name: 'Entree Test 4' },
        include: [ Ingredient ]
      });
      expect(foundEntree).to.not.be.null;
      expect(foundEntree.Ingredients).to.be.an('array');
      expect(foundEntree.Ingredients.length).to.eq(3);
      expect(foundEntree.Ingredients[0].name).to.eq('Ingredient Test 1');
      expect(foundEntree.Ingredients[1].name).to.eq('Ingredient Test 2');
      expect(foundEntree.Ingredients[2].name).to.eq('Ingredient Test 3');
    });

    it('implements the correct association from Ingredient to Entree', async () => {
      const entreeType = await EntreeType.create({
        type: 'EntreeType Test 5',
        isVegetarian: true,
      });
      const entrees = await Entree.bulkCreate([
        {
          name: 'Entree Test 5',
          description: 'entree test 5 description',
          price: 1.00,
          entreeTypeId: entreeType.id
        },
        {
          name: 'Entree Test 6',
          description: 'entree test 6 description',
          price: 1.00,
          entreeTypeId: entreeType.id
        },
        {
          name: 'Entree Test 7',
          description: 'entree test 7 description',
          price: 1.00,
          entreeTypeId: entreeType.id
        },
      ], { validate: true });
      const ingredient = await Ingredient.create({
          name: 'Ingredient Test 4',
          measurement: 'Ingredient Test 4 measurement',
      });
      for (let entree of entrees) {
        await EntreeIngredient.create({
          entreeId: entree.id,
          ingredientId: ingredient.id,
          quantity: 1.2
        });
      }
      const foundIngredient = await Ingredient.findOne({
        where: { name: 'Ingredient Test 4' },
        include: [ Entree ]
      });
      expect(foundIngredient).to.not.be.null;
      expect(foundIngredient.Entrees).to.be.an('array');
      expect(foundIngredient.Entrees.length).to.eq(3);
      expect(foundIngredient.Entrees[0].name).to.eq('Entree Test 5');
      expect(foundIngredient.Entrees[1].name).to.eq('Entree Test 6');
      expect(foundIngredient.Entrees[2].name).to.eq('Entree Test 7');
    });
  });
});
