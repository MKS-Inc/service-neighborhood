const faker = require('faker');
const db = require('./index.js');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter; 

const writeHouses = fs.createWriteStream('houseData.csv');
writeHouses.write('house_id, neighborhood_id, home_cost, bedrooms, bathrooms, home_address, sf, home_image, neighborhood, transit_score ,walk_score, value_inc_dec_past, value_inc_dec_future, median_value\n', 'utf8');






function writeTenMillionHouses(writer, encoding, callback) {
    const neighborhoodRecords = [];


    for (let i = 0; i < 1000000; i++) {
      const neighborhood = faker.name.lastName();
      const transitScore = faker.random.number({ min: 70, max: 99 });
      const walkScore = faker.random.number({ min: 70, max: 99 });
      const valueIncDecPast = faker.random.number({ min: -3, max: 4 });
      const valueIncDecFuture = faker.random.number({ min: -3, max: 4 });
      const medianValue = faker.random.number({ min: 1100, max: 2200 }) * 1000;
      neighborhoodRecords.push(
        {
          id : i,
          neighborhood : neighborhood,
          transit_score : transitScore,
          walk_score : walkScore,
          value_inc_dec_past : valueIncDecPast,
          value_inc_dec_future : valueIncDecFuture,
          median_value : medianValue

        }
      )
    }
    let i = 10000000;
    let house_id = 0;
    function write() {
      let ok = true;
      do {
        i -= 1;
        house_id += 1;         
        const neighborhood = neighborhoodRecords[Math.floor(Math.random() * neighborhoodRecords.length)];
        const neighborhoodName = neighborhood.neighborhood;
        const neighborhood_id = neighborhood.id;
        const home_cost = Math.round((Math.floor(neighborhood.median_value * faker.finance.amount(1.10, 1.30, 2))) / 1000) * 1000;
        const bedrooms = faker.random.number({ min: 3, max: 6 });
        const bathrooms = bedrooms - faker.random.number({ min: 1, max: 2 });
        const home_address = faker.address.streetName() + ' ' + streetSuff[Math.floor(Math.random() * streetSuff.length)];
        const sf = bedrooms * faker.random.number({ min: 750, max: 950 });
        const home_image = faker.random.number({ min: 1, max: 55 }) + '.jpg';
        const transit_score = neighborhood.transit_score;
        const walk_score = neighborhood.walk_score;
        const value_inc_dec_past = neighborhood.value_inc_dec_past;
        const value_inc_dec_future = neighborhood.value_inc_dec_future;
        const median_value = neighborhood.median_value;
        const data = `${house_id},${neighborhood_id},${home_cost}, ${bedrooms}, ${bathrooms},${home_address}, ${sf}, ${home_image}, ${neighborhoodName}, ${transit_score}, ${walk_score}, ${value_inc_dec_past}, ${value_inc_dec_future}, ${median_value}\n`;
        if (i === 0) {
          writer.write(data, encoding, callback);
        } else {
  // see if we should continue, or wait
  // don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
  // had to stop early!
  // write some more once it drains
        writer.once('drain', write);
      }
    }
  write()
  }


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



const populateCSV = (start, stop) => {
 
        let count = 0;
        
        let k = start;
        while(k < stop){
            const neighborhoodRecords = [];


            for (let i = 0; i < 100000; i++) {
              const neighborhood = faker.name.lastName();
              const transitScore = faker.random.number({ min: 70, max: 99 });
              const walkScore = faker.random.number({ min: 70, max: 99 });
              const valueIncDecPast = faker.random.number({ min: -3, max: 4 });
              const valueIncDecFuture = faker.random.number({ min: -3, max: 4 });
              const medianValue = faker.random.number({ min: 1100, max: 2200 }) * 1000;
              neighborhoodRecords.push(
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
          fs.writeFile('mongo-csv/houseData' + k + '.csv');
    
          const csvWriter = createCsvWriter({
            path : './mongo-csv/houseData' + k + '.csv',
            header : [
              {id : 'house_id', title : 'HOUSE_ID'},
              {id : 'neighborhood_id' , title : 'NEIGHBORHOOD_ID' },
              {id : 'home_cost', title  : 'HOMECOST'}, 
              {id : 'bedrooms', title : 'BEDROOMS'},
              {id : 'bathrooms' , title : 'BATHROOMS'},
              {id : 'home_address', title : 'HOMEADDRESS'},
              {id : 'sf', title : 'SQFT'},
              {id : 'home_image', title : 'HOMEIMAGE'},
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
          for (let i = 0; i < 50; i++) {
            count += 1;
            const neighborhood = neighborhoodRecords[Math.floor(Math.random() * neighborhoodRecords.length)];
            const neighborhoodId = neighborhood.id;
            const homeCost = Math.round((Math.floor(neighborhood.median_value * faker.finance.amount(1.10, 1.30, 2))) / 1000) * 1000;
            const bedrooms = faker.random.number({ min: 3, max: 6 });
            const bathrooms = bedrooms - faker.random.number({ min: 1, max: 2 });
            const homeAddress = faker.address.streetName() + ' ' + streetSuff[Math.floor(Math.random() * streetSuff.length)];
            const sf = bedrooms * faker.random.number({ min: 750, max: 950 });
            const image = faker.random.number({ min: 1, max: 55 }) + '.jpg';
            records.push(
              {
                house_id : count,
                neighborhood_id : neighborhoodId,
                home_cost : homeCost,
                bedrooms : bedrooms,
                bathrooms : bathrooms,
                home_address : homeAddress,
                sf : sf,
                home_image : image, 
                neighborhood : neighborhood.neighborhood,
                transit_score : neighborhood.transit_score,
                walk_score : neighborhood.walk_score,
                value_inc_dec_past : neighborhood.value_inc_dec_past,
                value_inc_dec_future : neighborhood.value_inc_dec_future,
                median_value : neighborhood.median_value
              }
              
            )
           
          }
          csvWriter.writeRecords(records)
          .then(() => {
           console.log('succesfully loaded into file' + k)
       }).catch((err) => (console.log(err)));
          k++;
        }
    };
    function writeFiftyHouses(writer, encoding, callback) {
      const neighborhoodRecords = [];
  
  
      for (let i = 0; i < 10; i++) {
        const neighborhood = faker.name.lastName();
        const transitScore = faker.random.number({ min: 70, max: 99 });
        const walkScore = faker.random.number({ min: 70, max: 99 });
        const valueIncDecPast = faker.random.number({ min: -3, max: 4 });
        const valueIncDecFuture = faker.random.number({ min: -3, max: 4 });
        const medianValue = faker.random.number({ min: 1100, max: 2200 }) * 1000;
        neighborhoodRecords.push(
          {
            id : i,
            neighborhood : neighborhood,
            transit_score : transitScore,
            walk_score : walkScore,
            value_inc_dec_past : valueIncDecPast,
            value_inc_dec_future : valueIncDecFuture,
            median_value : medianValue
  
          }
        )
      }
      let i = 50;
      let house_id = 0;
      function write() {
        let ok = true;
        do {
          i -= 1;
          house_id += 1;         
          const neighborhood = neighborhoodRecords[Math.floor(Math.random() * neighborhoodRecords.length)];
          const neighborhoodName = neighborhood.neighborhood;
          const neighborhood_id = neighborhood.id;
          const home_cost = Math.round((Math.floor(neighborhood.median_value * faker.finance.amount(1.10, 1.30, 2))) / 1000) * 1000;
          const bedrooms = faker.random.number({ min: 3, max: 6 });
          const bathrooms = bedrooms - faker.random.number({ min: 1, max: 2 });
          const home_address = faker.address.streetName() + ' ' + streetSuff[Math.floor(Math.random() * streetSuff.length)];
          const sf = bedrooms * faker.random.number({ min: 750, max: 950 });
          const home_image = faker.random.number({ min: 1, max: 55 }) + '.jpg';
          const transit_score = neighborhood.transit_score;
          const walk_score = neighborhood.walk_score;
          const value_inc_dec_past = neighborhood.value_inc_dec_past;
          const value_inc_dec_future = neighborhood.value_inc_dec_future;
          const median_value = neighborhood.median_value;
          const data = `${house_id},${neighborhood_id},${home_cost}, ${bedrooms}, ${bathrooms},${home_address}, ${sf}, ${home_image}, ${neighborhoodName}, ${transit_score}, ${walk_score}, ${value_inc_dec_past}, ${value_inc_dec_future}, ${median_value}\n`;
          if (i === 0) {
            writer.write(data, encoding, callback);
          } else {
    // see if we should continue, or wait
    // don't pass the callback, because we're not done yet.
            ok = writer.write(data, encoding);
          }
        } while (i > 0 && ok);
        if (i > 0) {
    // had to stop early!
    // write some more once it drains
          writer.once('drain', write);
        }
      }
    write()
    }

    // populateCSV(0,5);
    writeTenMillionHouses(writeHouses, 'utf-8', () => {
        writeHouses.end();
      });

    // writeFiftyHouses(writeHouses, 'utf8', () => {
    //   writeHouses.end()
    // })