const cron = require('node-cron');

const update = require ('../controller/bilemedim');

const Rental = require('../model/Rental.js');

cron.schedule('0 0 * * *', async () => {
  try {
    const rentals = await Rental.find();
    const rentalIds = rentals.map(rental => rental._id);
    rentalIds.forEach(rentalId => {
      update.updateVehicleStatusByDate(rentalId);
    });
    console.log('Araç durumları başarıyla güncellendi.');
  } catch (error) {
    console.error('Hata oluştu:', error);
  }
  });
