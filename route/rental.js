const express = require("express");

const rentalController = require("../controller/rental.js");

const router = express.Router();

router.get("/", rentalController.getAllRentals);

router.get("/:id", rentalController.getRentalById);

router.post("/",rentalController.postRental);

router.post("/:id", rentalController.updateRental);

router.delete("/:id", rentalController.deleteRental);

module.exports = router;