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


// STEP 3
// Capture the name, age_yrs, breed, weight_lbs, and microchipped attributes
// from the body of the request.
// Use these values to create a new Puppy in the database.
// Respond to the request by sending a success message
app.post('/puppies', async (req, res, next) => {
    // Your code here
    const { name, age_yrs, breed, weight_lbs, microchipped } = req.body

    const newPuppy = await Puppy.create({
        name: name,
        age_yrs: age_yrs,
        weight_lbs: weight_lbs,
        breed: breed,
        microchipped: microchipped
    });

    // const newPuppy = Puppy.build({
    //     name: name,
    //     age_yrs: age_yrs,
    //     weight_lbs: weight_lbs,
    //     breed: breed,
    //     microchipped: microchipped
    // });

    // await newPuppy.save()

    res.json(newPuppy)
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
