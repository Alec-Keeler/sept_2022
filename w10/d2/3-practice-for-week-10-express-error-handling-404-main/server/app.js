const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});

app.get('/users', (req, res, next) => {
  next(new Error('could not find user'))
})

// other endpoints

app.use((req, res, next) => {
  const err = new Error("Sorry, the requested resource couldn't be found")
  // err = new Error("Sorry, the requested resource couldn't be found")
  err.statusCode = 404
  next(err)
})

app.use((err, req, res, next) => {
  console.log(err)
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something Went Wrong :('
  res.status(statusCode)
  res.json({
    message,
    statusCode
  })
})

// redirect, render

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));