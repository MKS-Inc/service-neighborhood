/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
const mysql = require('mysql');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
 
  database: 'abode',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the mySQL database');
});

const getThisNeighborhoodData = (neighborhood) => {
  return new Promise((resolve, reject) => {
    const queryStr = `SELECT * FROM neighborhoods WHERE neighborhood = "${neighborhood}"`;
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getAllNeighborhoodData = (neighborhood) => {
  return new Promise((resolve, reject) => {
    const queryStr = 'SELECT * FROM neighborhoods';
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getAllHouseData = () => {
  return new Promise((resolve, reject) => {
    const queryStr = 'SELECT * FROM houses';
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getHouseData = (house_id) => {
  return new Promise((resolve, reject) => {
    const queryStr = `SELECT * FROM houses WHERE id = "${house_id}"`;
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getAllNeighborhoodHouses = (neighborhood) => {
  return new Promise((resolve, reject) => {
    const queryStr = `SELECT * FROM houses WHERE neighborhood = "${neighborhood}"`;
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const insertHouse = (house) => {
  return new Promise((resolve, reject) => {
      const queryStr = `INSERT INTO houses (neighborhood, home_cost, bedrooms, bathrooms, home_address, sf, home_image) VALUES ("${house.neighborhood}", ${house.home_cost}, ${house.bedrooms}, ${house.bathrooms}, "${house.home_address}", ${house.sf}, "${house.home_image}")`
      connection.query(queryStr, (err, result) =>{
        if(err) {
          return reject(err);
        } 
        resolve(result);
      })
    })


}

const deleteHouse = (houseId) => {
  return new Promise((resolve, reject) => {
    const queryStr = `DELETE FROM houses WHERE id = "${houseId}"`;
    connection.query(queryStr, (err, result) => {
      if(err) {
        return reject(err); 
      }
      resolve(result);
    })
  })
}

const updateHeart = (houseId) => {
  return new Promise((resolve, reject) => {
    const queryStr = `UPDATE houses SET heart_filled = !heart_filled WHERE id = "${houseId}"`;
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

const getHeartData = (id) => {
  return new Promise((resolve, reject) => {
    const queryStr = `SELECT heart_filled FROM houses WHERE id = "${id}"`;
    connection.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  connection,
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
