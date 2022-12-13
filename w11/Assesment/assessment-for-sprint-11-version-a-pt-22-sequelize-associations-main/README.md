# Sequelize Associations Assessment

**Note:** To read this in a rendered view, open your VS Code Command Palette
(using Control+Shift+P on Windows, Command+Shift+P on macOS) and choose
"Markdown: Open Preview" or "Markdown: Open Preview to Side".

In this assessment, you are asked to add Sequelize onto an existing Express
application. You will be asked to:

* Create a one-to-many relationships and associations between the `EntreeTypes`
  and `Entrees` table
* Create a many-to-many relationships and associations between the `Ingredients`
  and `Entrees` table
* Implement an API endpoint to create an entry in the `Entrees` table for an
  `EntreeType` specified by `id`
* Implement an API endpoint to return all the entries in the `Entree` table
  along with its associated `Ingredients`

Use the technologies you have used up to this point. They are all listed in
the **package.json** for your convenience.

* Express.js
* Sequelize
* Sequelize CLI
* SQLite3
* DotENV
* nodemon (for development purposes)

Do not add or remove any dependencies already listed in the **package.json**.

You **DO NOT** need to run `npx sequelize-cli init` to initialize Sequelize as
it is already done for you. The **.sequelizerc** file describes the Sequelize
configuration for this application.

## Getting started

Download the starter from the Download link at the bottom of this page.

Run `npm install` to install the dependencies listed in the last section.

Run `npm test` to run the all the test specs at any given time.

Create a **.env** file at root-level of your project and copy the contents of
the **.env.example** file into the newly created **.env** file.

## Instructions

This phase is split into three parts:

1. Create relationships in the database schema
2. Create the relevant associations on the models
3. Implement API endpoints that use the associations

Run `npm test` to make sure you pass all the tests.

### Create Schema Relationships

Run the migration files, **but do not run the seed files just yet**. Take a
look at the migration and model files to familiarize yourself with the data of
this application.

This is the current state of the database schema after migrating the existing
migration files:

![db-schema-before]

Implement the relationships in the database schema by **creating new migration files**
and **possibly updating the existing model files** or **creating new model files** to
turn the current state of the database schema to the following database schema:

![db-schema-after]

Here's other information that you need to know about the `Entrees` to
`EntreeTypes` relationship to represent in the database schema:

* An `Entree` does not need an `EntreeType` (the `entreeTypeId` column value
  can be `NULL`).
* When an `EntreeType` gets destroyed, all of the `Entree`s that are related to
  the `EntreeType` should also be destroyed.

**Important Note: Do not change any of the existing migration files.** You must
create new migrations to implement the relationships.

### Create Associations

Next, create the associations on the models to appropriately represent the
relationships by associating:

* `Entree` model to the `EntreeType` model
* `EntreeType` model to the `Entree` model
* `Entree` model to the `Ingredient` model
* `Ingredient` model to the `Entree` model

**At this point, try running the seeder files.** If the seeders are committed
successfully, then that is a good indicator that you set up your migrations and
model associations correctly.

Run the following command to test if your migrations and model associations test
specs pass:

```sh
npm test test/01-db-and-model-spec
```

### Create API Endpoints

Add the following API endpoints to the server in **app.js**:

### POST /entreeTypes/:type/entrees

Create an entry in the `Entrees` table associated with an `EntreeType`
specified by its `type` attribute.

Request:

* Method: `POST`
* Example URL: `/entreeTypes/Beef/entrees`
* Headers:
  * Content-Type: application/json
* Example Body:

  ```json
  {
    "name": "Beef Stew",
    "description": "Warm, hearty beef stew",
    "price": 10.99
  }
  ```

Response:

* Status Code: `200`
* Headers:
  * Content-Type: application/json
* Example Body:

  ```json
  {
    "id": 6,
    "name": "Beef Stew",
    "description": "Warm, hearty beef stew",
    "price": 10.99,
    "entreeTypeId": 1,
    "createdAt": "2022-03-30T21:15:48.438Z",
    "updatedAt": "2022-03-30T21:15:48.438Z"
  }
  ```

Run the following command to test this endpoint:

```sh
npm test test/02-create-spec
```

### GET /entrees/recipes

Returns all the entries in the `Entrees` table **AND** its associated
`Ingredients` eagerly loaded.

Request:

* Method: `GET`
* URL: `/entrees/recipes`
* Headers: none
* Body: none

Response:

* Status Code: `200`
* Headers:
  * Content-Type: application/json
  * Body: All the entries in the `Entrees` table **AND** its associated
    `Ingredients` eagerly loaded

Run `npm test` to make sure you pass all the tests.

Run the following command to test this endpoint:

```sh
npm test test/03-read-spec
```

## Submission

1. Delete the **node_modules** directory from your project
2. Zip your project
3. Submit the zip folder

[db-schema-before]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-11/assessments/entrees-db-schema-before.png
[db-schema-after]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-11/assessments/entrees-db-schema-after.png