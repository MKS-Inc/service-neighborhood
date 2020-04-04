/* eslint-disable prefer-template */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const port = 3001;
const app = express();

// eslint-disable-next-line prefer-template
// eslint-disable-next-line no-path-concat
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/neighborhoods', (req, res) => {
  db.getThisNeighborhoodData(req.query.name)
    .then((results) => res.status(200).json(results))
    .catch((err) => {
      throw err;
    });
});

app.get('/api/houses', (req, res) => {
  if (req.query.name) {
    db.getAllNeighborhoodHouses(req.query.name)
      .then((results) => res.status(200).json(results))
      .catch((err) => {
        throw err;
      });
  }
  
  //TODO: should make this so that it gets the full house data and change the api route to 
  //something different to retrieve heart data

   else if (req.query.houseId) {
    db.getHeartData(req.query.houseId)
      .then((results) => res.status(200).json(results))
      .catch((err) => {
        throw err;
      });
  } else {
    db.getAllHouseData()
      .then((results) => res.status(200).json(results))
      .catch((err) => {
        throw err;
      });
  }
});

app.get('/api/houses', (req, res) => {
  db.getAllHouseData()
    .then((results) => res.status(200).json(results))
    .catch((err) => {
      throw err;
    });
});

app.put('/api/houses', (req, res) => {
  db.updateHeart(req.body.params.houseId)
    .then((results) => res.status(200).json(results))
    .catch((err) => {
      throw err;
    });
});

app.post('/api/houses', (req, res) => {
  const house = req.body;
  db.insertHouse(house)
  .then((results) => res.status(200).json(results))
  .catch((err) => {
    throw err;
  })
})

app.delete('/api/houses', (req, res) => {
    db.deleteHouse(req.body.houseId)
    .then((results) => res.status(200).json(results))
    .catch((err) => {
      throw err;
    })
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
