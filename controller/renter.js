const Renter = require('../model/Renter.js');

exports.postRenter = async (req, res) => {
  try {
    const renter = await Renter.create(req.body);
    res.status(200).json(renter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllRenters = async (req, res) => {
  try {
    const renters = await Renter.find();
    res.status(200).json(renters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRenterById = async (req, res) => {
  try {
    const renter = await Renter.findById(req.params.id);
    if (!renter) {
      return res.status(404).json({ message: 'Kiracı bulunamadı' });
    }
    res.status(200).json(renter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postUpdateRenter = async (req, res) => {
  try {
    const renter = await Renter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!renter) {
      return res.status(404).json({ message: 'Kiracı bulunamadı' });
    }
    res.status(200).json(renter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postDeleteRenter = async (req, res) => {
  try {
    const renter = await Renter.findByIdAndDelete(req.params.id);
    if (!renter) {
      return res.status(404).json({ message: 'Kiracı bulunamadı' });
    }
    res.status(200).json({ message: 'Kiracı silindi' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};