const mongoose = require('mongoose');


const vehicleSchema = new mongoose.Schema({

  plateNumber: {
    type: String,
    required: true,
    unique: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  productionYear: {
    type: Number,
    required: true
  },
  color: String,
  type: {
    type: String,
    enum: ['Binek', 'Ticari', 'Kamyon'],
    default: "Binek",
    required: true
  },
  status: {
    type: String,
    enum: ['Aktif', 'Pasif'],
    default: 'Pasif',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;