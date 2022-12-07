// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();
require('express-async-errors');

// Import the models used in these routes - DO NOT MODIFY
const { Band, Musician, Instrument } = require('./db/models');

// Express using json - DO NOT MODIFY
app.use(express.json());


// STEP 1: Creating from an associated model (One-to-Many)
app.post('/bands/:bandId/musicians', async (req, res, next) => {
    // Your code here
    const { bandId } = req.params;
<<<<<<< HEAD
    const band = await Band.findByPk(bandId);
    const {firstName, lastName} = req.body;
    const musician = await band.createMusician({firstName, lastName});
    res.json({
      message: `Created new musician for the band ${band.name}`,
      musician
    });
=======
    const band = await Band.findByPk(bandId)
    const { firstName, lastName } = req.body
    // const firstName = req.body.firstName;
    // const lastName = req.body.lastName;

    const musician = await band.createMusician({
        firstName,
        lastName
    })
    res.json({
        message: `Created new musician for the band ${band.name}`,
        musician
    })
>>>>>>> 8e3e87905ce925aa28871594992fec446d7daf33
})

// STEP 2: Connecting two existing records (Many-to-Many)
app.post('/musicians/:musicianId/instruments', async (req, res, next) => {
    // Your code here
<<<<<<< HEAD
    const {instrumentIds} = req.body;
    const musician = await Musician.findByPk(req.params.musicianId);

    await musician.addInstruments(instrumentIds);

    res.json({
      message: `Successfully added instruments with an id of ${req.body.instrumentIds} to Musician, ${musician.firstName}`
    });
=======
    const { instrumentIds } = req.body
    const musician = await Musician.findByPk(req.params.musicianId);

    await musician.addInstruments(instrumentIds)

    res.json({
        message: `Successfully added instruments with an id of
        ${req.body.instrumentIds} to Musician, ${musician.firstName}`
    })
>>>>>>> 8e3e87905ce925aa28871594992fec446d7daf33
})


// Get the details of one band and associated musicians - DO NOT MODIFY
app.get('/bands/:bandId', async (req, res, next) => {
    const payload = await Band.findByPk(req.params.bandId, {
        include: { model: Musician },
        order: [[Musician, 'firstName']]
    });
    res.json(payload);
});

// Get the details all bands and associated musicians - DO NOT MODIFY
app.get('/bands', async (req, res, next) => {
    const payload = await Band.findAll({
<<<<<<< HEAD
        include: {model: Musician},
=======
        include: { model: Musician },
>>>>>>> 8e3e87905ce925aa28871594992fec446d7daf33
        order: [['name'], [Musician, 'firstName']]
    });
    res.json(payload);
});

// Get the details of one musician and associated instruments - DO NOT MODIFY
app.get('/musicians/:musicianId', async (req, res, next) => {
    const payload = await Musician.findByPk(req.params.musicianId, {
        include: { model: Instrument },
        order: [[Instrument, 'type']]
    });
    res.json(payload);
});

// Get the details all musicians and associated instruments - DO NOT MODIFY
app.get('/musicians', async (req, res, next) => {
    const payload = await Musician.findAll({
        include: { model: Instrument },
        order: [['firstName'], ['lastName'], [Instrument, 'type']]
    });
    res.json(payload);
});

// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
<<<<<<< HEAD
const port = 5000;
=======
const port = 5001;
>>>>>>> 8e3e87905ce925aa28871594992fec446d7daf33
app.listen(port, () => console.log('Server is listening on port', port));
