require('express-async-errors');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.use('/entrees', require('./routes/entrees'));
app.use('/entreeTypes', require('./routes/entreeTypes'));
app.use('/ingredients', require('./routes/ingredients'));

if (require.main === module) {
  const port = 8005;
  app.listen(port, () => console.log('Server for Associations is listening on port', port));
} else {
  module.exports = app;
}