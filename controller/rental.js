const Rental = require('../model/Rental.js');

exports.postRental = async (req, res) => {
  try {
    const { vehicle, renter, startDate, endDate } = req.body;

    if (!vehicle) {
      console.log(vehicle);
      return res.status(404).json({ error: 'Araç bulunamadı' });
    } else if (!renter) {
      return res.status(404).json({ error: 'Kiracı bulunamadı' });
    }
    const rental = await Rental.create({ vehicle, renter, startDate, endDate });
    res.status(200).json(rental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find();
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Kiralama bulunamadı' });
    }
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rental) {
      return res.status(404).json({ message: 'Kiralama bulunamadı' });
    }
    res.status(200).json(rental);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) {
      return res.status(404).json({ message: 'Kiralama bulunamadı' });
    }
    res.status(200).json({ message: 'Kiralama silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

