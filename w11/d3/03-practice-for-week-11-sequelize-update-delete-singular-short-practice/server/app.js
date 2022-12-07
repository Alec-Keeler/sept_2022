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
    const allPuppies = await Puppy.findAll({ order: [['name', 'ASC']] });

    res.json(allPuppies);
});


// STEP 1: Update a puppy by id
// Your code here
app.put('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const { puppyId } = req.params;
    const { age_yrs, weight_lbs, microchipped } = req.body;

    const updatePuppy = await Puppy.findByPk(puppyId)

    if (age_yrs) {
        updatePuppy.age_yrs = age_yrs;
    }
    if (weight_lbs) {
        updatePuppy.weight_lbs = weight_lbs
    }
    if (microchipped) {
        updatePuppy.microchipped = microchipped
    }

    // await updatePuppy.save()

    res.json({
        message: `Successfully updated puppy with id ${puppyId}.`,
        puppy: updatePuppy
    });
})


// STEP 2: Delete a puppy by id
app.delete('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const deletePuppy = await Puppy.findByPk(req.params.puppyId)
    await deletePuppy.destroy()

    res.json({
        message: `Successfully deleted puppy ${deletePuppy.name}`,
        deletePuppy
    });
})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5001;
app.listen(port, () => console.log('Server is listening on port', port));
