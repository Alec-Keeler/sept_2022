// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log('Body:', req.body);
//   next();
// });

app.get('/artists', (req, res) => {
  res.status(200)
  res.json(getAllArtists())
})

app.post('/artists', express.json(), (req, res) => {
  // console.log(req.body)
  if (req.body.name) {
    const data = addArtist(req.body)
    res.status(201).json(data)
  } else {
    res.send('An artist name is required')
  }
})

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));