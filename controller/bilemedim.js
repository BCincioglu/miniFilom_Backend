const Rental = require('../model/Rental.js');
const Vehicle = require('../model/Vehicle.js');
const Renter = require('../model/Renter.js');

exports.updateVehicleStatusByDate = async (rentalId) => {
  try {
    const rental = await Rental.findById(rentalId);
    if (!rental) {
        throw new Error('Kiralama belgesi bulunamadı.');
    }

    const currentDate = new Date();
    const startDate = rental.startDate;
    const endDate = rental.endDate;

    if (currentDate >= startDate && currentDate <= endDate) {
        await Vehicle.findByIdAndUpdate(rental.vehicle, { status: 'Aktif' });
        await Renter.findByIdAndUpdate(rental.renter, {vehiclesRented: rental.vehicle});
        console.log('Aracın durumu "Aktif" olarak güncellendi.');
        console.log(rental.vehicle);
    } else {
        await Vehicle.findByIdAndUpdate(rental.vehicle, { status: 'Pasif' });
        await Renter.findByIdAndUpdate(rental.renter, {vehiclesRented: null});
        console.log('Aracın durumu "Pasif" olarak güncellendi.');
        console.log(rental.vehicle);
    }
  } catch (error) {
        console.error('Hata:', error);
  }
};


