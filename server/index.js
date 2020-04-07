/* eslint-disable prefer-template */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const cors = require('cors');
const port = 3001;
const app = express();
const path = require('path');

// eslint-disable-next-line prefer-template
// eslint-disable-next-line no-path-concat
app.use( express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/api/houses/:houseId/neighborhoods', (req, res) => {
  db.getThisNeighborhoodData(req.query.name)
  .then((results) => res.status(200).json(results))
    .catch((err) => {
      throw err;
    });
  });

  app.get('/api/houses/:id', (req, res) => {
  db.getHouseData(req.params.id)
    .then((results) => res.send(results))
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
    } else if (req.query.houseId) {
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
  .then((response) => console.log(response))
  .catch((err) => {
    throw err;
  })
})

app.delete('/api/houses', (req, res) => {
  db.deleteHouse(req.body.houseId)
  .then((response) => {
    console.log(response);
    })
    .catch((err) => {
      throw err;
    })
  })


  app.get('/*', (req,res) => {
    console.log(req.params);
    res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
  })
  
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
  