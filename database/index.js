/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */

const bodyParser = require('body-parser');
var pgp = require('pg-promise')();
var db = pgp('postgres://localhost:5432/abode');
const express = require('express');


const getThisNeighborhoodData = (neighborhood) => {
  return new Promise((resolve, reject) => {
  db.any('SELECT * FROM neighborhoods WHERE id = $1', [neighborhood])
    .then((data) => {return resolve(data)})
    .catch((error) => {return reject(error)})
  
  })

};

const getAllNeighborhoodData = (neighborhood) => {
  // return new Promise((resolve, reject) => {
  //   const queryStr = 'SELECT * FROM neighborhoods';
  //   db.query(queryStr, (err, result, fields) => {
  //   if (err) {
  //       return reject(err);
  //     }
  //     resolve(result);
  //   });
  // });
};

const getAllHouseData = () => {

};

const getHouseData = (house_id) => {
  return new Promise((resolve, reject) => {
    db.any('SELECT * FROM houses WHERE id = $1', [house_id])
    .then((data) => {return resolve(data)})
    .catch((error) => {return reject(error)})

  });
};

const getAllNeighborhoodHouses = (neighborhood) => {
  return new Promise((resolve, reject) => {
    db.any('SELECT * FROM houses WHERE neighborhood_id = $1', [neighborhood])
    .then((data) => {return resolve(data)})
    .catch((error) => {return reject(error)})
  });
};

const insertHouse = (house) => {
  // return new Promise((resolve, reject) => {
  //     const queryStr = `INSERT INTO houses (neighborhood, home_cost, bedrooms, bathrooms, home_address, sf, home_image) VALUES ("${house.neighborhood}", ${house.home_cost}, ${house.bedrooms}, ${house.bathrooms}, "${house.home_address}", ${house.sf}, "${house.home_image}")`
  //     db.query(queryStr, (err, result) =>{
  //       if(err) {
  //         return reject(err);
  //       } 
  //       resolve(result);
  //     })
  //   })


}

const deleteHouse = (houseId) => {
  // return new Promise((resolve, reject) => {
  //   const queryStr = `DELETE FROM houses WHERE id = "${houseId}"`;
  //   connection.query(queryStr, (err, result) => {
  //     if(err) {
  //       return reject(err); 
  //     }
  //     resolve(result);
  //   })
  // })
}

const updateHeart = (houseId) => {
  // return new Promise((resolve, reject) => {
  //   const queryStr = `UPDATE houses SET heart_filled = !heart_filled WHERE id = "${houseId}"`;
  //   connection.query(queryStr, (err, result, fields) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     resolve(result);
  //   });
  // });
};

const getHeartData = (id) => {
  // return new Promise((resolve, reject) => {
  //   const queryStr = `SELECT heart_filled FROM houses WHERE id = "${id}"`;
  //   connection.query(queryStr, (err, result, fields) => {
  //     if (err) {
  //       return reject(err);
  //     }
  //     resolve(result);
  //   });
  // });
};

module.exports = {
  db,
  getThisNeighborhoodData,
  getAllNeighborhoodData,
  getAllHouseData,
  getHouseData,
  getAllNeighborhoodHouses,
  insertHouse,
  deleteHouse,
  updateHeart,
  getHeartData,
};
