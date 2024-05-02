const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Renter',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  /*rentalDay: {
    type: Number
  },*/
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;