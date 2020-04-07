const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/abode', {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})

let houseSchema = new Schema({
    neighborhood_id : Number,
    neighborhood : String,
    transit_score : Number,
    walk_score : Number ,
    value_inc_dec_past : Number ,
    value_inc_dec_future : Number ,
    median_value : Number ,
    home_cost : Number ,
    bedrooms : Number ,
    bathrooms : Number ,
    home_address : String,
    sf : Number ,
    home_image : String ,
    heart_filled : false


});

let House = mongoose.model('House', houseSchema);



// let kittySchema = new Schema({
//     name: String,
// });

// var Kitten = mongoose.model('Kitten', kittySchema);

// var belmont = new Kitten ({name : 'belmont'});

// belmont.save((err, belmont)=>{
//     if (err){
//         return console.error(err);
//     } else {
//         console.log(belmont.name);
//     }
// });


// module.exports = House;