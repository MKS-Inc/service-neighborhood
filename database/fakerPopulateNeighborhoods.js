/* eslint-disable no-plusplus */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
const faker = require('faker');
const db = require('./index.js');
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const fs = require('fs');





const neighborhoods = [
  'South of Market',
  'Financial District',
  'Civic Center',
  'Noe Valley',
  'Haight-Ashbury',
  'Fillmore',
  'Nob Hill',
  'Pacific Heights',
  'Richmond',
  'Sunset',
  'The Mission',
  'Laurel Heights',
  'North Beach',
  'The Castro',
];


const populateNeighborhoods = () => {
    let k = 5;
    while(k < 10){

      fs.writeFile('neighborhood-csv/neighborhoods' + k + '.csv');

      const csvWriter = createCsvWriter({
        path : './neighborhood-csv/neighborhoods' + k + '.csv',
        header : [
          {id : 'neighborhood' , title : 'NAME' },
          {id : 'transit_score', title  : 'TRANSITSCORE'}, 
          {id : 'walk_score', title : 'WALKSCORE'},
          {id : 'value_inc_dec_past' , title : 'VALUEINCREASEPAST'},
          {id : 'value_inc_dec_future', title : 'VALUEINCREASEFUTURE'},
          {id : 'median_value', title : 'MEDIANVALUE'}
        ]
      }
      )
    const records = [];


    for (let i = 0; i < 100000; i++) {
      const neighborhood = faker.name.lastName();
      const transitScore = faker.random.number({ min: 70, max: 99 });
      const walkScore = faker.random.number({ min: 70, max: 99 });
      const valueIncDecPast = faker.random.number({ min: -3, max: 4 });
      const valueIncDecFuture = faker.random.number({ min: -3, max: 4 });
      const medianValue = faker.random.number({ min: 1100, max: 2200 }) * 1000;
      records.push(
        {
          neighborhood : neighborhood,
          transit_score : transitScore,
          walk_score : walkScore,
          value_inc_dec_past : valueIncDecPast,
          value_inc_dec_future : valueIncDecFuture,
          median_value : medianValue

        }
      )
    }
   
    csvWriter.writeRecords(records)
    .then(() => {
     console.log('succesfully loaded into file' + k)
 }).catch((err) => (console.log(err)));
    k++;
  }
  
  }

populateNeighborhoods();

module.exports = { populateNeighborhoods };
