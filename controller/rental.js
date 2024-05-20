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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalRentals = await Rental.countDocuments();

    const startIndex = (page - 1) * limit;

    const rentals = await Rental.find().limit(limit).skip(startIndex);

    res.status(200).json({
      rentals,
      totalPages: Math.ceil(totalRentals / limit)
    });
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

exports.aggregateRentals = async (req, res) => {
  try {
    const pipeline =[
        {
          $lookup: {
            from: "vehicles",
            localField: "vehicle",
            foreignField: "_id",
            as: "vehicleDetails"
          }
        },
        {
          $unwind: "$vehicleDetails"
        },
        {
          $lookup: {
            from: "renters",
            localField: "renter",
            foreignField: "_id",
            as: "renterDetails"
          }
        },
        {
          $unwind: "$renterDetails"
        },
        {
          $project: {
            _id: 1,
            plateNumber: "$vehicleDetails.plateNumber",
            brand: "$vehicleDetails.brand",
            model: "$vehicleDetails.model",
            productionYear:
              "$vehicleDetails.productionYear",
            color: "$vehicleDetails.color",
            type: "$vehicleDetails.type",
            status: "$vehicleDetails.status",
            price: "$vehicleDetails.price",
            renter: "$renterDetails.name",
            renterContact: "$renterDetails.contact",
            renterType: "$renterDetails.type",
            startDate: 1,
            endDate: 1,
            createdAt: 1
          }
    }]; 
    const result = await Rental.aggregate(pipeline);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};