// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();
require('express-async-errors');


// Import the models used in these routes - DO NOT MODIFY
const { Cat, Toy, sequelize } = require('./db/models');
const { Op } = require("sequelize");


// Express using json - DO NOT MODIFY
app.use(express.json());




// STEP 1: Load the toys and find the count, min price, max price, and sum
app.get('/toys', async (req, res, next) => {

    // A. Create an `allToys` variable that returns all toys
    // Your code here
<<<<<<< HEAD
    const allToys = await Toy.findAll();
=======
    const allToys = await Toy.findAll()
>>>>>>> f3850e0766737c2d0ededbd47b828d956c9395f6

    // B. Create a `toysCount` variable that returns the total number of toy
    // records
    // Your code here
<<<<<<< HEAD
    const toysCount = await Toy.count();

    // C. Create a `toysMinPrice` variable that returns the minimum price of all
    // the toys
    // Your code here
    const toysMinPrice = await Toy.min('price');

    // D. Create a `toysMaxPrice` variable that returns the maximum price of all
    // the toys
    // Your code here
    const toysMaxPrice = await Toy.max('price');
=======
    const toysCount = await Toy.count()
    
    // C. Create a `toysMinPrice` variable that returns the minimum price of all
    // the toys
    // Your code here
    const toysMinPrice = await Toy.min('price')
    
    // D. Create a `toysMaxPrice` variable that returns the maximum price of all
    // the toys
    // Your code here
    const toysMaxPrice = await Toy.max('price')
>>>>>>> f3850e0766737c2d0ededbd47b828d956c9395f6

    // E. Create a `toysSumPrice` variable that returns the sum of all of
    // the toy prices.
    // Your code here
<<<<<<< HEAD
    const toysSumPrice = await Toy.sum('price');
=======
    const toysSumPrice = await Toy.sum('price')
>>>>>>> f3850e0766737c2d0ededbd47b828d956c9395f6

    res.json({
        toysCount,
        toysMinPrice,
        toysMaxPrice,
        toysSumPrice,
        allToys
    });
});




// STEP 2a: Find a cat with their associated toys, and aggregate toy data
app.get('/cats/:id/toys', async (req, res, next) => {

    const catToysAggregateData = await Cat.findByPk(req.params.id, {
        include: {
            model: Toy,
            attributes: []
        },
        attributes: [
            // Count all of this cat's toys, and display the value with a
            // key of `toyCount`
            // Your code here
<<<<<<< HEAD
            [sequelize.fn("COUNT", sequelize.col('price')), 'toyCount'],
=======
            [sequelize.fn("COUNT", sequelize.col("Toys.id")), "toyCount"],
>>>>>>> f3850e0766737c2d0ededbd47b828d956c9395f6

            // Find the average price of this cat's toys, and display the
            // value with a key of `averageToyPrice`
            // Your code here
<<<<<<< HEAD
            [sequelize.fn("AVG", sequelize.col('price')), 'averageToyPrice'],
=======
            [sequelize.fn("AVG", sequelize.col("price")), "averageToyPrice"],
>>>>>>> f3850e0766737c2d0ededbd47b828d956c9395f6

            // Find the total price of this cat's toys, and display the
            // value with a key of `totalToyPrice`
            // Your code here
<<<<<<< HEAD
            [sequelize.fn("SUM", sequelize.col('price')), 'totalToyPrice']
=======
            [sequelize.fn("TOTAL", sequelize.col("Toys.price")), "totalToyPrice"]
>>>>>>> f3850e0766737c2d0ededbd47b828d956c9395f6
        ],
        raw: false
    });

    const cat = await Cat.findByPk(req.params.id, {
        include: { model: Toy }
    });


    // STEP 2b: Format the cat object to add the aggregate keys and values to it

    // Define a new variable, `catData`, and set it equal to the `cat` variable converted to JSON
    // Your code here
<<<<<<< HEAD
    const catData = cat.toJSON();
=======
    let catData = cat.toJSON()
>>>>>>> f3850e0766737c2d0ededbd47b828d956c9395f6

    // Add the `toyCount`, `averageToyPrice`, and `totalToyPrice` keys to the
    // catData object, with their aggregate values from `catToysAggregateData`
    // Your code here
<<<<<<< HEAD
    catData.toyCount = catToysAggregateData.dataValues.toyCount;
    catData.averageToyPrice = catToysAggregateData.dataValues.averageToyPrice;
    catData.totalToyPrice = catToysAggregateData.dataValues.totalToyPrice;
=======
    catData.toyCount = catToysAggregateData.toyCount
    catData.averageToyPrice = catToysAggregateData.averageToyPrice
    catData.totalToyPrice = catToysAggregateData.totalToyPrice
>>>>>>> f3850e0766737c2d0ededbd47b828d956c9395f6

    // After the steps above are complete, refactor the line below to only
    // display `catData`
    res.json(catData);
})



// BONUS STEP: Create an endpoint for GET /data-summary that includes a summary
// of all the aggregate data according to spec
// Your code here
app.get('/data-summary', async (req, res, next) => {
  res.json(
    await Toy.findAll({
      attributes:
          [
            [sequelize.fn("COUNT", sequelize.col('price')), 'toyCount'],
            [sequelize.fn("AVG", sequelize.col('price')), 'averageToyPrice'],
            [sequelize.fn("SUM", sequelize.col('price')), 'totalToyPrice']
          ]
    })
  );
});


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
