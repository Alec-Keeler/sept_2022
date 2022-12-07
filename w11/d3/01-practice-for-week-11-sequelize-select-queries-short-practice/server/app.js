// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Import Op to perform comparison operations in WHERE clauses - DO NOT MODIFY
<<<<<<< HEAD
const { Op } = require("sequelize");
// const { UPSERT } = require('sequelize/types/lib/query-types');
=======
// const { Op } = require("sequelize");
>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d

// Express using json - DO NOT MODIFY
app.use(express.json());


// STEP 1
// All puppies in the database
// No WHERE clause
app.get('/puppies', async (req, res, next) => {
    let allPuppies;

    // Your code here
    allPuppies = await Puppy.findAll({
<<<<<<< HEAD
      order: ['name']
    });
=======
        order: ['name']
    })
>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d

    res.json(allPuppies);
});


// STEP 2
// All puppies that have been microchipped
// WHERE clause with one exact value
app.get('/puppies/chipped', async (req, res, next) => {
    let chippedPuppies;

    // Your code here
    chippedPuppies = await Puppy.findAll({
<<<<<<< HEAD
      where: {
        microchipped: true,
      },
      order: ['age_yrs']
=======
        where: {
            microchipped: true
        },
        order: [['age_yrs', 'DESC'], ['name']]
>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d
    })

    res.json(chippedPuppies);
});


// STEP 3
// One puppy matching a name param
// Finding one record by attribute
app.get('/puppies/name/:name', async (req, res, next) => {
    let puppyByName;
<<<<<<< HEAD

    // Your code here
    puppyByName = await Puppy.findOne({
      where: {
        name: req.params.name
      }
    })
=======
    const { name } = req.params
    // Your code here
    puppyByName = await Puppy.findOne({
        where: {
            name: name
        }
    });
>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d

    res.json(puppyByName);
})

const { Op } = require('sequelize') //needed for bonus

// BONUS STEP 5
// All puppies with breed ending in 'Shepherd'
// WHERE clause with a comparison
app.get('/puppies/shepherds', async (req, res, next) => {
    let shepherds;

    // Your code here
    shepherds = await Puppy.findAll({
        where: {
            breed: {
                [Op.like]: "%Shepherd"
            }
        },
        order: [["name", "DESC"]]
    })

    res.json(shepherds);
})


// BONUS STEP 6
// All puppies with age_yrs <= 1yr and weight_lbs <= 20lbs
// WHERE clause with multiple attributes and comparisons
app.get('/puppies/tinybabies', async (req, res, next) => {
    let tinyBabyPuppies;

    // Your code here
    tinyBabyPuppies = await Puppy.findAll({
        where: {
            age_yrs: {
                [Op.lt]: 1
            },
            weight_lbs: {
                [Op.lt]: 20
            }
        },
        order: [['age_yrs'], ['weight_lbs']]
    })

    res.json(tinyBabyPuppies);
})


// STEP 4
// One puppy matching an id param
// Finding one record by primary key
app.get('/puppies/:id', async (req, res, next) => {
    let puppyById;

    // Your code here
<<<<<<< HEAD
    puppyById = await Puppy.findByPk(req.params.id);
=======
    puppyById = await Puppy.findByPk(req.params.id)
>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d

    res.json(puppyById);
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
>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d
app.listen(port, () => console.log('Server is listening on port', port));
