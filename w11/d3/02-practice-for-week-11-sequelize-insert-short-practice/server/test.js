const { removeTestDB, runMigrations, runSeeders } = require('./testUtils');

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();

const { Puppy } = require('./db/models');


(async () => {

  // Delete database if it exists and recreate by running migrations and seeders
  await removeTestDB();
  await runMigrations();
  await runSeeders();


  // STEP 1
  // Using `build` and `save`, create a record for the following Puppy:
  // name: Trudy
  // age_yrs: 2
  // weight_lbs: 38
  // breed: Brittany Spaniel
  // microchipped: false
  try {
<<<<<<< HEAD
    // Your code here
    const newPuppy = Puppy.build({
      name: 'Trudy',
      age_yrs: 2,
      weight_lbs: 38,
      breed: 'Brittany Spaniel',
      microchipped: false
    });
    await newPuppy.save();

=======
    const newPuppy = Puppy.build(
      {
        name: 'Trudy',
        age_yrs: 2,
        weight_lbs: 38,
        breed: 'Brittany Spaniel',
        microchipped: false
      }
    );
    await newPuppy.save();
>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d
  } catch (err) {
    console.error(err)
  }


  // STEP 2
  // Using `create`, create a record for the following Puppy:
  // name: Beans
  // age_yrs: 1.6
  // weight_lbs: 42
  // breed: Bulldog
  // microchipped: true
  // Your code here
  try {
    // Your code here
<<<<<<< HEAD
    const newPuppy = Puppy.create({
      name: "Beans",
      age_yrs: 1.6,
      weight_lbs: 42,
      breed: "Bulldog",
      microchipped: true
    });
=======
    const newPup2 = await Puppy.create({
      name: 'Beans',
      age_yrs: 1.6,
      weight_lbs: 42,
      breed: 'Bulldog',
      microchipped: true
    })
>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d
  } catch (err) {
    console.error(err)
  }

<<<<<<< HEAD
=======

>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d
})();
