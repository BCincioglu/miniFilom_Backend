const Vehicle = require('../model/Vehicle.js');

exports.postNewVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Araç bulunamadı' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postEditVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) {
      return res.status(404).json({ message: 'Araç bulunamadı' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postDeleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Araç bulunamadı' });
    }
    res.status(200).json({ message: 'Araç silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};