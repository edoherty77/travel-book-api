const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TripSchema = new Schema({
  name: String,
  // photos: [String]
  // memory: [{
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Memory'
  // }],
  // miles : {
  //   plane: Number,
  //   boat: Number,
  //   auto: Number,
  //   train: Number,
  //   foot: Number
  // }
})

const Trip = mongoose.model('Trip', TripSchema)

module.exports = Trip