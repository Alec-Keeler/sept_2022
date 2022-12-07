'use strict';

const { Musician, Instrument } = require('../models');
const { Op } = require('sequelize');

const musicianInstruments = [
  {
    musician: { firstName: 'Adam', lastName: 'Appleby' },
    instruments: [{ type: 'piano' }, { type: 'guitar' }]
  },
  {
    musician: { firstName: 'Anton', lastName: 'Martinovic' },
    instruments: [{ type: 'piano' }, { type: 'bass' }]
  },
  {
    musician: { firstName: 'Wilson', lastName: 'Holt' },
    instruments: [{ type: 'cello' }]
  },
  {
    musician: { firstName: 'Marine', lastName: 'Sweet' },
    instruments: [{ type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Georgette', lastName: 'Kubo' },
    instruments: [{ type: 'drums' }, { type: 'trumpet' }, { type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Aurora', lastName: 'Hase' },
    instruments: [{ type: 'violin' }, { type: 'cello' }]
  },
  {
    musician: { firstName: 'Trenton', lastName: 'Lesley' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Camila', lastName: 'Nenci' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Rosemarie', lastName: 'Affini' },
    instruments: [{ type: 'piano' }, { type: 'violin' }]
  },
  {
    musician: { firstName: 'Victoria', lastName: 'Cremonesi' },
    instruments: [{ type: 'violin' }]
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // loop through the array at the top
    for (let i = 0; i < musicianInstruments.length; i++) {
      //set data to one of the objects
      const data = musicianInstruments[i];
      // find the musician
      const musician = await Musician.findOne({ where: data.musician });
      //find the instruments
      const instruments = await Instrument.findAll({ where: { [Op.or]: data.instruments } });
      // create the associatioin between the musician and the instruments
      await musician.addInstruments(instruments);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // loop through the array at the top
    for (let i = 0; i < musicianInstruments.length; i++) {
      //set data to one of the objects
      const data = musicianInstruments[i];
      // find the musician
      const musician = await Musician.findOne({ where: data.musician });
      //find the instruments
      const instruments = await Instrument.findAll({ where: { [Op.or]: data.instruments } });
      // destroy the association bewtween musician and instruments
      await musician.removeInstruments(instruments);
    }
  }
};
