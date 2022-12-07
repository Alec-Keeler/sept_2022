// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Error handling, env variables, and json middleware - DO NOT MODIFY
require('express-async-errors');
require('dotenv').config();
app.use(express.json());

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Index of all puppies - DO NOT MODIFY
app.get('/puppies', async (req, res, next) => {
    const allPuppies = await Puppy.findAll({order: [['name', 'ASC']]});

    res.json(allPuppies);
});


// STEP 1: Update a puppy by id
app.put('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const puppy = await Puppy.findByPk(req.params.puppyId);
    if (req.body.age_yrs) puppy.age_yrs = req.body.age_yrs;
    if (req.body.microchipped) puppy.microchipped = req.body.microchipped;
    if (req.body.weight_lbs) puppy.weight_lbs = req.body.weight_lbs;
    await puppy.save();
    res.json({
      message: `Successfully updated puppy with id ${req.params.puppyId}`,
      puppy : puppy
    })
})


// STEP 2: Delete a puppy by id
app.delete('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const puppy = await Puppy.findByPk(req.params.puppyId);
    puppy.destroy();
    res.json(`Puppy with id ${req.params.puppyId} has been deleted`);
})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
