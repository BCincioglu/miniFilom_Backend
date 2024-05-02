const mongoose = require('mongoose');


const renterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: {
      phone: String,
      email: String,
      address: String
    }
  },
  type: {
    type: String,
    enum: ['Bireysel', 'Şirket'],
    required: true
  },
  vehiclesRented: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Renter = mongoose.model('Renter', renterSchema);

module.exports = Renter;