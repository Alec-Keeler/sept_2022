'use strict';

const { Band, Musician } = require('../models');
const { Op } = require('sequelize');

const bandMusicians = [
  {
    name: 'The Falling Box',
    musicians: [
      { firstName: 'Adam', lastName: 'Appleby' },
      { firstName: 'Anton', lastName: 'Martinovic' },
      { firstName: 'Wilson', lastName: 'Holt' }
    ]
  },
  {
    name: 'America The Piano',
    musicians: [
      { firstName: 'Marine', lastName: 'Sweet' },
      { firstName: 'Georgette', lastName: 'Kubo' }
    ]
  },
  {
    name: 'Loved Autumn',
    musicians: [
      { firstName: 'Aurora', lastName: 'Hase' }
    ]
  },
  {
    name: 'Playin Sound',
    musicians: [
      { firstName: 'Trenton', lastName: 'Lesley' },
      { firstName: 'Camila', lastName: 'Nenci' }
    ]
  },
  {
    name: 'The King River',
    musicians: [
      { firstName: 'Rosemarie', lastName: 'Affini' },
      { firstName: 'Victoria', lastName: 'Cremonesi' }
    ]
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // looping over the array at the top
    for (let bandIdx = 0; bandIdx < bandMusicians.length; bandIdx++) {
      //destructure name of band and the array of musicians
      const { name, musicians } = bandMusicians[bandIdx];
      //Find the band with the name we destructured above
      const band = await Band.findOne({ where: { name } });
      //loop over the array of musicians
      for (let musicianIdx = 0; musicianIdx < musicians.length; musicianIdx++) {
        //set musician to the object containing info fo rthe musician
        const musician = musicians[musicianIdx];
        //create the association between the band and the musician
        await band.createMusician(musician);
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // loop over aarray at the top
    for (let bandIdx = 0; bandIdx < bandMusicians.length; bandIdx++) {
      //destructure the musicians array
      const { musicians } = bandMusicians[bandIdx];
      // loop through the musician array
      for (let musicianIdx = 0; musicianIdx < musicians.length; musicianIdx++) {
        // destroy the musician BOOM
        await Musician.destroy({ where: musicians[musicianIdx] });
      }
    }
  }
};
