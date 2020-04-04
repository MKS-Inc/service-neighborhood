/* eslint-disable prefer-template */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
const faker = require('faker');
const db = require('./index.js');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter

const streetSuff = [
  'St.',
  'Rd.',
  'Ave.',
  'Ln.',
  'Pl.',
  'Ct.',
  'Terr.',
  'Blvd.',
  'Wy.',
  'Dr.',
];


const populateHouses = (start, stop) => {
  db.getAllNeighborhoodData()
    .then((neighborhoods) => {
      let k = start;
      while(k < stop){
  
        fs.writeFile('houses-csv/houses' + k + '.csv');
  
        const csvWriter = createCsvWriter({
          path : './houses-csv/houses' + k + '.csv',
          header : [
            {id : 'neighborhood' , title : 'NEIGHBORHOOD_ID' },
            {id : 'home_cost', title  : 'HOMECOST'}, 
            {id : 'bedrooms', title : 'BEDROOMS'},
            {id : 'bathrooms' , title : 'BATHROOMS'},
            {id : 'home_address', title : 'HOMEADDRESS'},
            {id : 'sf', title : 'SQFT'},
            {id : 'home_image', title : 'HOMEIMAGE'},

          ]
        }
        )
      const records = [];
        for (let i = 0; i < 500000; i++) {
          const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)];
          const neighborhoodId = Math.floor(Math.random() * neighborhoods.length);
          const homeCost = Math.round((Math.floor(neighborhood.median_value * faker.finance.amount(1.10, 1.30, 2))) / 1000) * 1000;
          const bedrooms = faker.random.number({ min: 3, max: 6 });
          const bathrooms = bedrooms - faker.random.number({ min: 1, max: 2 });
          const homeAddress = faker.address.streetName() + ' ' + streetSuff[Math.floor(Math.random() * streetSuff.length)];
          const sf = bedrooms * faker.random.number({ min: 750, max: 950 });
          const image = faker.random.number({ min: 1, max: 55 }) + '.jpg';
          records.push(
            {
              neighborhood : neighborhoodId,
              home_cost : homeCost,
              bedrooms : bedrooms,
              bathrooms : bathrooms,
              home_address : homeAddress,
              sf : sf,
              home_image : image 
            }
            
          )
        }
        csvWriter.writeRecords(records)
        .then(() => {
         console.log('succesfully loaded into file' + k)
     }).catch((err) => (console.log(err)));
        k++;
      }
    })
        
          .catch((err) => {
            throw err;
          });
      };
        //   const queryStr = `INSERT INTO houses (neighborhood, home_cost, bedrooms, bathrooms, home_address, sf, home_image) VALUES ("${neighborhood.neighborhood}", ${homeCost}, ${bedrooms}, ${bathrooms}, "${homeAddress}", ${sf}, "${image}")`;
        //   db.connection.query(queryStr, (err, result, fields) => {
        //     if (err) {
        //       return reject(err);
        //     }
        //     resolve(result);
        //   });
        // }
      // });
    // })
   


populateHouses(15, 20);

module.exports = { populateHouses };
