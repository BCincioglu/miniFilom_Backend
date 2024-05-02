const express = require("express");

const vehicleController = require("../controller/vehicle.js");

const router = express.Router();

router.get("/", vehicleController.getAllVehicles);

router.get("/:id", vehicleController.getVehicleById);

router.post("/",vehicleController.postNewVehicle);

router.post("/:id", vehicleController.postEditVehicle);

router.delete("/:id", vehicleController.postDeleteVehicle);

module.exports = router;