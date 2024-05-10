const express = require("express");

const rentalController = require("../controller/rental.js");
const { isAuth } = require("../Middleware/authMiddleware.js");

const router = express.Router();

router.get("/", isAuth, rentalController.getAllRentals);

router.get("/:id", isAuth, rentalController.getRentalById);

router.post("/", isAuth, rentalController.postRental);

router.post("/:id", isAuth, rentalController.updateRental);

router.delete("/:id", isAuth, rentalController.deleteRental);

module.exports = router;